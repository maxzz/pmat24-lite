type FsHandle =
    | { kind: 'file'; } & FileSystemFileHandle
    | { kind: 'directory'; } & FileSystemDirectoryHandle;

export function isFsFileHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFsDirectoryHandle(handle: FileSystemHandle | FsHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}

/**
 * Traverses through a directory and yields files and folders (in undefined order)
 * https://github.com/umstek/listen/blob/main/src/util/fileSystem.ts
 *
 * @param folder folder to traverse
 */
async function* getEntriesRecursively(folder: FileSystemDirectoryHandle): AsyncGenerator<[string[], FsHandle], void, unknown> {
    for await (const entry of folder.values()) {
        if (entry.kind === 'file') {
            yield [[folder.name], entry];
        }
        else if (entry.kind === 'directory') {
            yield [[folder.name, entry.name], entry];

            for await (const [path, file] of getEntriesRecursively(entry)) {
                yield [[folder.name, ...path], file];
            }
        }
    }
}

export async function collectDndHandles(files: DataTransferItem[]): Promise<[path: string[], handle: FsHandle][]> {

    const fileHandlesPromises = files.map((item) => item.getAsFileSystemHandle() as Promise<FsHandle | null>);

    const rv: [path: string[], handle: FsHandle][] = [];

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'file') {
                rv.push([[], handle]);
            } else {
                rv.push([[handle.name], handle]);
                
                for await (const subEntry of getEntriesRecursively(handle as FileSystemDirectoryHandle)) {
                    rv.push(subEntry);
                }
            }
        }
    }

    return rv;
}
