import { type PmatFolder } from "../../1-files";

export type MruLists = {      // Most Recently Used folders and maybe files, FCs
    web: PmatFolder[];        // web: for files loaded without electron; indexDN loaded at start and updated on every change if needed
    win: PmatFolder[];        // win: for files loaded with electron // win: for files loaded with electron; web folders stored in indexedDB
};

export const defaultMruLists: MruLists = {
    web: [],
    win: [],
};
