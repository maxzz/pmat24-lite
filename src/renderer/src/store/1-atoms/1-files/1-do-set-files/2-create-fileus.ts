import { atom } from 'jotai';
import { hasMain } from '@/xternal-to-main';
import { type FileContent } from '@shared/ipc-types';
import { type ParsedSrc, type FileUs, type FileUsStats, finalizeFileContent } from "@/store";
import { type ManiAtoms } from '@/store/1-atoms/3-file-mani-atoms';
import { buildManiMetaForms, createManualFormDetection, createManualFormFields, createManualFormOptions, createNewManualForm, parseXMLFile, TimeUtils, uuid } from '@/store/manifest';

export function createNewFileContent(raw: string): FileContent {
    return {
        unid: uuid.asRelativeNumber(),
        idx: 0,
        fname: '',
        fpath: '',
        fmodi: 0,
        size: 0,
        raw,
        failed: false,
        notOur: false,
        newFile: true,
        newAsManual: false,
        fromMain: hasMain(),
        webFsItem: null,
        changesSet: new Set(),
    };
}

export function createFileUsFromFileContent(fileContent: FileContent): FileUs {
    // console.log(`fileContent.fpath\n  "${fileContent.fpath}"\n  "${pathWithoutFilename(fileContent.fpath)}"`);

    const fileCnt: FileContent = finalizeFileContent(fileContent);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrc(fileCnt),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fceAtomsForFcFile: undefined,   // will be assigned later when all files are loaded
        fceAtomsRefForMani: undefined,  // will be assigned later when all files are loaded
    };

    return rv;
}

function createParsedSrc(fileCnt: FileContent): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: undefined,
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
    };

    try {
        const res = parseXMLFile(fileCnt.raw || '');

        if (fileCnt.newFile) {
            //TODO: create new mani field
            //TODO: call createNewManualForm() here

            // const detection = createManualFormDetection({ caption: 'todo', dlg_class: 'todo', processname: 'todo', commandline: 'todo' });
            // const options = createManualFormOptions();
            // const fields = createManualFormFields();
            // const form = createNewManualForm({ detection, options, fields });
        }

        rv.mani = res.mani;
        rv.meta = buildManiMetaForms(res.mani?.forms);
        rv.fcat = res.fcat;
    } catch (error) {
        const msg = `tm parse error: ${error}\n${fileCnt.fname}\n${fileCnt.raw}`;
        fileCnt.raw = msg;
        fileCnt.failed = true;
        console.error(msg);
    }

    rv.stats = createFileUsStats(fileCnt, rv);
    
    return rv;
}

export function createParsedSrcForEmptyFce(fileCnt: FileContent): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: { names: [] }, // descriptor.id is optional and never used in the old PMAT
        stats: {} as FileUsStats,
    };
    rv.stats = createFileUsStats(fileCnt, rv);
    return rv;
}

function createFileUsStats(fileCnt: FileContent, parsedSrc: ParsedSrc): FileUsStats {
    const loginForm = parsedSrc.mani?.forms[0];
    const loginFormDomain = parsedSrc.meta?.[0]?.disp.domain;
    const isSubFolder = !!fileCnt.fpath && !fileCnt.fromMain; // fpath is empty for single items //const hasSubFolders = !!fileCnt.fpath?.match(/\//);

    const rv: FileUsStats = {
        loginFormDomain,

        isFCat: !!parsedSrc.fcat,
        isFCatRoot: false,
        isCustomization: !parsedSrc.meta?.length && !!parsedSrc.mani?.options,
        
        loginFormChooseNameAtom: atom(loginForm?.options?.choosename || ''),

        isSubFolder: isSubFolder,
        subFolder: fileCnt.fpath || '', // subFolder: hasSubFolders ? stripFirstFolder(fileCnt.fpath) : fileCnt.fpath || '',

        dateCreated: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.created),
        dateModified: TimeUtils.dpTimeToShow(parsedSrc.mani?.descriptor?.modified),
    };
    
    return rv;
}
