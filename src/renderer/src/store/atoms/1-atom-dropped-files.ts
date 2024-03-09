import { atom } from "jotai";
import { hasMain, invokeLoadFiles } from "@/xternal-to-main";
import { electronGetPathes, webLoadDataTransferContent, webLoadDialogOpen } from "@/utils";
import { pmAllowedToOpenExt, type FileContent } from "@shared/ipc-types";

/**
 * File content is coming from different sources:
 *   * a. without electron (web process only): dropped files
 *     - just files from a single folder (no folders or subfolders)
 *   * b. with electron: dropped file names from renderer
 *     - just files from a single folder (no folders or subfolders)
 *   * c. with electron (main process): dialog open folder
 *     - from a single chosen folder all files and folders recursively
 *   * d. with electron (main process): dialog open files
 *     - just files from a single folder (no folders or subfolders)
 * ```
 * ┌─────────────────────────────────────┬──────────────────────────────────────┐
 * │ without electron                    │ with electron                        │
 * │ (web process only):                 │                                      │
 * ├─────────────────────────────────────┼──────────────────────────────────────┤
 * │ dropped files                       │ dropped filenames from renderer      │
 * │ just files from a single folder     │ just files from a single folder      │
 * │     (no folders or subfolders)      │     (no folders or subfolders)       │
 * │                                     ├──────────────────────────────────────┤
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     ├──────────────────────────────────────┤
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     ├──────────────────────────────────────┤
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     │                                      │
 * │                                     │                                      │
 * └─────────────────────────────────────┴──────────────────────────────────────┘
 * ```
 * 
  with electron, without electron
  dropped filenames from renderer, (web process only): dropped files
  just files from a single folder, with electron: dropped file names from renderer
      (no folders or subfolders) , just files from a single folder (no folders or subfolders)

  with electron (main process): dialog open folder,
  from a single chosen folder all files and folders recursively,
  with electron (main process): dialog open files,
  just files from a single folder (no folders or subfolders),
```
 */


/**
```
┌───────────────────────────────────────────┬─────────────────────────────────┐
│ with electron                             │ without electron                │
├───────────────────────────────────────────┼─────────────────────────────────┤
│ from renderer                             │ from web process only           │
│     dropped filenames                     │     dropped files               │
│         just files from a single folder   │ just files from a single folder │
│         (no folders or subfolders)        │ (no folders or subfolders)      │
│                                           │                                 │ 
├───────────────────────────────────────────┼─────────────────────────────────┤
│ from main process                         │                                 │
│     dialog open folder                    │                                 │
│         from a single chosen folder       │                                 │
│         all files and folders recursively │                                 │
├───────────────────────────────────────────┼─────────────────────────────────┤
│ from main process                         │                                 │
│     dialog open files                     │                                 │
│         just files from a single folder   │                                 │
│         (no folders or subfolders)        │                                 │
└───────────────────────────────────────────┴─────────────────────────────────┘
```
      */
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
