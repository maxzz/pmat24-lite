import { type FsHandle } from "./9-fs-types";

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

export type DndHandle = [path: string[], handle: FsHandle];

export async function collectDndHandles(files: DataTransferItem[]): Promise<DndHandle[]> {
    const rv: DndHandle[] = [];

    const fileHandlesPromises = files.map((item) => item.getAsFileSystemHandle() as Promise<FsHandle | null>);

    for await (const handle of fileHandlesPromises) {
        if (handle) {
            if (handle.kind === 'file') {
                rv.push([[], handle]);
            } else {
                rv.push([[handle.name], handle]);
                
                for await (const subEntry of getEntriesRecursively(handle)) {
                    rv.push(subEntry);
                }
            }
        }
    }

    return rv;
}
