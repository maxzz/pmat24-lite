import { filenameForRegex, normalizeFpath } from "@/utils";
import { type FileContent } from "@shared/ipc-types";
import { rootDir } from "../../1-files/0-files-atom/2-root-dir";

// Subfolder detection utilities

export function getInTestInUse(fpath: string): { inTest: boolean; inUse: boolean; } {
    fpath = normalizeFpath(fpath);

    if (fpath === rootDir.fpath) {
        // console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: green", { inUse: true, inTest: false, });
        return { inTest: false, inUse: true, };
    }

    const regex = new RegExp(`^${filenameForRegex(rootDir.fpath)}/([a-c])$`, 'i'); // It should be a direct 'a' or 'c' folder from the root (which is always normalized to Unix and lower case)

    const m = fpath.match(regex);
    if (m === null) {
        // console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: blue", { inUse: false, inTest: false, });
        return { inTest: false, inUse: false, }; // if not matched suffix then it's not our subfolder
    }

    // console.log(`%cgetTestInUse: fpath: "${fpath}":`, "color: orange", { inUse: m[1] === 'a', inTest: m[1] === 'c', });
    return { inTest: m[1] === 'c', inUse: m[1] === 'a', };
}

export function isPmatFileToLoad(fileCnt: FileContent): boolean {
    const { inUse, inTest } = getInTestInUse(fileCnt.fpath);
    printInTestInUse(fileCnt, inUse, inTest);
    return inUse || inTest;
}

function printInTestInUse(fileCnt: FileContent, inUse: boolean, inTest: boolean) {
    const color =
        inUse
            ? 'color: green'
            : inTest
                ? 'color: orange'
                : 'color: blue';
    console.log(`%c"${fileCnt.fpath}%c/${fileCnt.fname}":`, color, 'color: gray', { inUse, inTest, });
}

// see also src/renderer/src/components/2-main/2-right/1-header/0-all/2-row3-filename-parts.tsx:
//      const reFilenameMatch = /^\{([0-9A-Za-z]{3,3})(.*)([0-9A-Za-z]{3,3})\}\.dpm$/; //TODO: handle '{guid} + extra.dpm' filenames
