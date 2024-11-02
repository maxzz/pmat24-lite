import { atom } from 'jotai';
import { proxySet } from 'valtio/utils';
import { type ParsedSrc, type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from '@shared/ipc-types';
import { type ManiAtoms } from '@/store/atoms/3-file-mani-atoms';
import { buildManiMetaForms, parseXMLFile } from '@/store/manifest';
import { type FceCtx } from '../../4-field-catalogs';
import { fileUsStats } from '@/store/store-utils';
import { uuid } from '@/utils';

export function createFileUsFromFileContent(fileContent: FileContent): FileUs {
    // console.log(`fileContent.fpath\n  "${fileContent.fpath}"\n  "${pathWithoutFilename(fileContent.fpath)}"`);

    const fileCnt: FileContent = {
        unid: uuid.asRelativeNumber(),
        idx: fileContent.idx,

        fname: fileContent.fname,
        fpath: fileContent.fpath,
        fmodi: fileContent.fmodi,
        size: fileContent.size,
        raw: fileContent.raw,

        fromMain: fileContent.fromMain,

        webFsItem: fileContent.webFsItem,
        webFile: fileContent.webFile,

        changesSet: proxySet<string>(),
    };

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedData(fileCnt),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),
        fceRoot: undefined, // will be assigned later when all files are loaded
    };

    return rv;
}

function createParsedData(fileCnt: FileContent): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: undefined,
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
    };

    try {
        const res = parseXMLFile(fileCnt.raw || '');
        rv.mani = res.mani;
        rv.fcat = res.fcat;
        rv.meta = buildManiMetaForms(res.mani);

        if (rv.fcat) {
            /**
             * TODO: later. one per root folder including A, B, C subfolders
             *
            const { items } = buildCatalogMeta(fcat); //TODO: we need to load multiple catalog files
            set(fldCatItemsAtom, items);
            */
        }
    } catch (error) {
        const msg = `tm parse error: ${error}\n${fileCnt.fname}\n${fileCnt.raw}`;
        fileCnt.raw = msg;
        fileCnt.failed = true;
        console.error(msg);
    }

    rv.stats = fileUsStats(fileCnt, rv);
    
    return rv;
}
