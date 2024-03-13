import { atom } from "jotai";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { deliveredAtom } from "../0-content/content-atoms";
import { electronGetPathes, webLoadAfterDataTransferContent, webLoadAfterDialogOpen } from "./web-file-content";

// handle files drop for web and electron environments

export const doSetFilesFromDropAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent[];

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
        } else {
            filesCnt = await webLoadAfterDataTransferContent(dataTransfer.items, pmAllowedToOpenExt);
        }

        if (filesCnt) {
            set(deliveredAtom, filesCnt);
        }
    }
);
export type DoSetFilesFromDropAtom = typeof doSetFilesFromDropAtom;

export const doSetFilesFromDialogAtom = atom(
    null,
    async (get, set, files: File[] | null) => {
        if (!files) {
            return;
        }
        let filesCnt: FileContent[] = await webLoadAfterDialogOpen(files, pmAllowedToOpenExt);
        if (filesCnt) {
            set(deliveredAtom, filesCnt);
        }
    }
);
