import { atom } from "jotai";
import { FileWithHandle } from "browser-fs-access";
import { electronGetPaths } from "./8-electron-get-paths";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { doSetDeliveredFilesAtom } from "../../1-do-set-files";
import { createFileContents_WebAfterDnd, createFileContents_WebAfterDlgOpen, createFileContents_From_Main } from "./1-create-web-file-contents";
import { openFileSystemHandles } from "./3-open-modern-handles";
import { rootDir } from "./7-root-dir";

// handle files drop for web and electron environments

export type DoSetFilesFrom_Dnd_Atom = typeof doSetFilesFrom_Dnd_Atom;

export const doSetFilesFrom_Dnd_Atom = atom(            // used by DropItDoc only
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let fileContents: FileContent[] | undefined;

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            if (dropFiles.length) {                     // avoid drop-and-drop drop without files
                fileContents = await createFileContents_From_Main(dropFiles);
            }
        } else {
            const fileDataTransferItems = [...dataTransfer.items].filter((item) => item.kind === 'file');
            if (fileDataTransferItems.length) {         // avoid drop-and-drop drop without files
                fileContents = await createFileContents_WebAfterDnd(fileDataTransferItems);
            }
        }

        fileContents && set(doSetDeliveredFilesAtom, fileContents);
    }
);

export const doSetFilesFrom_LegacyDlg_Atom = atom(
    null,
    async (get, set, fileList: FileList | null) => {
        const files = fileList ? [...fileList] : [];
        if (!files.length) {
            return;
        }

        let fileContents: FileContent[] | undefined;

        if (hasMain()) {
            fileContents = await createFileContents_From_Main(files);
        } else {
            fileContents = await createFileContents_WebAfterDlgOpen(files);
        }

        if (fileContents) {
            set(doSetDeliveredFilesAtom, fileContents);
        }
    }
);

export const doSetFilesFrom_ModernDlg_Atom = atom(
    null,
    async (get, set, { openAsFolder }: { openAsFolder: boolean; }) => {
        try {
            const files: FileWithHandle[] = await openFileSystemHandles(openAsFolder);
            printFiles(files);

            if (hasMain()) {
                console.log('doSetFilesFromModernDialogAtom not supported by electron due to electronGetPaths() limitations', files);

                // const realFiles = (
                //     await Promise.all(files.map(
                //         async (file) => {
                //             return file.handle && file.handle.getFile();
                //         }
                //     ))
                // ).filter(Boolean);
                // console.log('doSetFilesFromModernDialogAtom electron 2', realFiles);
                // const filenames = electronGetPaths(realFiles as File[]);
                // console.log('doSetFilesFromModernDialogAtom electron 3', filenames);
                // // const filenames = electronGetPaths(files as File[]);
                // if (filenames.length) {
                //     const fileContents = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
                //     console.log('doSetFilesFromModernDialogAtom electron', fileContents);
                //     set(doSetDeliveredFilesAtom, fileContents);
                // }

                return;
            } else {
                let filesCnt: FileContent[] = files ? await createFileContents_WebAfterDlgOpen(files) : [];
                if (filesCnt) {
                    set(doSetDeliveredFilesAtom, filesCnt);
                }
            }
        } catch (error) {
        }
    }
);

function printFiles(files: File[]) {
    console.log('doSetFilesFromModernDialogAtom', rootDir);
    files.forEach((f) => console.log(' ', f));
}

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval
