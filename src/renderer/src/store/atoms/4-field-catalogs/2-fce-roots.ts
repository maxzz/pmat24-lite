import { atom } from "jotai";
import { type FceItem, type FceRoots } from "./9-types-fc";

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: FceRoots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: {
            fileCnt: null,
            descriptor: {},
            items: atom<FceItem[]>([]),
        },
    },
};
