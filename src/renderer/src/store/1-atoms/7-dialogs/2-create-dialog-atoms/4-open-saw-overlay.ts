import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { newManiContent, rightPanelAtomAtom } from "@/store";

// Open Saw monitor overlay atom

export const isOpen_SawMonitorAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
);

export const doOpen_SawMonitorAtom = atom(
    (get) => null,
    (get, set) => set(doOpenSawOverlayForLoginAtom, true)
);

export const doClose_SawMonitorAtom = atom(
    (get) => null,
    (get, set) => set(doOpenSawOverlayForLoginAtom, false)
);

export const doOpenSawOverlayForLoginAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
    (get, set, value: boolean | ((prev: boolean) => boolean)) => {
        const doOpen = typeof value === 'function' ? value(get(_doOpenSawOverlayAtom)) : value;
        if (doOpen) {
            newManiContent.maniForCpassAtom = undefined;
        }
        set(_doOpenSawOverlayAtom, doOpen);
    }
);

const _doOpenSawOverlayAtom = atom(false);

// Open Saw monitor overlay for password change form

export const doOpenSawOverlayForCpassAtom = atom(
    null,
    (get, set) => {
        const mainForCpassAtom = get(rightPanelAtomAtom);
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
        const mainForCpassAtom = get(rightPanelAtomAtom);
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
