import { atom, type Getter, type Setter } from "jotai";
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../3-file-mani-atoms";
import { type FceItem, type FceAtoms } from "../9-types";
import { finalizeFileContent } from "@/store/store-utils";

export function createEmptyFceFileUs(): FileUs {
    const fileCnt: FileContent = finalizeFileContent(null);

    const rv: FileUs = {
        fileCnt,
        parsedSrc: {
            mani: undefined,
            meta: undefined,
            fcat: undefined,
            stats: {} as FileUsStats,
        },
        uiState: {
            isGroupAtom: atom<boolean>(false),
            isCurrentAtom: atom<boolean>(false),
        },
        maniAtomsAtom: atom<ManiAtoms | null>(null),

        fce0AtomsRef: undefined,
        fce0Atoms: undefined,

        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };

    rv.fceAtoms = createEmptyFceAtoms(rv) as FceAtoms;
    rv.fceAtoms.viewFceCtx = undefined;

    return rv;
}

export function createEmptyFceAtoms(fileUs: FileUs): Omit<FceAtoms, 'viewFceCtx'> {
    const rv: Omit<FceAtoms, 'viewFceCtx'> = {
        fileUs,
        descAtom: atom<string>(''),
        itemsAtom: atom<FceItem[]>([]),
    };
    return rv;
}

export function destroyFileUsLinks(get: Getter, set: Setter, fileUs: FileUs) {

    //fileUs.maniAtomsAtom = undefined;

    fileUs.fce0AtomsRef = undefined;
    fileUs.fce0Atoms = undefined;

    fileUs.fceAtomsRef = undefined;
    fileUs.fceAtoms = undefined;
}

export const doDestroyFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        destroyFileUsLinks(get, set, fileUs);
    }
);
