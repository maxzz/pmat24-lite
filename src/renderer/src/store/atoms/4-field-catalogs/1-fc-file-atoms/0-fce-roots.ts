import { type FileUs } from "@/store/store-types";
import { FceAtoms, type Fce0Atoms, type Fce0Roots } from "../9-types";
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

let rootFcFileUs: FileUs = createEmptyFceFileUs();

export function getRootFceAtoms(): FceAtoms {
    if (!rootFcFileUs.fceAtoms) {
        throw new Error('rootFcFileUs.fceAtoms not set');
    }
    return rootFcFileUs.fceAtoms;
}

export function setRootFcFileUs(rootFcFileUs: FileUs) {
    rootFcFileUs = rootFcFileUs;
}
