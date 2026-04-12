import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/5-1-open-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { checkboxCreateManualModeAtom, setSizeNormal_SawMonitorAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorOpenAtom));
export const isCover_SawMonitorAtom = atom((get) => get(_sawMonitorCoverAtom));
export const isBodyVisible_SawMonitorAtom = atom((get) => get(_sawMonitorBodyAtom));
export const open_SawMonitorAtom         /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const open_SawMonitorForCpassAtom /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const close_SawMonitorAtom        /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));
export const hideBody_SawMonitorAtom     /**/ = atom(null, (get, set) => hideBody(get, set));
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

        set(_sawMonitorOpenAtom, doOpen);
        onOpenChange(doOpen, get, set);
    }
);

function onOpenChange(doOpen: boolean, get: Getter, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);
        cancelCoverRelease();
        cancelBodyReveal();
        const wasCoverVisible = get(_sawMonitorCoverAtom);
        set(_sawMonitorCoverAtom, true);
        set(_sawMonitorBodyAtom, false);
        set(_sawMonitorTransitionAtom, "opening");
        if (wasCoverVisible) {
            set(setSizeSmall_SawMonitorAtom);
            set(_sawMonitorTransitionAtom, "idle");
            scheduleBodyReveal(set);
        }
    } else {
        set(stopMonitorTimerAtom);
        clearIconsCache();
        set(_sawMonitorCoverAtom, true);
        set(_sawMonitorBodyAtom, false);
        set(_sawMonitorTransitionAtom, "closing");
        scheduleSizeNormal(set);
        scheduleCoverRelease(set);
    }
}

const _sawMonitorOpenAtom = atom(false);
const _sawMonitorCoverAtom = atom(false);
const _sawMonitorBodyAtom = atom(false);
const _sawMonitorTransitionAtom = atom<SawMonitorTransition>("idle");

type SawMonitorTransition = "idle" | "opening" | "closing";
let coverReleaseToken = 0;
let bodyRevealToken = 0;
let normalResizeToken = 0;

function finishSawOpen(get: Getter, set: Setter) {
    if (get(_sawMonitorTransitionAtom) !== "opening") {
        return;
    }

    set(setSizeSmall_SawMonitorAtom);
    set(_sawMonitorTransitionAtom, "idle");
    scheduleBodyReveal(set);
}

function finishSawClose(get: Getter, set: Setter) {
    if (get(_sawMonitorTransitionAtom) !== "closing") {
        return;
    }

    set(_sawMonitorTransitionAtom, "idle");
}

function hideBody(get: Getter, set: Setter) {
    if (!get(_sawMonitorOpenAtom)) {
        return;
    }

    cancelBodyReveal();
    cancelCoverRelease();
    set(_sawMonitorCoverAtom, true);
    set(_sawMonitorBodyAtom, false);
}

function scheduleCoverRelease(set: Setter) {
    const token = ++coverReleaseToken;
    const requestFrame = typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) => setTimeout(callback, 0);

    requestFrame(() => {
        requestFrame(() => {
            if (token !== coverReleaseToken) {
                return;
            }
            set(_sawMonitorCoverAtom, false);
        });
    });
}

function cancelCoverRelease() {
    coverReleaseToken += 1;
}

function scheduleSizeNormal(set: Setter) {
    const token = ++normalResizeToken;
    const requestFrame = typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) => setTimeout(callback, 0);

    requestFrame(() => {
        if (token !== normalResizeToken) {
            return;
        }
        set(setSizeNormal_SawMonitorAtom);
    });
}

function scheduleBodyReveal(set: Setter) {
    const token = ++bodyRevealToken;
    const requestFrame = typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) => setTimeout(callback, 0);

    requestFrame(() => {
        requestFrame(() => {
            if (token !== bodyRevealToken) {
                return;
            }
            set(_sawMonitorBodyAtom, true);
        });
    });
}

function cancelBodyReveal() {
    bodyRevealToken += 1;
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
