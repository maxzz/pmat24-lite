import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/5-1-open-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { checkboxCreateManualModeAtom, setSizeNormal_SawMonitorAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorOpenAtom));
export const open_SawMonitorAtom         /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const open_SawMonitorForCpassAtom /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const close_SawMonitorAtom        /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));
export const finishOpen_SawMonitorAtom   /**/ = atom(null, (get, set) => finishSawOpen(get, set));
export const finishClose_SawMonitorAtom  /**/ = atom(null, (get, set) => finishSawClose(get, set));

const doOpenCloseAtom = atom(
    null,
    (get, set, { doOpen, asCpass }: { doOpen: boolean; asCpass: boolean; }) => {
        const wasOpen = get(_sawMonitorOpenAtom);
        if (doOpen === wasOpen) {
            return;
        }

        sureRootDir();

        if (doOpen) {
            if (asCpass) {
                newManiContent.maniForCpassAtom = get(rightPanelAtomAtom);
                
                if (!newManiContent.maniForCpassAtom) {
                    throw new Error('no.mainForCpassAtom');
                }
            } else {
                newManiContent.maniForCpassAtom = undefined;
            }
        }

        onOpenChange(doOpen, set);
        set(_sawMonitorOpenAtom, doOpen);
    }
);

function onOpenChange(doOpen: boolean, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);
        set(_sawMonitorTransitionAtom, "opening");
    } else {
        set(stopMonitorTimerAtom);
        clearIconsCache();
        set(_sawMonitorTransitionAtom, "closing");
        set(setSizeNormal_SawMonitorAtom);
    }
}

const _sawMonitorOpenAtom = atom(false);
const _sawMonitorTransitionAtom = atom<SawMonitorTransition>("idle");

type SawMonitorTransition = "idle" | "opening" | "closing";

function finishSawOpen(get: Getter, set: Setter) {
    if (get(_sawMonitorTransitionAtom) !== "opening") {
        return;
    }

    set(setSizeSmall_SawMonitorAtom);
    set(_sawMonitorTransitionAtom, "idle");
}

function finishSawClose(get: Getter, set: Setter) {
    if (get(_sawMonitorTransitionAtom) !== "closing") {
        return;
    }

    set(_sawMonitorTransitionAtom, "idle");
}

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
