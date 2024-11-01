import { directoryOpen, fileOpen, type FileWithDirectoryAndFileHandle, type FileWithHandle } from "browser-fs-access";
import { setRootDir, type RootDir } from "./7-root-dir";
import { pathWithoutFilename } from "@/utils";

export async function openModernHandlesDlg(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.
        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        if (isFileSystemDirectoryHandles(res)) {
            // This is a folder with no files, so we will return an empty array
            setRootDir({ rpath: res[0].name, handle: res[0] });
            return [];
        } else {
            // Find the root folder handle
            let files: FileWithDirectoryAndFileHandle[] = res;
            const h = findShortestPath(files);
            setRootDir({ rpath: h?.rpath || '', handle: h?.handle });
            return files;
        }
    } else {
        // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });
        setRootDir({ rpath: '', handle: undefined });
        return files;
    }
}

function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
    return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
}

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
