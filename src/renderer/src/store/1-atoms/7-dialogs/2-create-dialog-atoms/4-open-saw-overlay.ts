import { atom } from "jotai";
import { rightPanelAtom, type FileUsAtom } from "@/store";
import { newManiContent } from "@/components/4-dialogs";
import { FormIdx } from "@/store/manifest";

// Open Saw monitor overlay atom

export const doOpenSawOverlayForLoginAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
    (get, set, open: boolean | ((prev: boolean) => boolean)) => {
        const value = typeof open === 'function' ? open(get(_doOpenSawOverlayAtom)) : open;
        if (value) {
            newManiContent.mainForCpassAtom = undefined;
        }
        set(_doOpenSawOverlayAtom, value);
    }
);

const _doOpenSawOverlayAtom = atom(false);

// Open Saw monitor overlay for password change form

export const doOpenSawOverlayForCpassAtom = atom(
    null,
    (get, set) => {
        const mainForCpassAtom = get(rightPanelAtom);
        if (!mainForCpassAtom) {
            console.log('There is no mainForCpassAtom for password change form');
            return;
        }
        newManiContent.mainForCpassAtom = mainForCpassAtom;
        set(_doOpenSawOverlayAtom, true);
    }
);

export const allowedToCreateCpassAtom = atom(
    (get) => {
        const mainForCpassAtom = get(rightPanelAtom);
        if (!mainForCpassAtom) {
            return false;
        }

        const fileUs = get(mainForCpassAtom);

        if (fileUs.parsedSrc.stats.isFCatRoot) {
            return false;
        }

        const maniAtoms = get(fileUs.maniAtomsAtom);
        if (!maniAtoms) {
            return false;
        }

        if (maniAtoms[FormIdx.cpass]) {
            return false;
        }

        return true;
    }
);
