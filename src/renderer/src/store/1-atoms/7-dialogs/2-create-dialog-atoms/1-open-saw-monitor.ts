import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { newManiContent, rightPanelAtomAtom } from "@/store";

// Open Saw monitor dialog

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorOpenAtom));
export const open_SawMonitorAtom = atom(() => null, (get, set) => set(doOpenCloseSawMonitorAtom, true));
export const close_SawMonitorAtom = atom(() => null, (get, set) => set(doOpenCloseSawMonitorAtom, false));

const doOpenCloseSawMonitorAtom = atom(
    (get) => null,
    (get, set, value: boolean | ((prev: boolean) => boolean)) => {
        const doOpen = typeof value === 'function' ? value(get(_sawMonitorOpenAtom)) : value;
        if (doOpen) {
            newManiContent.maniForCpassAtom = undefined;
        }
        set(_sawMonitorOpenAtom, doOpen);
    }
);

/**
 * Open Saw monitor overlay for password change form
 */
export const doOpen_SawMonitorForCpassAtom = atom(
    null,
    (get, set) => {
        const mainForCpassAtom = get(rightPanelAtomAtom);
        if (!mainForCpassAtom) {
            console.log('There is no mainForCpassAtom for password change form');
            return;
        }

        newManiContent.maniForCpassAtom = mainForCpassAtom;
        set(_sawMonitorOpenAtom, true);
    }
);

const _sawMonitorOpenAtom = atom(false);

// Utility

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
        if (!maniAtoms || maniAtoms[FormIdx.cpass]) {
            return false;
        }

        return true;
    }
);
