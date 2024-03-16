import { atom } from 'jotai';
import { FileUs, FileUsAtomType, FileUsStats } from "@/store/store-types";
import { files2Atom } from './0-files-atom';
import { doUpdateCacheAtom } from './4-do-update-cache';
//import { _foldAllCardsAtom } from '../9-ui-state';
//import { rightPanelData } from '../2-right-panel';
import { uuid } from '@/utils';
import { deliveredAtom } from '../7-delivered';
import { FileContent } from '@shared/ipc-types';
import { CatalogFile, Mani, Meta, buildCatalogMeta, buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { fileUsStats } from '@/store/store-utils';

function deliveredToFileUs(deliveredFile: FileContent): FileUs {
    const newFileUs: FileUs = {
        id: uuid(),
        idx: deliveredFile.idx,

        fname: deliveredFile.fname,
        fpath: pathWoFilename(deliveredFile.fpath),
        fmodi: deliveredFile.fmodi,
        size: deliveredFile.size,

        raw: deliveredFile.raw,

        file: deliveredFile.file,
        entry: deliveredFile.entry,
        state: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        stats: {} as FileUsStats, // the real one will be assigned after caching content
    };

    addParseData(newFileUs);
    return newFileUs;

    function pathWoFilename(path: string | undefined): string {
        const rv = (path as string || '')
            .replace(/^\//, '')
            .split(/[\\\/]/);
        rv.pop(); // remove filename as the last item
        return rv.join('/');
    }

    function addParseData(newFileUs: FileUs) {
        let mani: Mani.Manifest | undefined;
        let fcat: CatalogFile.Root | undefined;
        let meta: Meta.Form[] | undefined;
        try {
            const res = parseXMLFile(newFileUs.raw || '');
            mani = res.mani;
            fcat = res.fcat;
            meta = buildManiMetaForms(mani);

            if (fcat) {
                /** TODO: later
                const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
                set(fldCatItemsAtom, items);
                */
            }

            newFileUs.mani = mani;
            newFileUs.fcat = fcat;
            newFileUs.meta = meta;
            newFileUs.stats = fileUsStats(newFileUs);

        } catch (error) {
            console.log('%ctm parse error', 'color: red', error, '\n', newFileUs.fname, newFileUs.raw);
        }
    }
}

export const doSetFilesAtom = atom(
    null,
    (get, set) => {
        const deliveredFiles = get(deliveredAtom);

        const finalFileUsAtoms: FileUsAtomType[] = deliveredFiles
            .filter((file) => file.size)
            .map((deliveredFile) => atom<FileUs>(deliveredToFileUs(deliveredFile)));

        //set(_foldAllCardsAtom, -1);
        set(files2Atom, finalFileUsAtoms);
        set(doUpdateCacheAtom);
        //set(rightPanelData.panelAtom, undefined);
    }
);

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
