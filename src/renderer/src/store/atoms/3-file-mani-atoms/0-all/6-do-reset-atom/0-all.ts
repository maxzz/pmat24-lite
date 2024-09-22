import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { resetManifest } from "./1-reset-manifest";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        const changed = !!fileUs.changesSet.size;
        if (!changed) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        resetManifest({ fileUs, fileUsAtom, maniAtoms, get, set });

        console.log('reset', fileUs.fname);

        fileUs.changesSet.clear();
    }
);
