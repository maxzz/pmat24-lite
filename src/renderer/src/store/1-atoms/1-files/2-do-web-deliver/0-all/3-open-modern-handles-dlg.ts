import { type FileWithDirectoryAndFileHandle, type FileWithHandle, directoryOpen, fileOpen } from "browser-fs-access";
import { findShortestPathModern } from "@/store/store-utils";
import { setRootDir } from "../3-root-dir";

export async function openModernHandlesDlg(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.

        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        if (isFileSystemDirectoryHandles(res)) {                // This is a folder with no files, so we will return an empty array
            setRootDir({ rpath: res[0].name, dir: res[0], fromMain: false });
            return [];
        } else {                                                // Find the root folder handle
            const files: FileWithDirectoryAndFileHandle[] = res;
            const shortest = findShortestPathModern(files);
            setRootDir({ rpath: shortest?.rpath || '', dir: shortest?.hadle, fromMain: false });
            return files;
        }
        
    } else {                                                    // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });
        setRootDir({ rpath: '', dir: undefined, fromMain: false });
        return files;
    }
}

function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
    return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
}

export function isFileWithFileHandle(file: File): file is FileWithHandle {
    return !!(file as FileWithDirectoryAndFileHandle).handle;
}

export function isFileWithDirectoryAndFileHandle(file: File): file is FileWithDirectoryAndFileHandle {
    return !!(file as FileWithDirectoryAndFileHandle).directoryHandle;
}
