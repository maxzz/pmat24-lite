import { atom } from "jotai";
import { type FceItem, type FceRoots } from "./9-types-fc";
import { type FceCtx } from "./2-dialog-atoms";

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: FceRoots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: {
            fileCnt: null,
            fceAtomsAtom: atom<FceCtx | null>(null),
            descriptor: {},
            items: atom<FceItem[]>([]),
        },
    },
};
