import { proxy } from "valtio";
import { type PmatFolder } from "./9-types";
import { addToDirsMru } from "./3-mru-dirs";

export const rootDir: PmatFolder = proxy<PmatFolder>({
    rpath: '',
    handle: undefined,
    fromMain: false,
});

// All entry points after operations for web and electron: file open; folder open; dnd files; dnd folder 

export function setRootDir(folder: PmatFolder): void {
    const { rpath, handle, fromMain } = folder;

    rootDir.rpath = rpath;
    rootDir.handle = handle;
    rootDir.fromMain = fromMain;
    
    addToDirsMru(folder);
}

export function isRootDirEmpty(): boolean {
    return isPmatFolderEmpty(rootDir);
}

export function isPmatFolderEmpty(folder: PmatFolder): boolean {
    return !folder.rpath || (!folder.handle && !folder.fromMain);
}
