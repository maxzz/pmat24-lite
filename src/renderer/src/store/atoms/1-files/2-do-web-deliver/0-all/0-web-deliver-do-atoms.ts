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
            if (!filenames.length) {
                return;
            }
            fileContents = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
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
    async (get, set, files: File[] | null) => {
        if (!files) {
            return;
        }
        let filesCnt: FileContent[] = await webAfterDlgOpenCreateFileContents(files);
        if (filesCnt) {
            set(doSetDeliveredFilesAtom, filesCnt);
        }
    }
);

export const doSetFilesFromModernDialogAtom = atom(
    null,
    async (get, set, { openFiles }: { openFiles: boolean; }) => {
        try {
            let files = openFiles ? await fileOpen({ multiple: true }) : await directoryOpen();
            if (files) {
                if (!Array.isArray(files)) {
                    files = [files];
                }
                let filesCnt: FileContent[] = await webAfterDlgOpenCreateFileContents(files as File[]);
                if (filesCnt) {
                    set(doSetDeliveredFilesAtom, filesCnt);
                }
            }
        } catch (error) {
        }

        // if (openFiles) {
        //     const rvFile = await fileOpen();
        //     console.log('fileOpen', rvFile);
        // } else {
        //     const rvDir = await directoryOpen();
        //     console.log('directoryOpen', rvDir);
        // }
    }
);

//TODO: MRU list
// https://developer.chrome.com/docs/capabilities/web-apis/file-system-access 'Storing file handles or directory handles in IndexedDB'
//      https://filehandle-directoryhandle-indexeddb.glitch.me 'File Handle or Directory Handle in IndexedDB'
//          https://github.com/jakearchibald/idb-keyval
