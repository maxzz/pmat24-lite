import { type FileUs } from "@/store/store-types";
import { type Getter, type Setter, atom } from "jotai";

/**
 * Discard FileUs links
 */
export function discardFileUs(get: Getter, set: Setter, fileUs: FileUs) {

    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        const login = maniAtoms[0];
        const cpass = maniAtoms[1];

        //TODO: break other links
    }

    fileUs.fceAtomsRef = undefined;

    if (fileUs.fceAtoms) {
        if (fileUs.fceAtoms.viewFceCtx) {
            (fileUs.fceAtoms.viewFceCtx.fceAtoms as any) = undefined;
            fileUs.fceAtoms.viewFceCtx = undefined;
        }
        fileUs.fceAtoms = undefined;
    }
}

export const doDiscardFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        discardFileUs(get, set, fileUs);
    }
);
