import { type FileUs } from "@/store/store-types";
import { type FceAtoms, type FceRoots } from "../9-types/1-types-fce-atoms";
import { createEmptyFceFileUs } from "./2-create-empty-fce-fileus";
import { createEmptyFceAtoms } from './3-create-empty-fce-atoms';

// Old 

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: FceRoots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: createEmptyFceAtoms(null),
    },
};

// New

export const rootFcFileUs: FileUs = createEmptyFceFileUs();

export function getFceRoot(): FceAtoms {
    if (!rootFcFileUs.fceAtoms) {
        throw new Error('rootFcFileUs.fceAtoms not set');
    }
    return rootFcFileUs.fceAtoms;
}

export function setFceRoot(fceRoot: FceAtoms): void {
    rootFcFileUs.fceAtoms = fceRoot;
}
