import { atom } from "jotai";
import { FormIdx } from "@/store/8-manifest";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { sureRootDir } from "@/store/5-1-open-files";
import { rightPanelAtomAtom } from "@/store/5-3-right-panel";
import { checkboxCreateManualModeAtom, setSizeNormal_SawMonitorAtom, setSizeSmall_SawMonitorAtom, startMonitorTimerAtom, stopMonitorTimerAtom } from "./0-ctx";

export const isOpen_SawMonitorAtom = atom((get) => get(_sawMonitorStageAtom) !== 'closed');
export const isVisible_SawMonitorBodyAtom = atom((get) => get(_sawMonitorStageAtom) === 'open');
export const open_SawMonitorAtom         /**/ = atom(() => null, async (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: false }));
export const open_SawMonitorForCpassAtom /**/ = atom(() => null, async (get, set) => set(doOpenCloseAtom, { doOpen: true, asCpass: true }));
export const close_SawMonitorAtom        /**/ = atom(() => null, async (get, set) => set(doOpenCloseAtom, { doOpen: false, asCpass: false }));
export const doClose_SawMonitorFromMainAtom = atom(
    null,
    (get, set) => {
        bumpSawMonitorTransition(set, get);
        finalizeSawMonitorClosed(set);
    }
);

const doOpenCloseAtom = atom(
    null,
    async (get, set, { doOpen, asCpass }: { doOpen: boolean; asCpass: boolean; }): Promise<boolean> => {
        if (doOpen) {
            if (get(_sawMonitorStageAtom) !== 'closed') {
                return false;
            }

            sureRootDir();

            if (asCpass) {
                newManiContent.maniForCpassAtom = get(rightPanelAtomAtom);
                
                if (!newManiContent.maniForCpassAtom) {
                    throw new Error('no.mainForCpassAtom');
                }
            } else {
                newManiContent.maniForCpassAtom = undefined;
            }

            return openSawMonitor(set, get);
        }

        return closeSawMonitor(set, get);
    }
);

async function openSawMonitor(set: Setter, get: Getter): Promise<boolean> {
    const transitionId = bumpSawMonitorTransition(set, get);

    set(checkboxCreateManualModeAtom, false);
    set(_sawMonitorStageAtom, 'opening');

    await waitForNextPaint();
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }

    const resized = await set(setSizeSmall_SawMonitorAtom);
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }
    if (!resized) {
        finalizeSawMonitorClosed(set);
        return false;
    }

    await waitForNextPaint();
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }

    set(_sawMonitorStageAtom, 'open');
    set(startMonitorTimerAtom);
    return true;
}

async function closeSawMonitor(set: Setter, get: Getter): Promise<boolean> {
    const stage = get(_sawMonitorStageAtom);

    if (stage === 'closed') {
        finalizeSawMonitorClosed(set);
        return false;
    }
    if (stage === 'closing') {
        return false;
    }

    const transitionId = bumpSawMonitorTransition(set, get);

    set(stopMonitorTimerAtom);
    set(_sawMonitorStageAtom, 'closing');

    await waitForNextPaint();
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }

    await set(setSizeNormal_SawMonitorAtom);
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }

    await waitForNextPaint();
    if (!isCurrentSawMonitorTransition(get, transitionId)) {
        return false;
    }

    finalizeSawMonitorClosed(set);
    return true;
}

function finalizeSawMonitorClosed(set: Setter): void {
    set(stopMonitorTimerAtom);
    set(_sawMonitorStageAtom, 'closed');
    clearIconsCache();
}

function bumpSawMonitorTransition(set: Setter, get: Getter): number {
    const transitionId = get(_sawMonitorTransitionIdAtom) + 1;
    set(_sawMonitorTransitionIdAtom, transitionId);
    return transitionId;
}

function isCurrentSawMonitorTransition(get: Getter, transitionId: number): boolean {
    return get(_sawMonitorTransitionIdAtom) === transitionId;
}

function waitForNextPaint(): Promise<void> {
    return new Promise((resolve) => {
        if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
            setTimeout(resolve, 0);
            return;
        }

        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => resolve());
        });
    });
}

type SawMonitorStage = 'closed' | 'opening' | 'open' | 'closing';

const _sawMonitorStageAtom = atom<SawMonitorStage>('closed');
const _sawMonitorTransitionIdAtom = atom(0);

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
