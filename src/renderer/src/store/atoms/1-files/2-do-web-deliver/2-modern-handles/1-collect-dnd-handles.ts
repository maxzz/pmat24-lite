import { type FsHandle } from "../9-fs-types";

/**
 * Traverses through a directory and yields files and folders (in undefined order)
 * https://github.com/umstek/listen/blob/main/src/util/fileSystem.ts
 *
 * @param folder folder to traverse
 */
async function* getEntriesRecursively(folder: FileSystemDirectoryHandle, path: string): AsyncGenerator<[path: string, handle: FsHandle, dir: FileSystemDirectoryHandle], void, unknown> {
    for await (const entry of folder.values()) {
        if (entry.kind === 'file') {
            console.log(`%cfile: "${folder.name}/${entry.name}"`, 'color: tomato', { folder, entry });

            yield [path, entry, folder];
        }
        else if (entry.kind === 'directory') {

            const nestedPath = `${path}/${entry.name}`;

            // console.log(`dir: %c${entry.name}`, 'color: aqua', { folder, entry });
            console.log(`dir: %c${entry.name}`, 'color: aqua', `nestedPath: "${nestedPath}"`);

            yield [nestedPath, entry, folder]; // [folder.name, entry.name] is wrong

            for await (const [path, file, folder] of getEntriesRecursively(entry, nestedPath)) {
                console.log('yield:', path, file, folder);

                yield [path, file, folder];
            }
        }
    }
}

export type DndHandle = [path: string, handle: FsHandle, dir: FileSystemDirectoryHandle | null];

export async function collectDndHandles(files: DataTransferItem[]): Promise<DndHandle[]> {
    const rv: DndHandle[] = [];

    const fileHandlesPromises = files.map((item) => item.getAsFileSystemHandle() as Promise<FsHandle | null>);

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'file') {
                rv.push(["", handle, null]);
            } else {
                rv.push([handle.name, handle, handle]);
                
                for await (const subEntry of getEntriesRecursively(handle, handle.name)) {
                    rv.push(subEntry);
                }
            }
        }
    }

    return rv;
}
