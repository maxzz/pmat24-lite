import { type Getter, type Setter, atom } from "jotai";
import { type FileUs } from "@/store/store-types";
import { filesAtom } from "@/store/atoms";

function discardFileUs(get: Getter, set: Setter, fileUs: FileUs) {

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

/**
 * Discard FileUs links atom
 */
export const doDiscardFileUsAtom = atom(
    null,
    (get, set, fileUs: FileUs) => {
        discardFileUs(get, set, fileUs);
    }
);

/**
 * Discard all array of FileUs atom
 */
export const doDiscardAllFilesFileUsLinksAtom = atom(
    null,
    (get, set) => {
        const all = get(filesAtom);
        all.forEach(
            (fileUsAtom) => {
                const fileUs = get(fileUsAtom);
                discardFileUs(get, set, fileUs);
            }
        );
    }
);
