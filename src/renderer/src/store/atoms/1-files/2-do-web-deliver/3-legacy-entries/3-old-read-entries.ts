async function readEntriesPromise(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return new Promise((resolve, reject): void => {
        directoryReader.readEntries(resolve, reject);
    });
}

export async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const rv: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        rv.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return rv;
}

export type EntryHandle = {
    legacyEntry: FileSystemFileEntry;
    modernHandle: FileSystemFileHandle | null;
};

type EntryHandleAny = {
    legacyEntry: FileSystemEntry;
    modernHandle: FileSystemHandle | null;
};

export async function getAllFileEntries(fileDataTransferItems: DataTransferItem[]): Promise<EntryHandle[]> {
    const rv: EntryHandle[] = [];
    const queue: EntryHandleAny[] = [];

    for (let i = 0, length = fileDataTransferItems.length; i < length; i++) {
        const item: DataTransferItem = fileDataTransferItems[i];

        const entry = item.webkitGetAsEntry();
        const handle = null;
        // console.log('item', item, 'entry', entry, 'handle', handle);

        entry
            ? queue.push({ legacyEntry: entry, modernHandle: handle })
            : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const item = queue.shift();
        if (item) {
            if (item.legacyEntry.isFile) {
                rv.push(item as EntryHandle);
            } else if (item.legacyEntry.isDirectory) {
                const dir = item.legacyEntry as FileSystemDirectoryEntry;
                const entries = [...await readAllDirectoryEntries(dir.createReader())].map(
                    (entry) => ({ legacyEntry: entry, modernHandle: null })
                );
                queue.push(...entries);
            }
        }
    }

    return rv;
}
