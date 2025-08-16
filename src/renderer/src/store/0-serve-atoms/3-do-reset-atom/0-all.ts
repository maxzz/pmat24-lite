import { atom } from "jotai";
import { toast } from "sonner";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { fileUsChanges } from "@/store/1-file-mani-atoms/9-types";
import { updateManiAtomsAfterSaveOrResetAtom } from "../2-do-save-mani-atom/0-save-atom";
import { doDeleteFileUsAtom } from "../4-do-delete-rename-reveal-quit";
import { resetManifest } from "./nun/1-reset-manifest";
//import { resetFc } from "./nun/5-reset-fc";

export const doResetOrDiscardOneAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom) => {
        const fileUs = get(fileUsAtom);

        if (fileUs.fileCnt.newFile) {
            set(doDeleteFileUsAtom, fileUsAtom);
            return;
        }

        if (!fileUsChanges.hasAny({ fileUs })) {
            return;
        }

        if (fileUs.fceAtomsForFcFile) {
            resetFieldCatalog(fileUsAtom, fileUs, { get, set });
        } else {
            resetManifestTake2(fileUsAtom, fileUs, { set });
        }
    }
);

function resetManifestTake2(fileUsAtom: FileUsAtom, fileUs: FileUs, { set }: SetOnly) {
    set(updateManiAtomsAfterSaveOrResetAtom, { fileUsAtom, resetToPrev: true });
    fileUsChanges.setUnchanged({ fileUs });
}

function resetManifestTake1(fileUsAtom: FileUsAtom, fileUs: FileUs, { get, set }: GetSet) {
    const maniAtoms = get(fileUs.maniAtomsAtom);
    if (maniAtoms) {
        resetManifest({ fileUs, fileUsAtom, maniAtoms, get, set });
        fileUsChanges.setUnchanged({ fileUs });
    }
}

function resetFieldCatalog(fileUsAtom: FileUsAtom, fileUs: FileUs, getset: GetSet) {
    toast.info('Resetting field catalog is not a good idea. Do it only if you know what you are doing.');
    /*
    // Good but deprecated (see notes inside resetFc()):
    resetFc(fileUs, fileUsAtom, get, set);
    clearFileUsChanges({ fileUs });
    */
}
