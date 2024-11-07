import { type FileUs, FileUsStats } from "@/store/store-types";
import { finalizeFileContent } from "@/store/store-utils";
import type { FileContent } from "@shared/ipc-types";
import { atom } from "jotai";
import { ManiAtoms } from "../../3-file-mani-atoms";


export function createEmptyFceAtoms(): FileUs {
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
        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };
    return rv;
}
