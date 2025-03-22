import { type FileWithDirectoryAndFileHandle, type FileWithHandle, directoryOpen, fileOpen } from "browser-fs-access";
import { findShortestPathModern, FindShortestPathModernResult } from "@/store/store-utils";

export type OpenModernHandlesDlgResult = {
    files: FileWithHandle[] | FileWithDirectoryAndFileHandle[];
    root: FindShortestPathModernResult; // Root dir. fromMain is always false in this case
};

export async function openModernHandlesDlg(openAsFolder: boolean): Promise<OpenModernHandlesDlgResult> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.

        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        if (isFileSystemDirectoryHandles(res)) {                // This is a folder with no files, so we will return an empty array
            return {
                files: [],
                root: { rpath: res[0].name, hadle: res[0] },
            };
        } else {                                                // Find the root folder handle
            const files: FileWithDirectoryAndFileHandle[] = res;
            const shortest = findShortestPathModern(files);
            return {
                files,
                root: { rpath: shortest?.rpath || '', hadle: shortest?.hadle },
            };
        }

    } else {                                                    // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });
        return {
            files,
            root: { rpath: '', hadle: undefined },
        };
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
