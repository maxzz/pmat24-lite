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
    const entries: FileSystemEntry[] = [];
    let readEntries = await readEntriesPromise(directoryReader);

    while (readEntries.length > 0) {
        entries.push(...readEntries);
        readEntries = await readEntriesPromise(directoryReader);
    }

    return entries;
}

export async function getAllFileEntries(dataTransferItemList: DataTransferItemList): Promise<FileSystemFileEntry[]> {
    const fileEntries: FileSystemFileEntry[] = [];
    const queue: FileSystemEntry[] = [];

    for (let i = 0, length = dataTransferItemList.length; i < length; i++) {
        const item = dataTransferItemList[i];
        const entry = item.webkitGetAsEntry();
        entry ? queue.push(entry) : console.error('no entry for item', item);
    }

    while (queue.length > 0) {
        const entry = queue.shift();
        if (entry) {
            if (entry.isFile) {
                fileEntries.push(entry as FileSystemFileEntry);
            } else if (entry.isDirectory) {
                queue.push(...await readAllDirectoryEntries((entry as FileSystemDirectoryEntry).createReader()));
            }
        }
    }

    return fileEntries;
}
