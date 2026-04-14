import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/5-1-open-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { checkboxCreateManualModeAtom, setSizeNormal_SawMonitorAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const sawMonitor_isOpenAtom = atom((get) => get(_sawMonitor_OpenAtom));
export const sawMonitor_isCoverAtom = atom((get) => get(_sawMonitor_CoverAtom));
export const sawMonitor_isBodyVisibleAtom = atom((get) => get(_sawMonitor_BodyAtom));

export const sawMonitor_doOpenAtom         /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const sawMonitor_doOpenForCpassAtom /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const sawMonitor_doCloseAtom        /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));

export const sawMonitor_doHideBodyAtom     /**/ = atom(null, (get, set) => hideBody(get, set));
export const sawMonitor_doFinishOpenAtom   /**/ = atom(null, (get, set) => finish_SawOpen(get, set));
export const sawMonitor_doFinishCloseAtom  /**/ = atom(null, (get, set) => finish_SawClose(get, set));

const doOpenCloseAtom = atom(
    null,
    (get, set, { doOpen, asCpass }: { doOpen: boolean; asCpass: boolean; }) => {
        const wasOpen = get(_sawMonitor_OpenAtom);
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

        set(_sawMonitor_OpenAtom, doOpen);
        onOpenChange(doOpen, get, set);
    }
);

function onOpenChange(doOpen: boolean, get: Getter, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);
        
        cancel_CoverRelease();
        cancel_BodyReveal();
        
        const wasCoverVisible = get(_sawMonitor_CoverAtom);

        set(_sawMonitor_CoverAtom, true);
        set(_sawMonitor_BodyAtom, false);

        set(_sawMonitor_TransitionAtom, "opening");
        if (wasCoverVisible) {
            set(setSizeSmall_SawMonitorAtom);
            set(_sawMonitor_TransitionAtom, "idle");

            schedule_BodyReveal(set);
        }
    } else {
        set(stopMonitorTimerAtom);
        clearIconsCache();

        set(_sawMonitor_CoverAtom, true);
        set(_sawMonitor_BodyAtom, false);

        set(_sawMonitor_TransitionAtom, "closing");

        schedule_SizeNormal(set);
        schedule_CoverRelease(set);
    }
}

const _sawMonitor_OpenAtom = atom(false);
const _sawMonitor_CoverAtom = atom(false);
const _sawMonitor_BodyAtom = atom(false);
const _sawMonitor_TransitionAtom = atom<"idle" | "opening" | "closing">("idle");

let token_coverRelease = 0;
let token_bodyReveal = 0;
let token_normalResize = 0;

function finish_SawOpen(get: Getter, set: Setter) {
    if (get(_sawMonitor_TransitionAtom) !== "opening") {
        return;
    }

    set(setSizeSmall_SawMonitorAtom);
    set(_sawMonitor_TransitionAtom, "idle");
    schedule_BodyReveal(set);
}

function finish_SawClose(get: Getter, set: Setter) {
    if (get(_sawMonitor_TransitionAtom) !== "closing") {
        return;
    }

    set(_sawMonitor_TransitionAtom, "idle");
}

function hideBody(get: Getter, set: Setter) {
    if (!get(_sawMonitor_OpenAtom)) {
        return;
    }

    cancel_BodyReveal();
    cancel_CoverRelease();
    set(_sawMonitor_CoverAtom, true);
    set(_sawMonitor_BodyAtom, false);
}

// Cover release

function schedule_CoverRelease(set: Setter) {
    const token = ++token_coverRelease;

    const requestFrame = getRequestFrameFn();
    requestFrame(() => {
        requestFrame(() => {
            if (token !== token_coverRelease) {
                return;
            }
            set(_sawMonitor_CoverAtom, false);
        });
    });
}

function cancel_CoverRelease() {
    token_coverRelease += 1;
}

// Body reveal

function schedule_BodyReveal(set: Setter) {
    const token = ++token_bodyReveal;

    const requestFrame = getRequestFrameFn();
    requestFrame(() => {
        requestFrame(() => {
            if (token !== token_bodyReveal) {
                return;
            }
            set(_sawMonitor_BodyAtom, true);
        });
    });
}

function cancel_BodyReveal() {
    token_bodyReveal += 1;
}

// Size normal

function schedule_SizeNormal(set: Setter) {
    const token = ++token_normalResize;

    const requestFrame = getRequestFrameFn();
    requestFrame(() => {
        if (token !== token_normalResize) {
            return;
        }
        set(setSizeNormal_SawMonitorAtom);
    });
}

// Get atom to check if the current main can be used for cpass.

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

// Utility

function getRequestFrameFn() {
    return typeof requestAnimationFrame === "function"
        ? requestAnimationFrame
        : (callback: FrameRequestCallback) => setTimeout(callback, 0);
}
