import { atom } from 'jotai';
import { proxySet } from 'valtio/utils';
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from '@shared/ipc-types';
import { type ManiAtoms } from '@/store/atoms/3-file-mani-atoms';
import { type CatalogFile, type Mani, type Meta, buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { fileUsStats } from '@/store/store-utils';
import { pathWithoutFilename, uuid } from '@/utils';

export function createFileUsFromFileContent(fileContent: FileContent): FileUs {
    console.log(`fileContent.fpath\n  "${fileContent.fpath}"\n  "${pathWithoutFilename(fileContent.fpath)}"`);
    const rv: FileUs = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent.idx,

        fname: fileContent.fname,
        fpath: pathWithoutFilename(fileContent.fpath),
        fmodi: fileContent.fmodi,
        size: fileContent.size,

        raw: fileContent.raw,

        webFsItem: fileContent.webFsItem,

        webFile: fileContent.webFile,
        legacyEntry: fileContent.legacyEntry,

        state: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
        
        maniAtomsAtom: atom<ManiAtoms | null>(null),
        changesSet: proxySet<string>(),
    };

    parseAndAddParseData(rv);
    return rv;
}

function parseAndAddParseData(newFileUs: FileUs) {
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
