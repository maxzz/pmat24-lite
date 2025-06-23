import { atom } from "jotai";
import { cpassFieldsIdx, loginFieldsIdx, safeManiAtoms, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";

export const doGetLinksAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx) => {
        const maniAtoms = safeManiAtoms(get(fileUsCtx.fileUs.maniAtomsAtom));

        const currentForm = maniAtoms[fileUsCtx.formIdx];
        if (!currentForm) {
            return;
        }

        return [
            get(maniAtoms[loginFieldsIdx]),
            get(maniAtoms[cpassFieldsIdx]),
        ];
    }
);
