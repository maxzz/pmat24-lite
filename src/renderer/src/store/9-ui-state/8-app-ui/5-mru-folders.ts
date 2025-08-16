import { type PmatFolder } from "@/store/1-files-atom";

/**
 * Most Recently Used folders (and maybe files, FCs).
 * 
 * For electron we use file system directory handles.
 * For non-electron we use indexedDB to store directory handles.
 * 
 * web: for files loaded without electron; indexDN loaded at start and updated on every change if needed
 * win: for files loaded with electron // win: for files loaded with electron; web folders stored in indexedDB
 * 
 *TODO:
 * Maybe it will be better to have separate lists for web and electron, because file
 * system directory handles are stored in indexedDB and electron just path strings are not.
 * OK: No. web or win are never used at the same time.
 */
export type MruLists = {
    folders: PmatFolder[];
};

export const defaultMruLists: MruLists = {
    folders: [],
};
