import { type FileWithDirectoryAndFileHandle, type FileWithHandle, directoryOpen, fileOpen } from "browser-fs-access";
import { findShortestPathModern, type FindShortestPathModernResult } from "@/store/store-utils";

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

        if (isFileSystemDirectoryHandles(res)) {    // This is a folder with no files, so array is single FileWithDirectoryAndFileHandle item
            return {
                files: [],
                root: { fpath: res[0].name, handle: res[0] },
            };
        } else {                                    // Find the root folder handle
            const files: FileWithDirectoryAndFileHandle[] = res;
            const shortest = findShortestPathModern(files);
            return {
                files,
                root: { fpath: shortest?.fpath || '', handle: shortest?.handle },
            };
        }

    } else {                                        // This will return files without dir handles only and skip folders.
        const files: FileWithHandle[] = await fileOpen({ multiple: true });
        return {
            files,
            root: { fpath: '', handle: undefined },
        };
    }
}

function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
    return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
}
