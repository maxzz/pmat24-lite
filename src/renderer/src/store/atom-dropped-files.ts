import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from ".";
import { electronGetPathes, webLoadDataTransferContent, webLoadDialogOpen } from "@/utils";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";

export const filesContentAtom = atom<FileContent[]>([]);

// handle files drop for web and electron environments

export const doDroppedFilesAtom = atom(
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
            filesCnt = await webLoadDataTransferContent(dataTransfer.items, pmAllowedToOpenExt);
        }

        console.log('doDroppedFilesAtom: filesCnt: ', filesCnt);

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;

export const doDialogFilesAtom = atom(
    null,
    async (get, set, files: File[]) => {
        let filesCnt: FileContent[] = await webLoadDialogOpen(files, pmAllowedToOpenExt);
        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
