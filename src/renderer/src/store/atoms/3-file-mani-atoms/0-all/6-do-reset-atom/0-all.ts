import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { resetManifest } from "./1-reset-manifest";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../9-types";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        if (!hasFileUsAnyChanges({ fileUs })) {
            return;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return;
        }

        resetManifest({ fileUs, fileUsAtom, maniAtoms, get, set });

        clearFileUsChanges({ fileUs });

        console.log('reset', fileUs.fileCnt.fname);
    }
);
