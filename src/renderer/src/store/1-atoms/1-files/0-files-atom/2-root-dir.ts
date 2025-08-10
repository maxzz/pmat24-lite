import { proxy, ref } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { hasMain } from "@/xternal-to-main";
import { type PmatFolder } from "./9-types";
import { addToDirsMru } from "./4-mru-dirs";
import { appMainTitle } from "../../../9-ui-state";

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

    rootDir.fpath = rpath;
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

// export type TestInUse = {
//     maniInUse: boolean;                                 // Is manifest file in use for production; from pmac: sub-folders: A(InUse), B(NotInUse), and C(NotInUseTest).
//     maniInTest: boolean;                                // Is manifest file in test mode
// }

export function makeTestInUseRegex(rootPath: string): RegExp {
    return RegExp(`^${rootPath.toLowerCase()}(?:[\//]([a-c]))?$`, 'i');
}

export function matchTestInUseRegex(rootPath: string, fpath: string): 'a' | 'b' | 'c' | undefined {
    const m = fpath.match(makeTestInUseRegex(rootPath));
    return m ? m[1] as 'a' | 'b' | 'c' : undefined;
}

export function getTestInUse(fpath: string): { maniInUse: boolean; maniInTest: boolean; } {
    const root = rootDir.fpath.toLowerCase();
    const sub = fpath.match(RegExp(`^${root}(?:[/\\][a-c])*$`, 'i'));
    const rv = {
        maniInUse: sub ? sub[1] === undefined : false,
        maniInTest: sub ? sub[1] === 'c' : false,
    };
    console.log(`getTestInUse: fpath: "${fpath}" rv:`, rv);
    return rv;
}
