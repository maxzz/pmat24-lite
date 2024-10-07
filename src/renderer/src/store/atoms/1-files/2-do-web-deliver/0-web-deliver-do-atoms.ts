import { atom } from "jotai";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { doSetDeliveredFilesAtom } from "..";
import { webAfterDndCreateFileContents, webAfterDlgOpenCreateFileContents } from "./1-create-web-file-contents";
import { electronGetPaths } from "./8-electron-get-paths";

// handle files drop for web and electron environments

export type DoSetFilesFromDropAtom = typeof doSetFilesFromDropAtom;

export const doSetFilesFromDropAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent[] | undefined;

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPaths(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
        } else {
            const fileDataTransferItems = [...dataTransfer.items].filter((item) => item.kind === 'file');
            if (fileDataTransferItems.length) { // avoid drop-and-drop drop without files
                filesCnt = await webAfterDndCreateFileContents(fileDataTransferItems, pmAllowedToOpenExt);
            }
        }

        if (filesCnt) {
            set(doSetDeliveredFilesAtom, filesCnt);
        }
    }
);

export const doSetFilesFromLegacyDialogAtom = atom(
    null,
    async (get, set, files: File[] | null) => {
        if (!files) {
            return;
        }
        let filesCnt: FileContent[] = await webAfterDlgOpenCreateFileContents(files, pmAllowedToOpenExt);
        if (filesCnt) {
            set(doSetDeliveredFilesAtom, filesCnt);
        }
    }
);

//TODO: doSetFilesFromModernDialogAtom = atom(
