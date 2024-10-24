import { atom } from "jotai";
import { filesAtom } from "../0-files-atom";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { isEmpty, isManual } from "@/store/manifest";
import { delay } from "@/store/store-utils";
import { createFileUsFromFileContent } from "./2-create-fileus";
import { createFldCatRoots } from "./3-create-fc";
import { rightPanelAtom } from "../../2-right-panel";
import { busyIndicator, totalManis } from "../../9-ui-state";
import { toast } from "sonner";
import { fceRoots } from "../../4-field-catalogs/2-fce-roots";

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
        printDelivered(deliveredFileContents);

        if (deliveredFileContents.length > 100) {    // Allow fast cleaning, no files, no delay
            busyIndicator.msg = 'Parsing...';   // TODO: all heavy stuff is already done in the main process, so it should be done earlier
            await delay(100);                   // Delay to update busyIndicator UI (it's not shown if the process is too fast).
        }
        set(rightPanelAtom, null);

        totalManis.normal = 0;
        totalManis.manual = 0;
        totalManis.empty = 0;

        const unsupported: FileUs[] = [];

        const fileUsItems: FileUs[] =
            deliveredFileContents
                .filter((file) => file.size)
                .map(
                    (deliveredFileContent: FileContent) => {
                        const newFileUs = createFileUsFromFileContent(deliveredFileContent);

                        if (isEmpty(newFileUs.parsedSrc.meta)) {
                            totalManis.empty++;
                        } else if (isManual(newFileUs.parsedSrc.meta)) {
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

        //TODO: put field catalog items to the end of the list
        let sortedFileUsItems = fileUsItems;
        console.log('sortedFileUsItems0', JSON.stringify(sortedFileUsItems.map((item, idx) => `${`${idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`), null, 2));

        //TODO: sort by name
        sortedFileUsItems = fileUsItems.sort((a, b) => {
            if (a.parsedSrc.fcat && !b.parsedSrc.fcat) return 1;
            if (!a.parsedSrc.fcat && b.parsedSrc.fcat) return -1;

            return a.fileCnt.fname.localeCompare(b.fileCnt.fname);
            // if (a.fileCnt.fname > b.fileCnt.fname) return 1;
            // if (a.fileCnt.fname < b.fileCnt.fname) return -1;
            // return 0;
        });
        console.log('sortedFileUsItems1', JSON.stringify(sortedFileUsItems.map((item, idx) => `${`${idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`), null, 2));

        sortedFileUsItems = fileUsItems.sort((a, b) => {
            if (a.parsedSrc.fcat && !b.parsedSrc.fcat) return 1;
            if (!a.parsedSrc.fcat && b.parsedSrc.fcat) return -1;
            return 0;
        });
        console.log('sortedFileUsItems2', JSON.stringify(sortedFileUsItems.map((item, idx) => `${`${idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`), null, 2));

        //TODO: reindex files
        sortedFileUsItems.forEach((fileUs, idx) => fileUs.fileCnt.idx = idx);
        console.log('sortedFileUsItems3', JSON.stringify(sortedFileUsItems.map((item, idx) => `${`${idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`), null, 2));

        //

        fceRoots.entries = createFldCatRoots(fileUsItems);
        console.log('fceRoots.entries', fceRoots.entries);

        if (unsupported.length) {
            unsupportedMsg(unsupported);
        }

        const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));

        set(filesAtom, fileUsAtoms);
        busyIndicator.msg = '';
    }
);

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
