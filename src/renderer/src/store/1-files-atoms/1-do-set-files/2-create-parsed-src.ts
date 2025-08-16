import { atom } from "jotai";
import { type FileUs, type ParsedSrc, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type Mani, defaultManualFormFields, parseXMLFile, createNewManualFormFrom, buildManiMetaForms, TimeUtils, rebuildMetaFormsWithCpassForm, FormIdx, createGuid } from "@/store/manifest";

export function createParsedSrc({ fileCnt, maniForCpass }: { fileCnt: FileContent; maniForCpass: FileUs | undefined; }): ParsedSrc {
    const rv: ParsedSrc = { mani: undefined, meta: undefined, fcat: undefined, stats: {} as FileUsStats, }; // the real stats will be assigned after parsing content
    const { newFile, newAsManual } = fileCnt;

    try {
        let { mani: parsedMani, fcat: parsedFcat } = parseXMLFile(fileCnt.rawLoaded || '');

        tweakNewMani({ parsedMani, maniForCpass, newAsManual, newFile });

        rv.mani = parsedMani;
        rv.meta = buildManiMetaForms(parsedMani?.forms);
        rv.fcat = parsedFcat;

        tweakNewMeta({ newParsedSrc: rv, maniForCpass, newAsManual });
    } catch (error) {
        const msg = `tm parse error: ${error}\n${fileCnt.fname}\n${fileCnt.rawLoaded}`;
        fileCnt.rawLoaded = msg;
        fileCnt.failed = true;
        console.error(msg);
    }

    rv.stats = createFileUsStats(fileCnt, rv);
    return rv;
}

function tweakNewMani({ parsedMani, maniForCpass, newAsManual, newFile }: { parsedMani: Mani.Manifest | undefined; maniForCpass: FileUs | undefined; newAsManual: boolean; newFile: boolean; }): void {
    if (!parsedMani || !newFile) {
        return;
    }
    if (parsedMani.forms.length > 1) { // remove cpass form (from test xml), but also later we need re-create xml
        parsedMani.forms.length = 1;
    }

    const loginForm = parsedMani.forms[0];
    if (!loginForm) {
        throw new Error('No app detection part');
    }

    if (newAsManual) {
        parsedMani.forms[0] = createNewManualFormFrom(loginForm);
        parsedMani.forms[0].fields = defaultManualFormFields(!!maniForCpass);
    }

    if (maniForCpass) {
        if (!maniForCpass.parsedSrc.mani) {
            throw new Error('No mani for cpass');
        }
        const firstForm = parsedMani.forms[0];
        maniForCpass.parsedSrc.mani.forms[1] = firstForm;
    }
}

function tweakNewMeta({ newParsedSrc, maniForCpass, newAsManual }: { newParsedSrc: ParsedSrc; maniForCpass: FileUs | undefined; newAsManual: boolean; }): void {
    if (maniForCpass) {
        const { mani: existingMani, meta: existingMeta } = maniForCpass.parsedSrc;
        const newForm = newParsedSrc.mani?.forms[FormIdx.login];
        if (!existingMeta || !existingMani || !newForm) {
            throw new Error('No mani for cpass');
        }
        rebuildMetaFormsWithCpassForm(existingMeta, existingMani.forms, newForm);
    }

    if (newAsManual) { //TODO: we don't need this if we add some predefined fields, which maybe not bad idea
        const createdForm = maniForCpass ? maniForCpass.parsedSrc.meta?.[FormIdx.cpass] : newParsedSrc.meta?.[FormIdx.login];
        if (!createdForm) {
            throw new Error('Cannot find meta form');
        }
        createdForm.disp.isScript = true;
    }
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
