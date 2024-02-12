import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from ".";
import { electronGetPathes, webLoadDataTransferContent, webLoadDialogOpen } from "@/utils";
import { M4RInvoke } from "@shared/ipc-types";

export const filesContentAtom = atom<M4RInvoke.FileContent[]>([]);

// handle files drop for web and electron environments

export const doDroppedFilesAtom = atom(
    null,
    async (get, set, dataTransfer: DataTransfer) => {
        let filesCnt: M4RInvoke.FileContent[];

        if (hasMain()) {
            const dropFiles: File[] = [...dataTransfer.files];
            const filenames = electronGetPathes(dropFiles);
            if (!filenames.length) {
                return;
            }
            filesCnt = await invokeLoadFiles(filenames, M4RInvoke.allowedExt);
        } else {
            filesCnt = await webLoadDataTransferContent(dataTransfer.items, M4RInvoke.allowedExt);
        }

        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
export type DoDroppedFilesAtom = typeof doDroppedFilesAtom;

export const doDialogFilesAtom = atom(
    null,
    async (get, set, files: File[]) => {
        let filesCnt: M4RInvoke.FileContent[] = await webLoadDialogOpen(files, M4RInvoke.allowedExt);
        if (filesCnt) {
            set(filesContentAtom, filesCnt);
        }
    }
);
