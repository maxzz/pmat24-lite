import { atom } from 'jotai';
import { hasMain } from '@/xternal-to-main';
import { type FileContent } from '@shared/ipc-types';
import { type ParsedSrc, type FileUs, type FileUsStats, finalizeFileContent } from "@/store";
import { type ManiAtoms } from '@/store/1-atoms/3-file-mani-atoms';
import { buildManiMetaForms, createNewManualFormFrom, parseXMLFile, TimeUtils } from '@/store/manifest';

export function createFileUsFromFileContent(fileContent: FileContent, masterFileUs?: FileUs): FileUs {
    const fileCnt: FileContent = finalizeFileContent(fileContent);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrc(fileCnt, masterFileUs),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fceAtomsForFcFile: undefined,   // will be assigned later when all files are loaded
        fceAtomsRefForMani: undefined,  // will be assigned later when all files are loaded

        mainForCpassAtom: undefined,
    };

    return rv;
}

function createParsedSrc(fileCnt: FileContent, masterFileUs?: FileUs): ParsedSrc {
    const rv: ParsedSrc = {
        mani: undefined,
        meta: undefined,
        fcat: undefined,
        stats: {} as FileUsStats, // the real one will be assigned after parsing content
    };

    try {
        const allFlavours = parseXMLFile(fileCnt.raw || '');

        console.log('parseXMLFile res', allFlavours);

        if (fileCnt.newFile) {
            // we already have initial parsed xml, so tweak it
        }

        if (fileCnt.newAsManual) {
            if (allFlavours.mani) {
                const loginForm = allFlavours.mani.forms[0];
                if (loginForm) {
                    allFlavours.mani.forms[0] = createNewManualFormFrom(loginForm);
                    
                    //TODO: manual mode UI will fail if we don't have any fields
                    //TODO: add field is not working at all
                    allFlavours.mani.forms[0].fields.push({
                        displayname: "Username",
                        type: "edit",
                        dbname: "{d63f92ba-ab9e-464e-bffb-a80d50862ee6}",
                        path_ext: "[sn]2.0.field;",
                        useit: true,
                    });

                } else {
                    console.error('Cannot find login form');
                }
            }
        }

        if (fileCnt.newAsCpass) {
        }

        rv.mani = allFlavours.mani;
        rv.meta = buildManiMetaForms(allFlavours.mani?.forms);
        rv.fcat = allFlavours.fcat;

        //TODO: we don't need this if we add some predefined fields, which maybe not bad idea
        if (fileCnt.newAsManual) {
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
