/**
 * Traverses through a directory and yields files and folders (in undefined order)
 * https://github.com/umstek/listen/blob/main/src/util/fileSystem.ts
 *
 * @param folder folder to traverse
 */
async function* getEntriesRecursively(folder: FileSystemDirectoryHandle): AsyncGenerator<[string[], FileSystemFileHandle | FileSystemDirectoryHandle], void, unknown> {
    for await (const entry of folder.values()) {
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

type FSHandle =
    | { kind: 'file'; } & FileSystemFileHandle
    | { kind: 'directory'; } | FileSystemDirectoryHandle;

export function isFileSystemFileHandle(handle: FileSystemHandle | FSHandle): handle is FileSystemFileHandle {
    return handle.kind === 'file';
}

export function isFileSystemDirectoryHandle(handle: FileSystemHandle | FSHandle): handle is FileSystemDirectoryHandle {
    return handle.kind === 'directory';
}

export async function collectDNDHandles(dataTransferItems: DataTransferItemList) {
    const fileHandlesPromises: Promise<FileSystemHandle | null>[] = [...dataTransferItems]
        .filter((item) => item.kind === 'file')
        .map((item) => item.getAsFileSystemHandle());

    const rv: [path: string[], handle: FSHandle][] = [];

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (isFileSystemFileHandle(handle)) {
                rv.push([[], handle]);
            } else if (isFileSystemDirectoryHandle(handle)) {
                for await (const subEntry of getEntriesRecursively(handle)) {
                    rv.push(subEntry);
                }
            }
        }
    }

    for (const [path, handle] of rv) {
        console.log(`path: "${path.join('/')}", handle: %o`, handle);
    }

    return rv;
}
