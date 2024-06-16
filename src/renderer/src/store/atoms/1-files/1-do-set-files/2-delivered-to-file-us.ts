import { atom } from 'jotai';
import { proxySet } from 'valtio/utils';
import { FileUs, FileUsStats } from "@/store/store-types";
import { uuid } from '@/utils';
import { FileContent } from '@shared/ipc-types';
import { CatalogFile, Mani, Meta, buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { fileUsStats } from '@/store/store-utils';
import { ManiAtoms } from '@/store/atoms/3-file-mani-atoms';

export function deliveredToFileUs(deliveredFile: FileContent): FileUs {
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
        
        maniAtomsAtom: atom<ManiAtoms | null>(null),
        changesSet: proxySet<string>(),
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
