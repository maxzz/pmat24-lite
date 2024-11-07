import { atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FceCtx } from "../2-fc-dialog-atoms";
import { type FceAtoms, type FceItem } from "../9-types-fc";
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
