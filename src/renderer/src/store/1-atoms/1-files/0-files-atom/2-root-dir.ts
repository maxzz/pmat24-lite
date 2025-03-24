import { proxy } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { addToDirsMru } from "./3-mru-dirs";
import { appMainTitle } from "../../9-ui-state/0-local-storage-app";

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

    if (hasMain()) {
        appMainTitle.title = filenameWithoutPath(folder.rpath); //TODO: for multiple folders show 'multiple folders' or something else
    } else {
        appMainTitle.title = folder.rpath;
    }
    
    addToDirsMru(folder);
}

export function isRootDirEmpty(): boolean {
    return isPmatFolderEmpty(rootDir);
}

export function isPmatFolderEmpty(folder: PmatFolder): boolean {
    return !folder.rpath || (!folder.handle && !folder.fromMain);
}
