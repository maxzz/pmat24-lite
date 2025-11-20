import { atom } from "jotai";
import { delay } from "@/utils";
import { notice } from "@/ui/local-ui/7-toaster";
import { addToTotalManis, appSettings, busyIndicator, clearTotalManis } from "@/store/9-ui-state";
import { doDisposeAllFilesAtomAtom } from "@/store/store-utils";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { allFileUsChanges } from "@/store/2-file-mani-atoms";
import { type PmatFolder, filesAtom, isRootDirEmpty, setRootDir, undefinedPmatFolder } from "@/store/5-1-open-files";
import { sortFileUsItemsInPlaceAndSetIndices } from "@/store/5-2-tree-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { isPmatFileToLoad, inTest_Start } from "@/store/0-serve-atoms/6-do-inuse-test";
import { doAddFcToLoadedAtom, doClearFcRootAtom, doInitFileUsLinksToFcAtom } from "@/store/3-field-catalog-atoms";
import { createFileUsFromFileContent } from "./3-create-fileus";

export type SetDeliveredFiles = {
    deliveredFileContents: FileContent[] | undefined;
    root: PmatFolder;
    noItemsJustDir: boolean; // to allow to open an empty folder
    error: string | undefined;
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

        let runningClearFiles = typeof deliveredFileContents === 'undefined';
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
            !runningClearFiles && notice.warning('Opening multiple files or folders is not allowed. Drag and drop one folder.');
            deliveredFileContents = [];
            runningClearFiles = true;
            setRootDir(undefinedPmatFolder());
        }

        const initializedFileUsItems: FileUs[] = deliveredFileContents
            .filter((file) => file.size)
            .filter(isPmatFileToLoad)
            .map(
                (deliveredFileContent: FileContent) => {
                    const newFileUs = createFileUsFromFileContent(deliveredFileContent);
                    addToTotalManis(newFileUs);
                    return newFileUs;
                }
            );

        const { fileUsItems, unsupported } = splitOursAndNotOurs(initializedFileUsItems);
        sortFileUsItemsInPlaceAndSetIndices(fileUsItems);

        set(doAddFcToLoadedAtom, { fileUsItems, runningClearFiles });

        const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));
        set(filesAtom, fileUsAtoms);

        inTest_Start(fileUsAtoms, { get, set });

        set(doInitFileUsLinksToFcAtom, { fileUsAtoms, runningClearFiles });

        showUnsupportedFilesMsg(unsupported);

        busyIndicator.msg = '';
    }
);

function splitOursAndNotOurs(initializedFileUsItems: FileUs[]): { fileUsItems: FileUs[]; unsupported: FileUs[]; } {
    const { fcAllowed } = appSettings.files.shownManis;

    const unsupported: FileUs[] = [];
    const fileUsItems: FileUs[] = initializedFileUsItems.filter(filterUnsupportedFiles);

    return { fileUsItems, unsupported };

    function filterUnsupportedFiles(fileUs: FileUs) {
        const notUs = fileUs.fileCnt.failed || fileUs.fileCnt.notOur || (!fileUs.parsedSrc.mani && !fileUs.parsedSrc.fcat) || (!fcAllowed && fileUs.parsedSrc.stats.isFCat);
        if (notUs) {
            fileUs.fileCnt.failed && console.error(fileUs.fileCnt.rawLoaded);
            unsupported.push(fileUs);
        }
        return !notUs;
    }
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

    notice.warning(msg, {
        // TODO: add details popup dialog
        // action: { label: 'Details', onClick: () => { console.log('Unsupported files:', unsupported); }, }
    });
}

function printDelivered(deliveredFileContents: FileContent[]) {
    console.log(`%cDelivered ${deliveredFileContents.length} files`, 'color: magenta');

    deliveredFileContents.forEach(
        (fc) => {
            console.log(`    %cfpath: "${fc.fpath}" %cfname: ${fc.fname}`, 'color: tan', 'color: gray', { fileContent: fc });
        }
    );
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
