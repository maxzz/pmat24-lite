export type DndHandle = [path: string, handle: FileSystemHandleUnion, dir: FileSystemDirectoryHandle | null];

export async function collectDndHandles(files: DataTransferItem[]): Promise<DndHandle[]> {
    const rv: DndHandle[] = [];

    const fileHandlesPromises = files.map((item) => item.getAsFileSystemHandle() as Promise<FileSystemHandleUnion | null>);

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'file') {
                rv.push(['', handle, null]);
            } else {
                rv.push([handle.name, handle, handle]);
                
                for await (const subEntry of getHandlesRecursively(handle, handle.name)) {
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
async function* getHandlesRecursively(folder: FileSystemDirectoryHandle, path: string): AsyncGenerator<DndHandle, void, unknown> {
    for await (const entry of folder.values()) {

        if (entry.kind === 'file') {
            yield [path, entry, folder];
        }
        else if (entry.kind === 'directory') {
            const nestedPath = `${path}/${entry.name}`;
            
            yield [nestedPath, entry, folder];

            for await (const [path, file, folder] of getHandlesRecursively(entry, nestedPath)) {
                yield [path, file, folder];
            }
        }

    }
}
