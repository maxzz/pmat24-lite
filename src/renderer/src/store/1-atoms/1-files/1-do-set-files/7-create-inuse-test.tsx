import { type Atom, atom } from "jotai";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs } from "@/store/store-types";

export function createInUseTestAtoms(fileCnt: FileContent): Pick<FileUs, 'maniInUseAtom' | 'maniInTestAtom'> {
    const maniInUseAtom = atom<boolean>(true); //TODO: initialize; not in use if sub-folder is B/C
    const maniInTestAtom = atom<boolean>(false); //TODO: initialize; in test mode if sub-folder is C

    // if (fileCnt.unid === 'B' || fileCnt.unid === 'C') {
    //     set(maniInUseAtom, false);
    //     set(maniInTestAtom, true);
    // }

    return { maniInUseAtom, maniInTestAtom };
}
