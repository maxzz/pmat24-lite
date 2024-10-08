import { isEntryDirectory, isEntryFile, type FsHandle } from "../9-fs-types";
import { getFilePromisify, getReadEntriesPromisify } from "./8-promisify-entries";

export interface FileWithHandleAndPath extends File {
    path: string;
}

async function getFileAccess(entry: FileSystemFileEntry, path: string): Promise<FileWithHandleAndPath> {
    const file = await getFilePromisify(entry) as FileWithHandleAndPath;
    file.path = path + '/' + file.name;
    // file.path = path;
    return file;
}

async function* getEntriesRecursively(folder: FileSystemDirectoryEntry): AsyncGenerator<[string, FileWithHandleAndPath], void, unknown> {

    let entries: FileSystemEntry[] = [];
    let entriesPart: FileSystemEntry[];
    const dirReader = folder.createReader(); // The .readEntries returns batches of 100 entries and returns a 0 length when complete.
    do {
        entriesPart = await getReadEntriesPromisify(dirReader);
        entries = entries.concat(entriesPart);
    } while (entriesPart.length > 0);

    for (const entry of entries) {
        if (isEntryFile(entry)) {
            yield [folder.name, await getFileAccess(entry as FileSystemFileEntry, folder.name)];
        }
        else if (isEntryDirectory(entry)) {
            const dir = entry as FileSystemDirectoryEntry;

            for await (const [key, value] of getEntriesRecursively(dir)) {
                yield [folder.name + '/' + key, value];
            }
        }
    }
}

export async function getFilesFromDataTransferItems(dtFileItems: DataTransferItem[]): Promise<FileWithHandleAndPath[]> {

    const inputs = dtFileItems.map((dtItem) => dtItem.webkitGetAsEntry()).filter(Boolean);

    const rv: FileWithHandleAndPath[] = [];

    for await (const entry of inputs) {
        if (isEntryFile(entry)) {
            rv.push(await getFileAccess(entry as FileSystemFileEntry, ''));
        }
        else if (isEntryDirectory(entry)) {
            for await (const [path, file] of getEntriesRecursively(entry as FileSystemDirectoryEntry)) {
                file.path = path + '/' + file.name;
                rv.push(file);
            }
        }
    }

    return rv;
}
