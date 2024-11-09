import { atom } from 'jotai';
import { type FileContent } from '@shared/ipc-types';
import { type ParsedSrc, type FileUs, type FileUsStats, finalizeFileContent, fileUsStats } from "@/store";
import { type ManiAtoms } from '@/store/atoms/3-file-mani-atoms';
import { buildManiMetaForms, parseXMLFile } from '@/store/manifest';

export function createFileUsFromFileContent(fileContent: FileContent): FileUs {
    // console.log(`fileContent.fpath\n  "${fileContent.fpath}"\n  "${pathWithoutFilename(fileContent.fpath)}"`);

    const fileCnt: FileContent = finalizeFileContent(fileContent);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedData(fileCnt),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fce0AtomsRef: undefined,     // will be assigned later when all files are loaded
        fce0Atoms: undefined,        // will be assigned later when all files are loaded

        fceAtomsRef: undefined,      // will be assigned later when all files are loaded
        fceAtoms: undefined,         // will be assigned later when all files are loaded
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
        rv.meta = buildManiMetaForms(res.mani);
        rv.fcat = res.fcat;
    } catch (error) {
        const msg = `tm parse error: ${error}\n${fileCnt.fname}\n${fileCnt.raw}`;
        fileCnt.raw = msg;
        fileCnt.failed = true;
        console.error(msg);
    }

    rv.stats = fileUsStats(fileCnt, rv);
    
    return rv;
}
