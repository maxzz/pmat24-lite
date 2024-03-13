import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { electronGetPathes, webLoadAfterDataTransferContent, webLoadAfterDialogOpen } from "@/utils";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";

/**
 * File content is coming from different sources:
```
┌───────────────────────────────────────────┬─────────────────────────────────────┐
│ with electron                             │ without electron                    │
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from renderer                             │ from web process only               │
│ ─────────────                             │ ─────────────────────               │
│     dropped filenames                     │     dropped files                   │
│         just files from a single folder   │ just files from a single folder     │
│         (no folders or subfolders)        │ or if dropped folder then           │
│                                           │ files and folders w/ relative path  │ 
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from main process                         │ from web process only               │
│ ─────────────────                         │ ─────────────────────               │
│     dialog open files                     │     dialog open files               │
│         just files from a single folder   │     just files from a single folder │
│         (no folders or subfolders)        │     (no folders or subfolders)      │
├───────────────────────────────────────────┼─────────────────────────────────────┤
│ from main process                         │                                     │
│ ─────────────────                         │                                     │
│     dialog open folder                    │                                     │
│         from a single chosen folder       │                                     │
│         all files and folders recursively │                                     │
└───────────────────────────────────────────┴─────────────────────────────────────┘
```
*/
export const deliveredAtom = atom<FileContent[]>([]);   // files content populated from web or electron environments
export const filesAtom = atom<FileContent[]>([]);       // files with reactive content and IDs
export const filteredAtom = atom<FileContent[]>([]);    // files to show in the tree

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
