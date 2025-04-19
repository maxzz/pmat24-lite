import { type Getter, type Setter, atom } from "jotai";
import { toast } from "sonner";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { fileUsChanges } from "../../9-types";
import { updateFileUsAfterSaveOrResetAtom } from "../2-do-save-mani-atom/0-save-atom/0-all/3-save-or-reset-fileus";
import { resetManifest } from "./1-reset-manifest";
//import { resetFc } from "./5-reset-fc";

export const doResetOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        if (!fileUsChanges.hasAny({ fileUs })) {
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
        fileUsChanges.clearAll({ fileUs });
    }
}

function resetManifextTake2(fileUsAtom: FileUsAtom, fileUs: FileUs, get: Getter, set: Setter) {
    set(updateFileUsAfterSaveOrResetAtom, { fileUsAtom, resetToPrev: true });
    fileUsChanges.clearAll({ fileUs });
}
