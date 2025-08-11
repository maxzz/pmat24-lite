import { type Atom, atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { getTestInUse, rootDir, sureRootDir } from "../0-files-atom/2-root-dir";

export function createTestInUseAtoms(fileCnt: FileContent): Pick<FileUs, 'maniInUseAtom' | 'maniInTestAtom'> {
    const { inUse, inTest } = getTestInUse(fileCnt.fpath);
    return {
        maniInUseAtom: atom<boolean>(inUse),
        maniInTestAtom: atom<boolean>(inTest),
    };
}

// export function initTestInUseAtoms(fileUsAtoms: FileUsAtom[], {get, set}: GetSet) {
//     fileUsAtoms.forEach(
//         (fileUsAtom) => {
//             const fileUs = get(fileUsAtom);
//             const fpath = fileUs.fileCnt.fpath.toLowerCase();

//             const { inUse, inTest } = getTestInUse(fpath);
//             set(fileUs.maniInUseAtom, inUse);
//             set(fileUs.maniInTestAtom, inTest);
//         }
//     );
// }

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
