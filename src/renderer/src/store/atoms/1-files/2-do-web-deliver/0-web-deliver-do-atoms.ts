import { atom } from "jotai";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { doSetDeliveredFilesAtom } from "..";
import { electronGetPathes, webLoadAfterDataTransferContent, webLoadAfterDialogOpen } from "./2-web-file-content";

// handle files drop for web and electron environments

export type DoSetFilesFromDropAtom = typeof doSetFilesFromDropAtom;

export const doSetFilesFromDropAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: FileContent[] | undefined;

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, pmAllowedToOpenExt);
        } else {
            const hasFiles = !![...dataTransfer.items].filter((item) => item.kind === 'file').length; // avoid drop of non-files
            if (hasFiles) {
                filesCnt = await webLoadAfterDataTransferContent(dataTransfer.items, pmAllowedToOpenExt);
            }
        }

        if (filesCnt) {
            set(doSetDeliveredFilesAtom, filesCnt);
        }
    }
);

export const doSetFilesFromDialogAtom = atom(
    null,
    async (get, set, files: File[] | null) => {
        if (!files) {
            return;
        }
        let filesCnt: FileContent[] = await webLoadAfterDialogOpen(files, pmAllowedToOpenExt);
        if (filesCnt) {
            set(doSetDeliveredFilesAtom, filesCnt);
        }
    }
);
