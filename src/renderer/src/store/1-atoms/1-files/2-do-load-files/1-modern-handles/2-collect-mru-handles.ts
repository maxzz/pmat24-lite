import { type FileWithDirectoryAndFileHandle, directoryOpen } from "browser-fs-access";

export async function openDirectoryHandle(handle: FileSystemDirectoryHandle, options: Partial<DirectoryOpenOptions> = {}): Promise<(FileSystemDirectoryHandle | FileWithDirectoryAndFileHandle)[]> {
    options.recursive = options.recursive || false;
    options.mode = options.mode || 'read';

    // If the directory is empty, return an array with the handle.
    if ((await handle.values().next()).done) {
        return [handle];
    }
    // Else, return an array of File objects.
    return getFilesRecurcively(handle, options.recursive, undefined, options.skipDirectory);
}

//https://github.com/GoogleChromeLabs/browser-fs-access/blob/main/src/fs-access/directory-open.mjs
type DirectoryOpenOptions = Parameters<typeof directoryOpen>[0];
type SkipDirectory = (entry: FileSystemDirectoryEntry | FileSystemDirectoryHandle) => boolean; 
// type SkipDirectory = DirectoryOpenOptions['skipDirectory']; //somehow not working?
// type SkipDirectory2 = DirectoryOpenOptions["recursive"]; //somehow not working?
// type aa = { bb?: boolean }; type cc = aa['bb']; // OK

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
            dirs.push(
                getFilesRecurcively(entry, recursive, nestedPath, skipDirectory)
            );
        }
    }

    return [
        ...(await Promise.all(dirs)).flat(),
        ...(await Promise.all(files))
    ];
}
