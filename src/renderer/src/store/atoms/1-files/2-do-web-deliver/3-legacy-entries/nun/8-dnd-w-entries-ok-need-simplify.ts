import { isEntryDirectory, isEntryFile, type FsHandle } from "../../9-fs-types";
import { getFilePromisify, getReadEntriesPromisify } from "../8-promisify-entry-utils";

export interface FileWithHandleAndPath extends File {
    handle?: FsHandle | null;
    path: string;
}

function getHandle(item: DataTransferItem | undefined): Promise<FsHandle | null> {
    if (!item?.getAsFileSystemHandle) { // Currently only Chromium browsers support getAsFileSystemHandle.
        return Promise.resolve(null);
    }
    const rv = item.getAsFileSystemHandle().catch((e) => { console.error(e); return null; }) as Promise<FsHandle | null>;
    return rv;
}

function getFileAccess(entry: FileSystemFileEntry, item: DataTransferItem | undefined, path: string): Promise<FileWithHandleAndPath> {
    return Promise.all([
        getFilePromisify(entry),
        getHandle(item)
    ]).then(
        ([file, handle]) => {
            (file as FileWithHandleAndPath).handle = handle;
            (file as FileWithHandleAndPath).path = path + file.name;
            return file as FileWithHandleAndPath;
        }
    );
}

async function* getEntriesRecursively(folder: FileSystemDirectoryEntry): AsyncGenerator<[string, FileWithHandleAndPath], void, unknown> {
    let entries: FileSystemEntry[] = [];

    const dirReader = folder.createReader(); // The .readEntries returns batches of 100 entries and returns a 0 length when complete.
    let entriesPart: FileSystemEntry[];
    do {
        entriesPart = await getReadEntriesPromisify(dirReader);
        entries = entries.concat(entriesPart);
    } while (entriesPart.length > 0);

    for (const entry of entries) {
        if (isEntryFile(entry)) {
            yield [folder.name, await getFileAccess(entry as FileSystemFileEntry, undefined, folder.name)];
        }
        else if (isEntryDirectory(entry)) {
            const dir = entry as FileSystemDirectoryEntry;

            for await (const [key, value] of getEntriesRecursively(dir)) {
                yield [folder.name + '/' + key, value];
            }
        }
    }
}

export async function getFilesFromDataTransferItems(files: DataTransferItem[]): Promise<FileWithHandleAndPath[]> {

    const inputs = files.map((item) => [item.webkitGetAsEntry(), item] as [FileSystemEntry, DataTransferItem]).filter((item) => !!item[0]);

    const rv: FileWithHandleAndPath[] = [];

    for await (const [entry, dtItem] of inputs) {
        if (isEntryFile(entry)) {
            rv.push(await getFileAccess(entry as FileSystemFileEntry, dtItem, ''));
        }
        else if (isEntryDirectory(entry)) {
            for await (const subEntry of getEntriesRecursively(entry as FileSystemDirectoryEntry)) {
                rv.push(subEntry[1]);
            }
        }
    }

    return rv;
}
