import { atom } from 'jotai';
import { files2Atom } from './0-files-atom';
//import { _foldAllCardsAtom } from '../9-ui-state';
//import { rightPanelData } from '../2-right-panel';
import { FileContent } from '@shared/ipc-types';
import { isEmpty, isManual } from '@/store/store-utils';
import { busyIndicator, totalManis } from '../9-ui-state';
import { treeFilesAtom } from '../2-tree-files';
import { deliveredToFileUs } from './1-delivered-to-file-us';

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


        console.log('set files2Atom', fileUsAtoms);
        //set(_foldAllCardsAtom, -1);
        set(files2Atom, fileUsAtoms);
        set(treeFilesAtom);

        busyIndicator.msg = '';
        //set(doUpdateCacheAtom);
        //set(rightPanelData.panelAtom, undefined);
    }
);

// export const doSetFilesAtom = atom(
//     null,
//     (get, set, deliveredContent: FileContent[]) => {
//         busyIndicator.msg = 'Parsing...';
//         totalManis.normal = 0;
//         totalManis.manual = 0;
//         totalManis.empty = 0;

//         const fileUsItems =
//             deliveredContent
//                 .filter((file) => file.size)
//                 .map((deliveredFile) => {
//                     const newFileUs = deliveredToFileUs(deliveredFile);

//                     if (isEmpty(newFileUs)) {
//                         totalManis.empty++;
//                     } else if (isManual(newFileUs)) {
//                         totalManis.manual++;
//                     } else {
//                         totalManis.normal++;
//                     }

//                     return newFileUs;
//                 })
//                 .filter((fileUs) => {
//                     if (fileUs.failed) {
//                         console.error(fileUs.raw);
//                     }
//                     return !fileUs.failed;
//                 });

//         const fileUsAtoms = fileUsItems.map((fileUs) => atom(fileUs));


//         console.log('set files2Atom', fileUsAtoms);
//         //set(_foldAllCardsAtom, -1);
//         set(files2Atom, fileUsAtoms);
//         set(treeFilesAtom);

//         busyIndicator.msg = '';
//         //set(doUpdateCacheAtom);
//         //set(rightPanelData.panelAtom, undefined);
//     }
// );

// export const doSetFilesAtom = atom(
//     null,
//     (get, set, accepterFiles: File[]) => {
//         const droppedIn: FileUsAtomType[] = accepterFiles
//             .filter((file) => file.size)
//             .map(
//                 (fileHandle, idx) => {
//                     const newFileUs: FileUs = {
//                         id: uuid(),
//                         idx,
//                         fname: fileHandle.name,
//                         fpath: pathWoFilename(fileHandle),
//                         fmodi: fileHandle.lastModified || 0,
//                         size: fileHandle.size,
//                         file: fileHandle,
//                         state: {
//                             isGroupAtom: atom<boolean>(false),
//                             isCurrentAtom: atom<boolean>(false),
//                         },
//                         stats: {} as FileUsStats, // the real one will be assigned after caching content
//                     };
//                     return atom<FileUs>(newFileUs);
//                 }
//             );

//         //set(_foldAllCardsAtom, -1);
//         set(files2Atom, droppedIn);
//         set(doUpdateCacheAtom);
//         //set(rightPanelData.panelAtom, undefined);
//     }
// );
