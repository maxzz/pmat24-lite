import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { newManiContent, rightPanelAtom } from "@/store";

// Open Saw monitor overlay atom

export const doOpenSawOverlayForLoginAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
    (get, set, value: boolean | ((prev: boolean) => boolean)) => {
        const open = typeof value === 'function' ? value(get(_doOpenSawOverlayAtom)) : value;
        if (open) {
            newManiContent.maniForCpassAtom = undefined;
        }
        set(_doOpenSawOverlayAtom, open);
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
        newManiContent.maniForCpassAtom = mainForCpassAtom;
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
