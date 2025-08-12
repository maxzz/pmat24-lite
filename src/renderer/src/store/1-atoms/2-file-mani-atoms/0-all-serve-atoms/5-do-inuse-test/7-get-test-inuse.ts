import { normalizeFpath } from "@/utils";
import { type FileContent } from "@shared/ipc-types";
import { rootDir } from "../../../1-files/0-files-atom/2-root-dir";

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
