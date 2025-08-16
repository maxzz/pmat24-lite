import { atom } from "jotai";
import { proxy } from "valtio";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs, type HighlightHwnd } from "@/store/store-types";
import { type CatalogFile, createFceItemMeta } from "@/store/manifest";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { type FceItem, type FceAtoms, type FceItemEditor, defaultFcName, type FceItemValue, type FceDlgIn } from "../../9-types";
import { rootDir } from "@/store/1-files-atom";
import { catalogItemInFileToFceItemValue } from "@/store/0-serve-atoms/3-do-save-mani-atom";
import { createParsedSrcForEmptyFce, createTestInUseAtoms } from "@/store/0-serve-atoms/1-do-set-files";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./3-create-fce-ctx";

export function createFileUsForNewFc(): FileUs {
    const fileCnt: FileContent = finalizeFileContent(null);
    fileCnt.fpath = rootDir.fpath;
    fileCnt.fname = defaultFcName;

    const rv: FileUs = {
        fileCnt,
        parsedSrc: createParsedSrcForEmptyFce(fileCnt),
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        //maniAtomsAtom: createManiAtomsWithPrintAtom(null), // Debug version
        maniAtomsAtom: atom<ManiAtoms | null>(null),         // Non-debug version

        fceAtomsForFcFile: undefined,
        fceAtomsRefForMani: undefined,

        mainForCpassAtom: undefined,
        rawCpassAtom: atom<string | undefined>(undefined),
        hwndLoginAtom: atom<HighlightHwnd>(undefined),
        hwndCpassAtom: atom<HighlightHwnd>(undefined),

        ...createTestInUseAtoms(fileCnt),
    };

    rv.fceAtomsForFcFile = createFceAtoms({ fileUs: rv, desc: undefined, items: undefined });
    return rv;
}

export function createFceAtomsInFileUs(fileUs: FileUs): void {
    const fcat = fileUs.parsedSrc.fcat;
    if (!fcat) {
        throw new Error('This is not a field catalog file');
    }

    if (!fileUs.fceAtomsForFcFile) {
        const items: FceItem[] = finalizeFceItems(fcat.names);
        const rv: FceAtoms = createFceAtoms({ fileUs, desc: fcat.descriptor, items });
        fileUs.fceAtomsForFcFile = rv;
    }
}

function finalizeFceItems(items: CatalogFile.ItemInFile[]): FceItem[] {
    const rv: FceItem[] = items.map(
        (item, index) => {
            const beforeEdit = catalogItemInFileToFceItemValue(item);
            const rv: FceItem = {
                fieldValue: proxy<FceItemValue>({ ...beforeEdit }),
                beforeEdit,
                fceMeta: createFceItemMeta(index),
                editor: proxy<FceItemEditor>({ isSelectedInView: false, isSelectedInPicker: false, }),
            };
            return rv;
        }
    );
    return rv;
}

type CreateFceAtomsProps = {
    fileUs: FileUs;
    desc: CatalogFile.Descriptor | undefined;
    items: FceItem[] | undefined;
};

function createFceAtoms({ fileUs, desc, items }: CreateFceAtomsProps): FceAtoms {
    const rv: Omit<FceAtoms, 'viewFceCtx'> = {
        fileUs,
        aboutAtom: atom<string>(desc?.id || ''),
        allAtom: atom<FceItem[]>(items || []),
    };

    const inData: FceDlgIn = { openItemPickerDlg: false, dbid: undefined, showTxt: true, showPsw: true, outBoxAtom: undefined };

    (rv as FceAtoms).viewFceCtx = createFceCtx({
        fceAtoms: rv as FceAtoms,
        inData,
        closeFldCatDialog: () => { },
    });

    return rv as FceAtoms;
}
