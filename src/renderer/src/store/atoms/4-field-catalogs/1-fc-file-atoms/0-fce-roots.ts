import { type FceRoots } from "../9-types-fc";
import { createEmptyFceRoot } from "./8-fc-file-to-fc-root";

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: FceRoots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: createEmptyFceRoot(),
    },
};
