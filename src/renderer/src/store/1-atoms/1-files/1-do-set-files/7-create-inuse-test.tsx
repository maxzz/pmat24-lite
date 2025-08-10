import { type Atom, atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { rootDir, sureRootDir } from "../0-files-atom/2-root-dir";

export function createTestInUseAtoms(fileCnt: FileContent): Pick<FileUs, 'maniInUseAtom' | 'maniInTestAtom'> {
    let maniInUse = true; //TODO: initialize; not in use if sub-folder is B/C
    let maniInTest = false; //TODO: initialize; in test mode if sub-folder is C

    console.log(`createInUseTestAtoms: fpath: "${fileCnt.fpath}" fname: "${fileCnt.fname}"`);

    // const goodForFc = !fileUs.parsedSrc.stats.isFCat && fileUs.fileCnt.fpath.toLowerCase().match(RegExp(`^${rootPath}(?:[/\\][a-c])*$`));
    // if (goodForFc) {
    //     fileUs.fceAtomsRefForMani = rootFc.fceAtomsForFcFile;
    // }

    return {
        maniInUseAtom: atom<boolean>(maniInUse),
        maniInTestAtom: atom<boolean>(maniInTest),
    };
}

export function initTestInUseAtoms(fileUsAtoms: FileUsAtom[], {get, set}: GetSet) {
    const rootPath = makeTestInUseRegex(rootDir.fpath);

    fileUsAtoms.forEach(
        (fileUsAtom) => {
            const fileUs = get(fileUsAtom);
            const fpath = fileUs.fileCnt.fpath.toLowerCase();
            const m = fpath.match(rootPath);

            console.log(`initTestInUseAtoms: fpath: "${fileUs.fileCnt.fpath}" fname: "${fileUs.fileCnt.fname}"`, matchTestInUseRegex(rootDir.fpath, fpath));

            const { maniInUse, maniInTest } = getTestInUse(fpath);
            set(fileUs.maniInUseAtom, maniInUse);
            set(fileUs.maniInTestAtom, maniInTest);
        }
    );
}

export async function initLocalCacheTestInUseAtoms(fileUsAtoms: FileUsAtom[], getset: GetSet) {
    const promises = fileUsAtoms.map(
        async (fileUsAtom) => {
            const fileUs = getset.get(fileUsAtom);
            if (fileUs) {
                // const maniInUse = await fileUs.maniInUseAtom.get();
                // const maniInTest = await fileUs.maniInTestAtom.get();
                // fileUs.maniInUseAtom.set(maniInUse);
                // fileUs.maniInTestAtom.set(maniInTest);
            }
        }
    );
    await Promise.all(promises);
}

// Utilities

// export type TestInUse = {
//     maniInUse: boolean;                                 // Is manifest file in use for production; from pmac: sub-folders: A(InUse), B(NotInUse), and C(NotInUseTest).
//     maniInTest: boolean;                                // Is manifest file in test mode
// }

function makeTestInUseRegex(rootPath: string): RegExp {
    return RegExp(`^${rootPath.toLowerCase()}(?:[\//]([a-c]))?$`, 'i');
}

function matchTestInUseRegex(rootPath: string, fpath: string): 'a' | 'b' | 'c' | undefined {
    const m = fpath.match(makeTestInUseRegex(rootPath));
    return m ? m[1] as 'a' | 'b' | 'c' : undefined;
}

function getTestInUse(fpath: string): { maniInUse: boolean; maniInTest: boolean; } {
    const sub = fpath.toLowerCase().match(RegExp(`^${rootDir.fpath}(?:[/\\][a-c])*$`));
    return {
        maniInUse: !sub,
        maniInTest: sub ? sub[1] === 'c' : false,
    };
}
