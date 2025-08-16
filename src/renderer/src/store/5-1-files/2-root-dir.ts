import { proxy, ref } from "valtio";
import { filenameWithoutPath, normalizeFpath } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { addToDirsMru } from "./4-mru-dirs";
import { appMainTitle } from "@/store/9-ui-state";

export const rootDir: PmatFolder = proxy<PmatFolder>({
    fpath: '',
    handle: undefined,
    fromMain: false,
});

// All entry points after operations for web and electron: file open; folder open; dnd files; dnd folder 

export function setRootDir(folder: PmatFolder | undefined): void {
    if (!folder) {
        rootDir.fpath = '';
        rootDir.handle = undefined;
        rootDir.fromMain = false;
        return;
    }

    const { fpath: rpath, handle, fromMain } = folder;

    rootDir.fpath = normalizeFpath(rpath);
    rootDir.handle = handle ? ref(handle) : undefined;
    rootDir.fromMain = fromMain;

    if (hasMain()) {
        appMainTitle.title = filenameWithoutPath(folder.fpath); //TODO: for multiple folders show 'multiple folders' or something else
    } else {
        appMainTitle.title = folder.fpath;
    }

    addToDirsMru(folder);
}

// Utilities

export function undefinedPmatFolder(): PmatFolder {
    return { fpath: '', handle: undefined, fromMain: false };
}

export function isRootDirEmpty(): boolean {
    return isPmatFolderEmpty(rootDir);
}

/**
 * Empty is when path is empty or we are in browser and there is no handle.
 */
export function isPmatFolderEmpty(folder: PmatFolder): boolean {
    return !folder.fpath || (!folder.fromMain && !folder.handle);
}

export function sureRootDir(): string {
    if (!rootDir.fpath) {
        throw new Error('no.rootDir.fpath');
    }
    return rootDir.fpath;
}
