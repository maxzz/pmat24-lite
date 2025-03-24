import { type PmatFolder } from "../../1-files";

export type MruLists = {      // Most Recently Used folders and maybe files, FCs
    web: PmatFolder[];        // web: for files loaded without electron
    win: PmatFolder[];        // win: for files loaded with electron
};

export const defaultMruLists: MruLists = {
    web: [],
    win: [],
};
