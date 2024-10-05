/**
 * Traverses through a directory and yields files and folders (in undefined order)
 * https://github.com/umstek/listen/blob/main/src/util/fileSystem.ts
 *
 * @param folder folder to traverse
 */
async function* getEntriesRecursively(folder: FileSystemDirectoryHandle): AsyncGenerator<[string[], FileSystemFileHandle | FileSystemDirectoryHandle], void, unknown> {
    for await (const [key, entry] of folder.entries()) {
        if (entry.kind === 'directory') {
            yield [[folder.name], entry];

            for await (const [path, file] of getEntriesRecursively(entry)) {
                yield [[folder.name, ...path], file];
            }
        } else {
            yield [[folder.name], entry];
        }
    }
}

export async function collectAllHandles(dataTransferItems: DataTransferItemList) {
    const fileHandlesPromises: Promise<FileSystemHandle | null>[] = [...dataTransferItems]
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFileSystemHandle());

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'directory') {
                for await (const subEntry of getEntriesRecursively(handle as FileSystemDirectoryHandle)) {
                    console.log(`sub "${subEntry[0].join('/')}"`, subEntry[1]);
                } 
                console.log(`Directory: %o`, handle);
            } else {
                console.log(`File: %o`, handle);
            }
        }
    }
}
