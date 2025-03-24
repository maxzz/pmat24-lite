import { type PmatFolder } from "../../1-files";

export type MruLists = {      // Most Recently Used folders and maybe files, FCs
    win: PmatFolder[];        // win: for files loaded with electron; web folders stored in indexedDB
};

export const defaultMruLists: MruLists = {
    win: [],
};
