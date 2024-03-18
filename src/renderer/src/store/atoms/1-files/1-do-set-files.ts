import { atom } from 'jotai';
import { filesAtom } from './0-files-atom';
import { FileContent } from '@shared/ipc-types';
import { isEmpty, isManual } from '@/store/store-utils';
import { busyIndicator, totalManis } from '../9-ui-state';
import { deliveredToFileUs } from './2-delivered-to-file-us';

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
    (get, set, deliveredContent: FileContent[]) => {
        busyIndicator.msg = 'Parsing...';
        totalManis.normal = 0;
        totalManis.manual = 0;
        totalManis.empty = 0;

        const fileUsItems =
            deliveredContent
                .filter((file) => file.size)
                .map((deliveredFile) => {
                    const newFileUs = deliveredToFileUs(deliveredFile);

                    if (isEmpty(newFileUs)) {
                        totalManis.empty++;
                    } else if (isManual(newFileUs)) {
                        totalManis.manual++;
                    } else {
                        totalManis.normal++;
                    }

                    return newFileUs;
                })
                .filter((fileUs) => {
                    if (fileUs.failed) {
                        console.error(fileUs.raw);
                    }
                    return !fileUs.failed;
                });

        const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));

        //set(_foldAllCardsAtom, -1);
        set(filesAtom, fileUsAtoms);

        busyIndicator.msg = '';
        //set(doUpdateCacheAtom);
        //set(rightPanelData.panelAtom, undefined);
    }
);
