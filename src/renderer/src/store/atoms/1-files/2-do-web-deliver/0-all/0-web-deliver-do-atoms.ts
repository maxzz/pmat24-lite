import { atom } from "jotai";
import { directoryOpen, fileOpen, FileWithDirectoryAndFileHandle, FileWithHandle } from "browser-fs-access";
import { electronGetPaths } from "./8-electron-get-paths";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { webAfterDndCreateFileContents, webAfterDlgOpenCreateFileContents } from "./1-create-web-file-contents";
import { pathWithoutFilename } from "@/utils";

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

export type RootDir = {
    handle: FileSystemDirectoryHandle | null;   // For electron handle will be null, for web it will be FileSystemDirectoryHandle or null.
    rpath: string;                              // For electron root path will be absolute path, for web it will be relative path of this folder or empty.
};

const rootDir: RootDir = {
    handle: null,
    rpath: '',
};

function findShortestDirectoryNameHandle(files: FileWithDirectoryAndFileHandle[]): FileWithDirectoryAndFileHandle | null {
    if (!files.length) {
        return null;
    }

    // let shortestDirName: string = files[0].directoryHandle?.name || '';
    // let shortestDirHandle: FileWithDirectoryAndFileHandle = files[0];

    // files.reduce((shortestDirHandle, file) => {
    //     const dirName = file.directoryHandle?.name || '';
    //     if (dirName.length < shortestDirName.length) {
    //         return file;
    //     }
    //     return shortestDirHandle;
    // }
    // , files[0]);


    let shortest: string | undefined = pathWithoutFilename(files[0].webkitRelativePath);
    let rv: FileWithDirectoryAndFileHandle = files[0];

    console.log('shortest init:', shortest);

    for (let i = 1; i < files.length; i++) {
        const item = files[i];
        const curr = pathWithoutFilename(item.webkitRelativePath); //TODO: it should be full path not just name, so we should use item.handle?.webkitRelativePath but is exists only for File

        if (!curr || !item.directoryHandle) {
            continue;
        }

        const isShoter = !shortest || curr.length < shortest.length;
        if (isShoter) {
            shortest = curr;
            rv = item;
        }

        console.log(`shortest curr: "${curr}" shortest: "${shortest}"`);

        // if (!shortestDirName) {
        //     shortestDirName = nameWithHandle;
        //     rv = item;
        // }
        // else if (nameWithHandle.length < shortestDirName.length) {
        //     shortestDirName = nameWithHandle;
        //     rv = item;
        // }
    }

    return rv;
}

async function openFileSystemHandles(openAsFolder: boolean): Promise<FileWithHandle[] | FileWithDirectoryAndFileHandle[]> {
    if (openAsFolder) {
        // directoryOpen() will return only files with dir handles if recursive is true or false and never return folders.
        // If folder is empty then array [FileSystemDirectoryHandle] with a single item.
        const res: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[] =
            await directoryOpen({ recursive: true, mode: 'readwrite' });

        if (isFileSystemDirectoryHandles(res)) {
            // This is a folder with no files, so we will return an empty array
            rootDir.handle = res[0];
            rootDir.rpath = rootDir.handle.name;
            console.log('doSetFilesFromModernDialogAtom 1', { rootDir, res });
            return [];
        } else {
            let files: FileWithDirectoryAndFileHandle[] = res;

            const h = findShortestDirectoryNameHandle(files);
            console.log('shortest dir name', h, h?.directoryHandle?.name);

            rootDir.handle = null; //TODO: find the root folder handle
            rootDir.rpath = '';
            console.log('doSetFilesFromModernDialogAtom 2', { rootDir, files });
            return files;
        }
    } else {
        // This will return files without dir handles only and skip folders.
        let files: FileWithHandle[] = await fileOpen({ multiple: true });

        rootDir.handle = null;
        rootDir.rpath = '';
        console.log('doSetFilesFromModernDialogAtom 3', { rootDir, files });
        return files;
    }

    function isFileSystemDirectoryHandles(files: FileWithDirectoryAndFileHandle[] | FileSystemDirectoryHandle[]): files is FileSystemDirectoryHandle[] {
        return files.length === 1 && (files[0] as FileSystemDirectoryHandle).kind === 'directory';
    }
}

export const doSetFilesFromModernDialogAtom = atom(
    null,
    async (get, set, { openAsFolder }: { openAsFolder: boolean; }) => {
        try {
            const files: FileWithHandle[] = await openFileSystemHandles(openAsFolder);

            console.log('doSetFilesFromModernDialogAtom', rootDir, files);

            if (hasMain()) {
                const realFiles = (
                    await Promise.all(files.map(
                        async (file) => {
                            return file.handle && file.handle.getFile();
                        }
                    ))
                ).filter(Boolean);

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
            } else {
                let filesCnt: FileContent[] = files ? await webAfterDlgOpenCreateFileContents(files) : [];
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
