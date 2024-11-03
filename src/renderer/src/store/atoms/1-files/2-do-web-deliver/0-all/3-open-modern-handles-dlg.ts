import { directoryOpen, fileOpen, type FileWithDirectoryAndFileHandle, type FileWithHandle } from "browser-fs-access";
import { setRootDir } from "./7-root-dir";
import { findShortestPathModern } from "./6-find-files-root-dir";

export async function openModernHandlesDlg(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.
        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        console.log('3');

        if (isFileSystemDirectoryHandles(res)) {
            // This is a folder with no files, so we will return an empty array
            //console.log('entryRoot75: 01 dlg');
            setRootDir({ rpath: res[0].name, dir: res[0], fromMain: false });
            return [];
        } else {
            // Find the root folder handle
            let files: FileWithDirectoryAndFileHandle[] = res;
            const shortest = findShortestPathModern(files);
            //console.log('entryRoot75: 02 dlg');
            setRootDir({ rpath: shortest?.rpath || '', dir: shortest?.dir, fromMain: false });
            return files;
        }
    } else {
        // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });
        //console.log('entryRoot75: 03 dlg');
        setRootDir({ rpath: '', dir: undefined, fromMain: false });
        return files;
    }
}

function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
    return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
}

