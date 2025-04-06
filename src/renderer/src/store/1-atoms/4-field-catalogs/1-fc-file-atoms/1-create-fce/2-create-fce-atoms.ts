import { atom } from "jotai";
import { proxy } from "valtio";
import { type FileUs } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms, catalogItemInFileToFceItemValue } from "../../../2-file-mani-atoms";
import { type FceItem, type FceAtoms, type FceItemEditor, defaultFcName, type FceItemValue, type FceDlgIn } from "../../9-types";
import { type CatalogFile, createFceItemMeta } from "@/store/manifest";
import { finalizeFileContent } from "@/store/store-utils";
import { rootDir } from "@/store/1-atoms/1-files/0-files-atom";
import { createParsedSrcForEmptyFce } from "@/store/1-atoms/1-files";
import { createFceCtx } from "./3-create-fce-ctx";
import { a } from "@react-spring/web";

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
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fceAtomsForFcFile: undefined,
        fceAtomsRefForMani: undefined,

        mainForCpassAtom: undefined,
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
