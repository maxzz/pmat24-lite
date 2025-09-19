export type DndHandle = [
    fullPath: string,                           // Path to the file or folder
    handle: FileSystemHandleUnion,              // Handle of this item as FileSystemFileHandle | FileSystemDirectoryHandle
    ownerDir: FileSystemDirectoryHandle | null,
];

export async function collectDndHandles(files: DataTransferItem[]): Promise<DndHandle[]> {
    const rv: DndHandle[] = [];

    const fileHandlesPromises = files.map((item) => item.getAsFileSystemHandle() as Promise<FileSystemHandleUnion | null>);

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'file') {
                rv.push(['', handle, null]);
            } else {
                rv.push([handle.name, handle, handle]);

                const onlyOneLevel = true;
                for await (const subEntry of getHandlesRecursively(handle, handle.name, onlyOneLevel)) {
                    rv.push(subEntry);
                }
            }
        }
    }

    return rv;
}

/**
 * Traverses through a directory and yields files and folders (in undefined order)
 * https://github.com/umstek/listen/blob/main/src/util/fileSystem.ts
 * @param folder folder to traverse
 */
async function* getHandlesRecursively(folder: FileSystemDirectoryHandle, path: string, onlyOneLevel: boolean): AsyncGenerator<DndHandle, void, unknown> {
    for await (const entry of folder.values()) {

        if (entry.kind === 'file') {
            yield [path, entry, folder];
        }
        else if (entry.kind === 'directory') {
            const nestedPath = `${path}/${entry.name}`;

            if (onlyOneLevel && nestedPath.split('/').length - 1 > 1) { // if number of slashes is more than 1 then we are in a subfolder
                continue;
            }

            yield [nestedPath, entry, folder];

            for await (const [path, file, folder] of getHandlesRecursively(entry, nestedPath, onlyOneLevel)) {
                yield [path, file, folder];
            }
        }

    }
}
