import { atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FceAtoms, type FceCtx, type FceItem } from "../9-types";
import { finalizeFileContent } from "@/store/store-utils";

export function createEmptyFceAtoms(fileCnt: FileContent | null | undefined): FceAtoms {
    const rv: FceAtoms = {
        fileCnt: fileCnt || finalizeFileContent(null),
        fceCtxAtom: atom<FceCtx | null>(null),
        descriptor: {},
        items: atom<FceItem[]>([]),
    };
    return rv;
}
