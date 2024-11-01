import { directoryOpen, fileOpen, FileWithDirectoryAndFileHandle, FileWithHandle } from "browser-fs-access";
import { pathWithoutFilename } from "@/utils";

export type RootDir = {
    handle: FileSystemDirectoryHandle | undefined;  // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    rpath: string;                                  // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
};

export const rootDir: RootDir = {
    handle: undefined,
    rpath: '',
};

function findShortestPath(files: FileWithDirectoryAndFileHandle[]): RootDir | undefined {
    if (!files.length) {
        return;
    }

    let shortest: string = pathWithoutFilename(files[0]?.webkitRelativePath);
    let theBest: FileWithDirectoryAndFileHandle = files[0];

    for (let i = 1; i < files.length; i++) {
        const item = files[i];
        const curr = pathWithoutFilename(item?.webkitRelativePath); //TODO: it should be full path not just name, so we should use item.handle?.webkitRelativePath but is exists only for File

        if (!curr || !item.directoryHandle) {
            continue;
        }

        const isShoter = !shortest || curr.length < shortest.length;
        if (isShoter) {
            shortest = curr;
            theBest = item;
        }
    }

    const rv: RootDir = {
        handle: theBest.directoryHandle,
        rpath: shortest,
    };
    return rv;
}

export async function openFileSystemHandles(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.
        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        if (isFileSystemDirectoryHandles(res)) {
            // This is a folder with no files, so we will return an empty array
            rootDir.handle = res[0];
            rootDir.rpath = rootDir.handle.name;
            return [];
        } else {
            // Find the root folder handle
            let files: FileWithDirectoryAndFileHandle[] = res;
            const h = findShortestPath(files);
            rootDir.handle = h?.handle;
            rootDir.rpath = h?.rpath || '';
            return files;
        }
    } else {
        // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });
        rootDir.handle = undefined;
        rootDir.rpath = '';
        return files;
    }

    function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
        return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
    }
}
