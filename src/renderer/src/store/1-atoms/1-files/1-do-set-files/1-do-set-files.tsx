import { atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { isAnyEmpty, isAnyManual } from "@/store/manifest";
import { doDiscardAllFilesFileUsLinksAtom } from "@/store/store-utils";
import { createFileUsFromFileContent } from "./2-create-fileus";
import { busyIndicator, totalManis } from "../../9-ui-state";
import { filesAtom } from "../0-files-atom";
import { rightPanelAtom } from "../../2-right-panel";
import { assignFcRoot, doInitFileUsLinksToFcAtom } from "../../4-field-catalogs";
import { toast } from "sonner";
import { delay } from "@/utils";

/**
 * File content is populated from web or electron environment:
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
- deliveredAtom - files content populated from web or electron environments
- filesAtom     - files with reactive content and IDs
- filteredAtom  - files to show in the tree
*/
export const doSetDeliveredFilesAtom = atom(
    null,
    async (get, set, deliveredFileContents: FileContent[]) => {
        //printDelivered(deliveredFileContents);

        if (deliveredFileContents.length > 100) {    // Allow fast cleaning, no files, no delay
            busyIndicator.msg = 'Parsing...';   // TODO: all heavy stuff is already done in the main process, so it should be done earlier
            await delay(100);                   // Delay to update busyIndicator UI (it's not shown if the process is too fast).
        }

        set(rightPanelAtom, undefined);
        assignFcRoot(undefined, get, set);
        set(doDiscardAllFilesFileUsLinksAtom);

        totalManis.normal = 0;
        totalManis.manual = 0;
        totalManis.empty = 0;
        totalManis.fc = 0;

        const unsupported: FileUs[] = [];

        const fileUsItems: FileUs[] = deliveredFileContents
            .filter((file) => file.size)
            .map(
                (deliveredFileContent: FileContent) => {
                    const newFileUs = createFileUsFromFileContent(deliveredFileContent);

                    if (newFileUs.parsedSrc.fcat) {
                        totalManis.fc++;
                    } else if (isAnyEmpty(newFileUs.parsedSrc.meta)) {
                        totalManis.empty++;
                    } else if (isAnyManual(newFileUs.parsedSrc.meta)) {
                        totalManis.manual++;
                    } else {
                        totalManis.normal++;
                    }

                    return newFileUs;
                }
            )
            .filter(
                (fileUs) => {
                    const notUs = fileUs.fileCnt.failed || fileUs.fileCnt.notOur || (!fileUs.parsedSrc.mani && !fileUs.parsedSrc.fcat);
                    if (notUs) {
                        fileUs.fileCnt.failed && console.error(fileUs.fileCnt.raw);
                        unsupported.push(fileUs);
                    }
                    return !notUs;
                }
            );

        const newRootFc = assignFcRoot(fileUsItems, get, set);
        if (newRootFc) {
            fileUsItems.push(newRootFc);
        }
        
        sortFileUsItemsInPlace(fileUsItems);

        if (unsupported.length) {
            unsupportedMsg(unsupported);
        }

        const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));
        
        set(doInitFileUsLinksToFcAtom, fileUsAtoms);
        set(filesAtom, fileUsAtoms);
        busyIndicator.msg = '';
    }
);

function sortFileUsItemsInPlace(items: FileUs[]) {
    items.sort( // Sort by name (from a to z, ie. ascending) and reindex w/ new field catalog index
        (a, b) => {
            if (a.parsedSrc.fcat && !b.parsedSrc.fcat) return 1;
            if (!a.parsedSrc.fcat && b.parsedSrc.fcat) return -1;

            return a.fileCnt.fname.localeCompare(b.fileCnt.fname);
        }
    );
    items.forEach(
        (fileUs, idx) => fileUs.fileCnt.idx = idx
    );
    //console.log('sortedFileUsItems', JSON.stringify(items.map((item, idx) => `${`${idx}`.padStart(2, ' ')} ${`${item.fileCnt.idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`), null, 2));
}

function printDelivered(deliveredFileContents: FileContent[]) {
    console.log(`%cDelivered ${deliveredFileContents.length} files`, 'color: magenta');

    deliveredFileContents.forEach(
        (fc) => {
            console.log(`    %cfpath: "${fc.fpath}" %cfname: ${fc.fname}`, 'color: tan', 'color: gray', { fileContent: fc });
        }
    );
}

function unsupportedMsg(unsupported: FileUs[]) {
    //console.warn('Unsupported files:', unsupported);

    const multiple = unsupported.length > 1;
    const verb = multiple ? 'are' : 'is';
    const noun = multiple ? 'files' : 'file';
    const space = multiple ? '' : ' ';

    const msg = (
        <div className="max-h-[50vh] text-foreground dark:text-background overflow-auto smallscroll">
            <span className="font-semibold">
                {`There ${verb} ${unsupported.length} unsupported ${noun}:`}
            </span>

            {unsupported.map(
                (file) => <span className={multiple ? "block" : undefined} key={file.fileCnt.unid}>{`${space}"${file.fileCnt.fname}"`}</span>
            )}
        </div>
    );

    toast.warning(msg, {
        // TODO: add details popup dialog
        // action: { label: 'Details', onClick: () => { console.log('Unsupported files:', unsupported); }, }
    });
}
