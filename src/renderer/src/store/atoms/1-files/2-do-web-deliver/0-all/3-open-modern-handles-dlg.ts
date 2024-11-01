import { directoryOpen, fileOpen, type FileWithDirectoryAndFileHandle, type FileWithHandle } from "browser-fs-access";
import { setRootDir } from "./7-root-dir";
import { findShortestPathModern } from "./6-find-root-modern";

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
            const h = findShortestPathModern(files);
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

