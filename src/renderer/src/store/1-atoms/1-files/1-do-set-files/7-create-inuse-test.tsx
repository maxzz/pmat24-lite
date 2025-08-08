import { type Atom, atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";

export function createTestInUseAtoms(fileCnt: FileContent): Pick<FileUs, 'maniInUseAtom' | 'maniInTestAtom'> {
    let maniInUse = true; //TODO: initialize; not in use if sub-folder is B/C
    let maniInTest = false; //TODO: initialize; in test mode if sub-folder is C

    console.log(`createInUseTestAtoms: fpath: "${fileCnt.fpath}" fname: "${fileCnt.fname}"`);

    // if (fileCnt.unid === 'B' || fileCnt.unid === 'C') {
    //     set(maniInUseAtom, false);
    //     set(maniInTestAtom, true);
    // }

    return { 
        maniInUseAtom: atom<boolean>(maniInUse),
        maniInTestAtom: atom<boolean>(maniInTest),
     };
}
