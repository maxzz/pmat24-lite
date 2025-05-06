import { type Setter, atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { rightPanelAtomAtom } from "../../3-right-panel";
import { newManiContent } from "../../2-file-mani-atoms";
import { checkboxCreateManualModeAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

// Open Saw monitor dialog

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorOpenAtom));
export const open_SawMonitorAtom = atom(() => null, (get, set) => set(doOpenCloseSawMonitorAtom, true));
export const close_SawMonitorAtom = atom(() => null, (get, set) => set(doOpenCloseSawMonitorAtom, false));

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
        onOpenChange(true, set);
        set(_sawMonitorOpenAtom, true);
    }
);

const doOpenCloseSawMonitorAtom = atom(
    null,
    (get, set, doOpen: boolean) => {
        doOpen && (newManiContent.maniForCpassAtom = undefined);
        onOpenChange(doOpen, set);
        set(_sawMonitorOpenAtom, doOpen);
    }
);

function onOpenChange(doOpen: boolean, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);
        set(setSizeSmall_SawMonitorAtom);
    } else {
        set(stopMonitorTimerAtom);
        clearIconsCache();
    }
}

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
