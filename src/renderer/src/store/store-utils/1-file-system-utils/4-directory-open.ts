import { directoryOpen, FileWithDirectoryAndFileHandle } from "browser-fs-access";

async function getFilesRecurcively(
    dirHandle: FileSystemDirectoryHandle,
    recursive: boolean,
    path: string = dirHandle.name,
    skipDirectory?: SkipDirectory
): Promise<(FileSystemDirectoryHandle | FileWithDirectoryAndFileHandle)[]> {
    const dirs: Promise<(FileSystemDirectoryHandle | FileWithDirectoryAndFileHandle)[]>[] = [];
    const files: Promise<FileWithDirectoryAndFileHandle>[] = [];

    for await (const entry of dirHandle.values()) {
        const nestedPath = `${path}/${entry.name}`;
        if (entry.kind === 'file') {
            files.push(
                entry.getFile().then(
                    (file: FileWithDirectoryAndFileHandle) => {
                        file.directoryHandle = dirHandle;
                        file.handle = entry;

                        return Object.defineProperty(file, 'webkitRelativePath', {
                            configurable: true,
                            enumerable: true,
                            get: () => nestedPath,
                        });
                    }
                )
            );
        } else if (entry.kind === 'directory' && recursive && (!skipDirectory || !skipDirectory(entry))) {
            const a = getFilesRecurcively(entry, recursive, nestedPath, skipDirectory);
            dirs.push(
                a
            );
        }
    }

    return [
        ...(await Promise.all(dirs)).flat(),
        ...(await Promise.all(files))
    ];
}

// /**
//  * https://github.com/GoogleChromeLabs/browser-fs-access/blob/main/src/fs-access/directory-open.mjs
//  * Opens a directory from disk using the File System Access API.
//  * @type { typeof import("../index").directoryOpen }
//  */
// export default async (options = {}) => {
//     options.recursive = options.recursive || false;
//     options.mode = options.mode || 'read';
//     const handle = await window.showDirectoryPicker({
//         id: options.id,
//         startIn: options.startIn,
//         mode: options.mode,
//     });
//     // If the directory is empty, return an array with the handle.
//     if ((await (await handle.values()).next()).done) {
//         return [handle];
//     }
//     // Else, return an array of File objects.
//     return getFiles(handle, options.recursive, undefined, options.skipDirectory);
// };

type DirectoryOpenOptions = Parameters<typeof directoryOpen>[0];
// type SkipDirectory = DirectoryOpenOptions['skipDirectory'];
type SkipDirectory = (entry: FileSystemDirectoryEntry | FileSystemDirectoryHandle) => boolean;

export async function openDirectoryHandle(handle: FileSystemDirectoryHandle, options: Partial<DirectoryOpenOptions> = {}) {
    options.recursive = options.recursive || false;
    options.mode = options.mode || 'read';

    // If the directory is empty, return an array with the handle.
    if ((await (await handle.values()).next()).done) {
        return [handle];
    }
    // Else, return an array of File objects.
    return getFilesRecurcively(handle, options.recursive, undefined, options.skipDirectory);
};
