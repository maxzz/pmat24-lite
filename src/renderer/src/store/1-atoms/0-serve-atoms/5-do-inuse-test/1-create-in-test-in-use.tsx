import { atom } from "jotai";
import { hasMain } from "@/xternal-to-main";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { getInTestInUse } from "./7-get-in-test-in-use";

export function createTestInUseAtoms(fileCnt: FileContent): Pick<FileUs, 'maniInTestAtom'> {
    const { inTest } = getInTestInUse(fileCnt.fpath);
    return {
        // maniInUseAtom: atom<boolean>(inUse),
        maniInTestAtom: atom<boolean>(inTest),
    };
}

export async function initLocalCacheTestInUseAtoms(fileUsAtoms: FileUsAtom[], getset: GetSet) {
    if (!hasMain()) {
        return;
    }

    // copy to local cache
    
    // TBD: make it in main process

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
