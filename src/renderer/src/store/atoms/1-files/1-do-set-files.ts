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
import { fileUsStats, isEmpty, isManual } from '@/store/store-utils';
import { busyIndicator, totalManis } from '../9-ui-state';

function deliveredToFileUs(deliveredFile: FileContent): FileUs {
    const newFileUs: FileUs = {
        id: uuid.asRelativeNumber(),
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
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
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
                /** 
                 * TODO: later. one per root folder including A, B, C subfolders
                 * 
                const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
                set(fldCatItemsAtom, items);
                */
            }

            newFileUs.mani = mani;
            newFileUs.fcat = fcat;
            newFileUs.meta = meta;
            newFileUs.stats = fileUsStats(newFileUs);
        } catch (error) {
            const msg = `tm parse error: ${error}\n${newFileUs.fname}\n${newFileUs.raw}`;
            newFileUs.raw = msg;
            newFileUs.failed = true;
            console.error(msg);
        }
    }
}

export const doSetFilesAtom = atom(
    null,
    (get, set) => {
        const deliveredContent = get(deliveredAtom);

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
        set(files2Atom, fileUsAtoms);

        busyIndicator.msg = '';
        //set(doUpdateCacheAtom);
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
