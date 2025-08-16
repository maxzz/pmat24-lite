import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/1-files-atom";
import { rightPanelAtomAtom } from "@/store/5-right-panel";
import { checkboxCreateManualModeAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorOpenAtom));
export const open_SawMonitorAtom         /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const open_SawMonitorForCpassAtom /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const close_SawMonitorAtom        /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));

const doOpenCloseAtom = atom(
    null,
    (get, set, { doOpen, asCpass }: { doOpen: boolean; asCpass: boolean; }) => {
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
