import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/5-1-open-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { checkboxCreateManualModeAtom, setSizeNormal_SawMonitorAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const sawMonitor_isSawOpenAtom         /**/ = atom((get) => get(_sawMonitor_SawOpenAtom));   // i.e is the monitor dialog open
export const sawMonitor_isOpenCoverAtom       /**/ = atom((get) => get(_sawMonitor_OpenCoverAtom)); // i.e is the cover visible in the dialog
export const sawMonitor_isOpenBodyAtom        /**/ = atom((get) => get(_sawMonitor_OpenBodyAtom));  // i.e is the body visible in the dialog

export const sawMonitor_doSawOpenAtom         /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const sawMonitor_doSawOpenForCpassAtom /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const sawMonitor_doSawCloseAtom        /**/ = atom(() => null, (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));

export const sawMonitor_onFinishAnimation_AllCloseAtom   /**/ = atom(null, (get, set) => finish_SawCloseAnimation(get, set)); // i.e. finish the close animation
export const sawMonitor_onFinishAnimation_CoverOpenAtom  /**/ = atom(null, (get, set) => onFinishAnimation_CoverOpen(get, set)); // i.e. finish the open animation
export const sawMonitor_doHideBodyAtom        /**/ = atom(null, (get, set) => hideBody(get, set));

const doOpenCloseAtom = atom(
    null,
    (get, set, { doOpen, asCpass }: { doOpen: boolean; asCpass: boolean; }) => {
        const wasOpen = get(_sawMonitor_SawOpenAtom);
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

        set(_sawMonitor_SawOpenAtom, doOpen);
        onOpenChange(doOpen, get, set);
    }
);

function onOpenChange(doOpen: boolean, get: Getter, set: Setter) {
    if (doOpen) {
        set(checkboxCreateManualModeAtom, false);
        set(startMonitorTimerAtom);

        cancel_CoverRelease();
        cancel_BodyReveal();

        const wasCoverVisible = get(_sawMonitor_OpenCoverAtom);

        set(_sawMonitor_OpenCoverAtom, true);
        set(_sawMonitor_OpenBodyAtom, false);

        set(_sawMonitor_TransitionAtom, "opening");
        if (wasCoverVisible) {
            set(setSizeSmall_SawMonitorAtom);
            set(_sawMonitor_TransitionAtom, "idle");

            schedule_BodyReveal(set);
        }
    } else {
        set(stopMonitorTimerAtom);
        clearIconsCache();

        set(_sawMonitor_OpenCoverAtom, true);
        set(_sawMonitor_OpenBodyAtom, false);

        set(_sawMonitor_TransitionAtom, "closing");

        schedule_SizeNormal(set);
        schedule_CoverRelease(set);
    }
}

const _sawMonitor_SawOpenAtom = atom(false);
const _sawMonitor_OpenCoverAtom = atom(false);
const _sawMonitor_OpenBodyAtom = atom(false);

const _sawMonitor_TransitionAtom = atom<"idle" | "opening" | "closing">("idle");

function onFinishAnimation_CoverOpen(get: Getter, set: Setter) {
    if (get(_sawMonitor_TransitionAtom) !== "opening") {
        return;
    }

    set(setSizeSmall_SawMonitorAtom);
    set(_sawMonitor_TransitionAtom, "idle");
    schedule_BodyReveal(set);
}

function finish_SawCloseAnimation(get: Getter, set: Setter) {
    if (get(_sawMonitor_TransitionAtom) !== "closing") {
        return;
    }

    set(_sawMonitor_TransitionAtom, "idle");
}

function hideBody(get: Getter, set: Setter) {
    if (!get(_sawMonitor_SawOpenAtom)) {
        return;
    }

    cancel_BodyReveal();
    cancel_CoverRelease();

    set(_sawMonitor_OpenCoverAtom, true);
    set(_sawMonitor_OpenBodyAtom, false);
}

// Cover release

let token_coverRelease = 0;
function schedule_CoverRelease(set: Setter) {
    const token = ++token_coverRelease;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (token !== token_coverRelease) {
                return;
            }
            set(_sawMonitor_OpenCoverAtom, false);
        });
    });
}

function cancel_CoverRelease() {
    token_coverRelease += 1;
}

// Body reveal

let token_bodyReveal = 0;
function schedule_BodyReveal(set: Setter) {
    const token = ++token_bodyReveal;

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            if (token !== token_bodyReveal) {
                return;
            }
            set(_sawMonitor_OpenBodyAtom, true);
        });
    });
}

function cancel_BodyReveal() {
    token_bodyReveal += 1;
}

// Size normal

/**
 * It’s a small “latest-wins” scheduler to resize on the next paint. The module‑level token_normalResize is incremented each time schedule_SizeNormal runs, 
 * and the callback captures the current token. When the requestAnimationFrame callback fires, it checks whether a newer call happened in the meantime; 
 * if the token changed, the callback exits without doing anything. That prevents stale resize requests from applying. 
 * If it’s still current, it dispatches setSizeNormal_SawMonitorAtom to perform the resize on the next frame for smoother UI timing.
 */
let token_normalResize = 0;
function schedule_SizeNormal(set: Setter) {
    const token = ++token_normalResize;

    requestAnimationFrame(() => {
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
