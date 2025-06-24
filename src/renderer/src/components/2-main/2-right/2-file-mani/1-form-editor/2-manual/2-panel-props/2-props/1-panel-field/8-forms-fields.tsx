import { atom } from "jotai";
import { cpassFieldsIdx, type FormFields, loginFieldsIdx, safeManiAtoms, type FileUsCtx } from "@/store/1-atoms/2-file-mani-atoms";

export const doGetLinksAtom = atom(
    null,
    (get, set, fileUsCtx: FileUsCtx): readonly FormFields[] | undefined => {
        const maniAtoms = safeManiAtoms(get(fileUsCtx.fileUs.maniAtomsAtom));

        const currentForm = maniAtoms[fileUsCtx.formIdx];
        if (!currentForm) {
            return;
        }

        const rv = [
            get(maniAtoms[loginFieldsIdx]),
            get(maniAtoms[cpassFieldsIdx]),
        ] as const;

        return rv;
    }
);
