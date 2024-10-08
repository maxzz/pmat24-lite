import { getReadEntriesPromisify } from "./8-promisify-entry-utils";

export async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const rv: FileSystemEntry[] = [];
    let readEntries = await getReadEntriesPromisify(directoryReader);

    while (readEntries.length > 0) {
        rv.push(...readEntries);
        readEntries = await getReadEntriesPromisify(directoryReader);
    }

    return rv;
}

export async function getAllFileSystemEntries(fileDataTransferItems: DataTransferItem[]): Promise<FileSystemEntry[]> {
    const rv: FileSystemEntry[] = [];
    const queue: FileSystemEntry[] = [];

    for (let i = 0, length = fileDataTransferItems.length; i < length; i++) {
        const item: DataTransferItem = fileDataTransferItems[i];
        const entry = item.webkitGetAsEntry();
        entry
            ? queue.push(entry)
            : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const item = queue.shift();
        if (item) {
            if (item.isFile) {
                rv.push(item);
            } else if (item.isDirectory) {
                const dir = item as FileSystemDirectoryEntry;
                const entries = [...await readAllDirectoryEntries(dir.createReader())];
                queue.push(...entries);
            }
        }
    }

    return rv;
}

// This is OK but incomplete. There are no sub-directories
