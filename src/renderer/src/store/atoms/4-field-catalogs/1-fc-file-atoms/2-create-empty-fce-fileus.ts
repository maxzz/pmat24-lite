import { atom } from "jotai";
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../3-file-mani-atoms";
import { type FceItem, type FceAtoms } from "../9-types";
import { finalizeFileContent } from "@/store/store-utils";
import { createFceCtx } from "./3-create-fce-ctx";

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
    rv.fceAtoms.viewFceCtx = createFceCtx({
        fceAtoms: rv.fceAtoms,
        inData: undefined,
        closeFldCatDialog: () => {},
    });

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
