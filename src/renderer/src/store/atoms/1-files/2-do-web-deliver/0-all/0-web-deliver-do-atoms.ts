import { atom } from "jotai";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { webAfterDndCreateFileContents, webAfterDlgOpenCreateFileContents } from "./1-create-web-file-contents";
import { electronGetPaths } from "./8-electron-get-paths";
import { directoryOpen, fileOpen, FileWithDirectoryAndFileHandle, FileWithHandle } from "browser-fs-access";

// handle files drop for web and electron environments

export type DoSetFilesFromDropAtom = typeof doSetFilesFromDropAtom;

export const doSetFilesFromDropAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let fileContents: FileContent[] | undefined;

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPaths(dropFiles);
            if (filenames.length) {
                fileContents = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
            }
        } else {
            const fileDataTransferItems = [...dataTransfer.items].filter((item) => item.kind === 'file');
            if (fileDataTransferItems.length) { // avoid drop-and-drop drop without files
                fileContents = await webAfterDndCreateFileContents(fileDataTransferItems);
            }
        }

        if (fileContents) {
            set(doSetDeliveredFilesAtom, fileContents);
        }
    }
);

export const doSetFilesFromLegacyDialogAtom = atom(
    null,
    async (get, set, fileList: FileList | null) => {
        const files = fileList ? [...fileList] : [];
        if (!files.length) {
            return;
        }

        if (hasMain()) {
            const filenames = electronGetPaths(files);
            console.log('doSetFilesFromLegacyDialogAtom electron', filenames);
            // if (filenames.length) {
            //     const fileContents = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
            //     set(doSetDeliveredFilesAtom, fileContents);
            // }
            // return;
        }

        let fileContents: FileContent[] = await webAfterDlgOpenCreateFileContents(files);
        if (fileContents) {
            set(doSetDeliveredFilesAtom, fileContents);
        }
    }
);

function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
    return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
}

export type RootHandle = {
    handle: FileSystemDirectoryHandle | null;   // For electron it will be null, for web it will be FileSystemDirectoryHandle
    path: string;                               // For electron it will be absolute path, for web it will be relative path of this folder
};

const rootHandle: RootHandle = {
    handle: null,
    path: '',
};

async function openFileSystemHandles(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.
        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] = await directoryOpen({ recursive: true, mode: 'readwrite' });
        if (isFileSystemDirectoryHandles(res)) {
            // This is a folder with no files, so we will return an empty array
            rootHandle.handle = res[0];
            rootHandle.path = rootHandle.handle.name;
            console.log('doSetFilesFromModernDialogAtom 1', rootHandle, res);
            return [];
        } else {
            rootHandle.handle = null;
            rootHandle.path = '';
            let files: FileWithDirectoryAndFileHandle[] = res;
            console.log('doSetFilesFromModernDialogAtom 2', rootHandle, res);
            return files;
        }
    } else {
        // This will return files with dir handles only and skip folders.
        const res: FileWithHandle[] = await fileOpen({ multiple: true });
        let files: FileWithHandle[] = res;
        console.log('doSetFilesFromModernDialogAtom 3', rootHandle, res);
        return files;
    }
}

export const doSetFilesFromModernDialogAtom = atom(
    null,
    async (get, set, { openAsFolder }: { openAsFolder: boolean; }) => {
        try {
            let files: FileWithHandle[] | FileWithDirectoryAndFileHandle[] | undefined;
            files = await openFileSystemHandles(openAsFolder);

            if (hasMain()) {
                console.log('doSetFilesFromModernDialogAtom electron 1', files);

                const realFiles = await Promise.all(files.map(
                    async (file) => {
                        // isfileSystemHandle(file) && await file.handle.getFile();
                        return file.handle.getFile(); //TODO: This will not work for folders. fix it to work with both types
                    }
                ));
                console.log('doSetFilesFromModernDialogAtom electron 2', realFiles);

                const filenames = electronGetPaths(realFiles as File[]);
                console.log('doSetFilesFromModernDialogAtom electron 3', filenames);

                // const filenames = electronGetPaths(files as File[]);
                if (filenames.length) {
                    const fileContents = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
                    console.log('doSetFilesFromModernDialogAtom electron', fileContents);
                    set(doSetDeliveredFilesAtom, fileContents);
                }

                return;
            }

            //console.log('doSetFilesFromModernDialogAtom', files);

            if (files) {
                let filesCnt: FileContent[] = await webAfterDlgOpenCreateFileContents(files as File[]);
                if (filesCnt) {
                    set(doSetDeliveredFilesAtom, filesCnt);
                }
            }
        } catch (error) {
        }
    }
);

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval
