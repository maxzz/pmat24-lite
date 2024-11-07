import { atom } from "jotai";
import { type FileUs, type FileUsStats } from "@/store/store-types";
import { type FileContent } from "@shared/ipc-types";
import { type ManiAtoms } from "../../3-file-mani-atoms";
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
        fceAtomsRef: undefined,
        fceAtoms: undefined,
    };
    return rv;
}
