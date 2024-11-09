import { type FileUs } from "@/store/store-types";
import { type Getter, type Setter, atom } from "jotai";

export function destroyFileUsLinks(get: Getter, set: Setter, fileUs: FileUs) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        const login = maniAtoms[0];
        const cpass = maniAtoms[1];

        //TODO: break other links
    }

    fileUs.fce0AtomsRef = undefined;
    fileUs.fce0Atoms = undefined;

    fileUs.fceAtomsRef = undefined;
    fileUs.fceAtoms = undefined;
}

export const doDestroyFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        destroyFileUsLinks(get, set, fileUs);
    }
);
