import { type Getter, type Setter, atom } from "jotai";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { resetManifest } from "./1-reset-manifest";
import { clearFileUsChanges, hasFileUsAnyChanges } from "../../9-types";
//import { resetFc } from "./5-reset-fc";
import { toast } from "sonner";
import { updateFileUsAfterSaveOrResetAtom } from "@/store/1-atoms/1-files/1-do-set-files";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        if (!hasFileUsAnyChanges({ fileUs })) {
            return;
        }

        if (fileUs.fceAtomsForFcFile) {
            resetFieldCatalog(fileUsAtom, fileUs, get, set);
        } else {
            resetManifextTake2(fileUsAtom, fileUs, get, set);
        }

        //console.log('reset', fileUs.fileCnt.fname);
    }
);

function resetFieldCatalog(fileUsAtom: FileUsAtom, fileUs: FileUs, get: Getter, set: Setter) {
    toast.info('Resetting field catalog is not a good idea. Do it only if you know what you are doing.');
    /*
    // Good but deprecated (see notes inside resetFc()):
    resetFc(fileUs, fileUsAtom, get, set);
    clearFileUsChanges({ fileUs });
    */
}

function resetManifextTake1(fileUsAtom: FileUsAtom, fileUs: FileUs, get: Getter, set: Setter) {
    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        resetManifest({ fileUs, fileUsAtom, maniAtoms, get, set });
        clearFileUsChanges({ fileUs });
    }
}

function resetManifextTake2(fileUsAtom: FileUsAtom, fileUs: FileUs, get: Getter, set: Setter) {
    set(updateFileUsAfterSaveOrResetAtom, { fileUsAtom, reset: true });
    clearFileUsChanges({ fileUs });
}
