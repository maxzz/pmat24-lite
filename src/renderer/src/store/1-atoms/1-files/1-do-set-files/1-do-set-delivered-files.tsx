import { atom } from "jotai";
import { delay } from "@/utils";
import { toast } from "sonner";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type PmatFolder, filesAtom, isRootDirEmpty, setRootDir } from "../0-files-atom";
import { addToTotalManis, appSettings, busyIndicator, clearTotalManis } from "@/store/9-ui-state";
import { doDisposeAllFilesAtomAtom } from "@/store/store-utils";
import { allFileUsChanges } from "../../2-file-mani-atoms";
import { rightPanelAtomAtom } from "../../3-right-panel";
import { doAddFcToLoadedAtom, doClearFcRootAtom, doInitFileUsLinksToFcAtom } from "../../4-field-catalogs";
import { createFileUsFromFileContent } from "./2-create-fileus";

export type SetDeliveredFiles = {
    deliveredFileContents: FileContent[] | undefined;
    root: PmatFolder;
    noItemsJustDir: boolean; // to allow to open an empty folder
};

/**
 * @param deliveredFileContents - files content populated from web or electron environments
 * @param root - root folder from which the files were loaded; TBD: it's not set undefined if the root folder is empty?
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
    async (get, set, { root, deliveredFileContents }: SetDeliveredFiles) => {
        //printDelivered(deliveredFileContents);

        let clearFiles = typeof deliveredFileContents === 'undefined';
        deliveredFileContents = deliveredFileContents || [];

        if (deliveredFileContents.length > 100) {   // Allow fast cleaning, no files, no delay
            busyIndicator.msg = 'Parsing...';       // TODO: all heavy stuff is already done in the main process, so it should be done earlier
            await delay(100);                       // Delay to update busyIndicator UI (it's not shown if the process is too fast).
        }

        setRootDir(root);

        set(rightPanelAtomAtom, undefined);
        set(doClearFcRootAtom);
        set(doDisposeAllFilesAtomAtom);
        allFileUsChanges.clear();

        clearTotalManis();

        if (isRootDirEmpty()) { // block multiple files or folders
            !clearFiles && toast.warning('Opening multiple files or folders is not allowed. Drag and drop one folder.');
            deliveredFileContents = [];
            clearFiles = true;
        }

        const unsupported: FileUs[] = [];

        const fileUsItems: FileUs[] = deliveredFileContents
            .filter((file) => file.size)
            .map(
                (deliveredFileContent: FileContent) => {
                    const newFileUs = createFileUsFromFileContent(deliveredFileContent);
                    addToTotalManis(newFileUs);
                    return newFileUs;
                }
            )
            .filter(filterUnsupportedFiles);

        set(doAddFcToLoadedAtom, { fileUsItems, clearFiles });

        sortFileUsItemsInPlace(fileUsItems);

        showUnsupportedFilesMsg(unsupported);

        const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));
        set(filesAtom, fileUsAtoms);

        set(doInitFileUsLinksToFcAtom, { fileUsAtoms, clearFiles });

        busyIndicator.msg = '';

        function filterUnsupportedFiles(fileUs: FileUs) {
            const notUs = fileUs.fileCnt.failed || fileUs.fileCnt.notOur || (!fileUs.parsedSrc.mani && !fileUs.parsedSrc.fcat);
            if (notUs) {
                fileUs.fileCnt.failed && console.error(fileUs.fileCnt.rawLoaded);
                unsupported.push(fileUs);
            }
            return !notUs;
        }
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
    //printSorted(items);
}

//appSettings.files.shownManis.fcAllowed;

function printDelivered(deliveredFileContents: FileContent[]) {
    console.log(`%cDelivered ${deliveredFileContents.length} files`, 'color: magenta');

    deliveredFileContents.forEach(
        (fc) => {
            console.log(`    %cfpath: "${fc.fpath}" %cfname: ${fc.fname}`, 'color: tan', 'color: gray', { fileContent: fc });
        }
    );
}

function printSorted(items: FileUs[]) {
    console.log('sortedFileUsItems',
        JSON.stringify(items.map(
            (item, idx) => `${`${idx}`.padStart(2, ' ')} ${`${item.fileCnt.idx}`.padStart(2, ' ')} ${item.fileCnt.fname}`
        ), null, 2));
}

function showUnsupportedFilesMsg(unsupported: FileUs[]) {
    const { notifyAlienfiles } = appSettings.appUi.uiGeneral;

    if (!unsupported.length || !notifyAlienfiles) {
        return;
    }

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

//03.21.25
//TODO: switch to check folder instead of file list length
//TODO: rename menu 'clear file list' to close folder - done
//TBD: filter .dpn files? - done
//TODO: remove focus on main menu button on file list left panel <- probably not needed

//03.21.25
//TODO: add 'super debug options' option
//TODO: add check for single field logins

//03.24.25
//TODO: test open multiple folders DND from electron
