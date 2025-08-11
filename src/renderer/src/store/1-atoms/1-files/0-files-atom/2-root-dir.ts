import { proxy, ref } from "valtio";
import { filenameWithoutPath, normalizeFpath } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { addToDirsMru } from "./4-mru-dirs";
import { appMainTitle } from "../../../9-ui-state";
import { FileContent } from "@shared/ipc-types";

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

// Subfolder detection utilities

export function getTestInUse(fpath: string): { inUse: boolean; inTest: boolean; } {
    fpath = normalizeFpath(fpath);

    if (fpath === rootDir.fpath) {
        //console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: green", { inUse: true, inTest: false, });
        return { inUse: true, inTest: false, };
    }

    const m = fpath.match(/[\//]([a-c])$/i);
    if (m === null) {
        //console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: blue", { inUse: false, inTest: false, });
        return { inUse: false, inTest: false, }; // if not matched suffix then it's not our subfolder
    }

    //console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: orange", { inUse: m[1] === 'a', inTest: m[1] === 'c', });
    return { inUse: m[1] === 'a', inTest: m[1] === 'c', };
}

export function isPmatFileToLoad(fileCnt: FileContent): boolean {
    const { inUse, inTest } = getTestInUse(fileCnt.fpath);
    return inUse || inTest;
}

// see also src/renderer/src/components/2-main/2-right/1-header/0-all/2-row3-filename-parts.tsx:
//      const reFilenameMatch = /^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/; //TODO: handle '{guid} + extra.dpm' filenames
