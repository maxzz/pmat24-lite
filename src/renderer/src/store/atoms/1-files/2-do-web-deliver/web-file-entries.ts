// Adapted from: https://stackoverflow.com/a/53058574
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/utils/directoryReader.ts
// https://github.com/sanjibnarzary/bodo_music_server/blob/main/resources/assets/js/composables/useUpload.ts
// https://github.com/react-dropzone/file-selector/blob/master/src/file-selector.ts

export async function fileEntryToFile(entry: FileSystemFileEntry): Promise<File> {
    return new Promise<File>((resolve, reject): void => {
        entry.file(resolve, reject);
    });
}

async function readEntriesPromise(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    return new Promise((resolve, reject): void => {
        directoryReader.readEntries(resolve, reject);
    });
}

async function readAllDirectoryEntries(directoryReader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
    const rv: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        rv.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return rv;
}

export type EntryHandle = {
    entry: FileSystemFileEntry;
    handle: FileSystemFileHandle | null;
};

type EntryHandleAny = {
    entry: FileSystemEntry;
    handle: FileSystemFileHandle | null;
};

export async function getAllFileEntries(dataTransferItemList: DataTransferItemList): Promise<EntryHandle[]> {
    const rv: EntryHandle[] = [];
    const queue: EntryHandleAny[] = [];

    for (let i = 0, length = dataTransferItemList.length; i < length; i++) {
        const item: DataTransferItem = dataTransferItemList[i];

        const entry = item.webkitGetAsEntry();
        const handle = (item as any).getAsFileSystemHandle ? await (item as any).getAsFileSystemHandle() : null;

        entry
            ? queue.push({ entry, handle })
            : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const item = queue.shift();
        if (item) {
            if (item.entry.isFile) {
                rv.push(item as EntryHandle);
            } else if (item.entry.isDirectory) {
                const dir = item.entry as FileSystemDirectoryEntry;
                queue.push(...await readAllDirectoryEntries((dir).createReader()));
            }
        }
    }

    return rv;
}

async function* getFilesRecursively(entry) {
    if (entry.kind === "file") {
        const file = await entry.getFile();
        if (file !== null) {
            file.relativePath = getRelativePath(entry);
            yield file;
        }
    } else if (entry.kind === "directory") {
        for await (const handle of entry.values()) {
            yield* getFilesRecursively(handle);
        }
    }
}

for await (const fileHandle of getFilesRecursively(directoryHandle)) {
    console.log(fileHandle);
}
