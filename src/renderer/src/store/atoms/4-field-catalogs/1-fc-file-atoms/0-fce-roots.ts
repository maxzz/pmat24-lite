import { type FileUs } from "@/store/store-types";
import { type Fce0Atoms, type Fce0Roots } from "../9-types/1-types-fce-atoms";
import { createEmptyFceFileUs } from "./2-create-empty-fce-fileus";
import { createEmptyFceAtoms } from './3-create-empty-fce-atoms';

// Old 

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: Fce0Roots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: createEmptyFceAtoms(null),
    },
};

// New

export const rootFcFileUs: FileUs = createEmptyFceFileUs();

export function getFceRoot(): Fce0Atoms {
    if (!rootFcFileUs.fce0Atoms) {
        throw new Error('rootFcFileUs.fceAtoms not set');
    }
    return rootFcFileUs.fce0Atoms;
}

export function setFceRoot(fceRoot: Fce0Atoms): void {
    rootFcFileUs.fce0Atoms = fceRoot;
}
