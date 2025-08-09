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

export function initTestInUseAtoms(fileUsAtoms: FileUsAtom[], getset: GetSet) {
    const rootPath = makeTestInUseRegex(rootDir.fpath);

    fileUsAtoms.forEach(
        (fileUsAtom) => {
            const fileUs = getset.get(fileUsAtom);
            const fpath = fileUs.fileCnt.fpath.toLowerCase();
            const m = fpath.match(rootPath);

            console.log(`initTestInUseAtoms: fpath: "${fileUs.fileCnt.fpath}" fname: "${fileUs.fileCnt.fname}"`, matchTestInUseRegex(rootDir.fpath, fpath));

            // const maniInUse = fileUs.maniInUseAtom.get();
            // const maniInTest = fileUs.maniInTestAtom.get();
            // fileUs.maniInUseAtom.set(maniInUse);
            // fileUs.maniInTestAtom.set(maniInTest);
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

function makeTestInUseRegex(rootPath: string): RegExp {
    return RegExp(`^${rootPath.toLowerCase()}(?:[\//]([a-c]))?$`, 'i');
}

function matchTestInUseRegex(rootPath: string, fpath: string): 'a' | 'b' | 'c' | null {
    const m = fpath.match(makeTestInUseRegex(rootPath));
    return m ? m[1] as 'a' | 'b' | 'c' : null;
}
