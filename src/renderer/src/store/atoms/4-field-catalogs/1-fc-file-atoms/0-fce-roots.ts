import { type FileUs } from "@/store/store-types";
import { type FceRoot, type FceRoots } from "../9-types-fc";
import { createEmptyFceAtoms } from "./1-create-fce-roots";
import { createEmptyFceRoot } from "./8-fc-file-to-fc-root";

export type FceRootsAll = { // TBD: to make it proxy-able?
    entries: FceRoots;
};

export type FceRootsRootName = 'root';

export const fceRoots: FceRootsAll = {
    entries: {
        root: createEmptyFceRoot(null),
    },
};

export const rootFcFileUs: FileUs = createEmptyFceAtoms();

export function getFceRoot(): FceRoot {
    if (!rootFcFileUs.fceAtoms) {
        throw new Error('rootFcFileUs.fceAtoms not set');
    }
    return rootFcFileUs.fceAtoms;
}

export function setFceRoot(fceRoot: FceRoot): void {
    rootFcFileUs.fceAtoms = fceRoot;
}
