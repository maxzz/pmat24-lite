import { atom } from 'jotai';
import { type FileUs, type ParsedSrc, type FileUsStats } from '@/store';
import { type FileContent } from '@shared/ipc-types';
import { type Mani, defaultManualFormFields, parseXMLFile, createNewManualFormFrom, buildManiMetaForms, TimeUtils } from '@/store/manifest';

function tweakNewMani({ parsedMani, maniForCpass, newAsManual }: { parsedMani: Mani.Manifest; maniForCpass: FileUs | undefined; newAsManual: boolean; }): void {

    if (parsedMani.forms.length > 1) { // remove cpass form, but also later we need re-create xml
        parsedMani.forms.length = 1;
    }

    const loginForm = parsedMani.forms[0];
    if (!loginForm) {
        throw new Error('No app detection part');
    }

    if (newAsManual) {
        const newForm = createNewManualFormFrom(loginForm);
        newForm.fields = defaultManualFormFields();
        parsedMani.forms[0] = newForm;
    }

    if (maniForCpass) {
        //TODO:
    }
}

export function createParsedSrc({ fileCnt, maniForCpass }: { fileCnt: FileContent; maniForCpass: FileUs | undefined; }): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: undefined,
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
    };

    try {
        let { mani: parsedMani, fcat: parsedFcat } = parseXMLFile(fileCnt.raw || '');

        if (parsedMani && fileCnt.newFile) {
            tweakNewMani({ parsedMani, maniForCpass: maniForCpass, newAsManual: fileCnt.newAsManual });
        }

        rv.mani = parsedMani;
        rv.meta = buildManiMetaForms(parsedMani?.forms);
        rv.fcat = parsedFcat;

        if (fileCnt.newAsManual) { //TODO: we don't need this if we add some predefined fields, which maybe not bad idea
            const loginMetaForm = rv.meta[0];
            if (loginMetaForm) {
                loginMetaForm.disp.isScript = true;
            } else {
                console.error('Cannot find login meta form');
            }
        }

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
