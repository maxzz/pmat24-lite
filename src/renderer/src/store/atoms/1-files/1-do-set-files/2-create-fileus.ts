import { atom } from 'jotai';
import { proxySet } from 'valtio/utils';
import { type ParsedSrc, type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from '@shared/ipc-types';
import { type ManiAtoms } from '@/store/atoms/3-file-mani-atoms';
import { type CatalogFile, type Mani, type Meta, buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { fileUsStats } from '@/store/store-utils';
import { uuid } from '@/utils';

export function createFileUsFromFileContent(fileContent: FileContent): FileUs {
    // console.log(`fileContent.fpath\n  "${fileContent.fpath}"\n  "${pathWithoutFilename(fileContent.fpath)}"`);

    const rv: FileUs = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent.idx,

        fname: fileContent.fname,
        fpath: fileContent.fpath,
        fmodi: fileContent.fmodi,
        size: fileContent.size,

        raw: fileContent.raw,

        webFsItem: fileContent.webFsItem,

        webFile: fileContent.webFile,

        parsedSrc: {} as ParsedSrc, // the real one will be assigned after parsing content
        state: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },

        maniAtomsAtom: atom<ManiAtoms | null>(null),
        changesSet: proxySet<string>(),
    };

    parseAndAddParseData(rv);
    return rv;
}

function parseAndAddParseData(newFileUs: FileUs): void {
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

        newFileUs.parsedSrc = {
            mani,
            fcat,
            meta,
            stats: fileUsStats(newFileUs),
        };
    } catch (error) {
        const msg = `tm parse error: ${error}\n${newFileUs.fname}\n${newFileUs.raw}`;
        newFileUs.raw = msg;
        newFileUs.failed = true;
        console.error(msg);
    }
}
