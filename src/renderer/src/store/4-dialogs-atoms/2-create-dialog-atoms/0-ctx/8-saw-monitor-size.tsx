import { atom } from "jotai";
import { appSettings } from "@/store/9-ui-state";
import { hasMain, R2MCalls } from "@/xternal-to-main";

// doCancelSawModeByMainAtom is called from main (gate-react-listener-atom.ts) to cancel the Saw mode.

export const cancelSizeSmall_SawMonitorAtom = atom(
    null,
    (get, set) => {
        set(_sawModeStateAtom, false);
        resolveAllSawModeWaiters(false);
    }
);

export const notifySizeApplied_SawMonitorAtom = atom(
    null,
    (get, set, { setOn, requestId }: { setOn: boolean; requestId?: number; }) => {
        const resolved = resolveSawModeWaiter({ requestId, setOn });
        if (resolved || requestId === undefined) {
            set(_sawModeStateAtom, setOn);
        }
    }
);

export const setSizeSmall_SawMonitorAtom = atom(null, async (get, set) => set(setWindowSize_SawMonitorAtom, { turnOn: true }));
export const setSizeNormal_SawMonitorAtom = atom(null, async (get, set) => set(setWindowSize_SawMonitorAtom, { turnOn: false }));

// Implementation

type DoSawModeOnClientAtomParams = {
    turnOn: boolean; // Is to set the mode on or off
};

const setWindowSize_SawMonitorAtom = atom(
    null,
    async (get, set, { turnOn }: DoSawModeOnClientAtomParams): Promise<boolean> => {
        const isOn = get(_sawModeStateAtom);
        const hasPending = hasPendingSawModeWaiters();

        if (turnOn === isOn && !hasPending) {
            return isOn;
        }

        if (!hasMain()) {
            set(_sawModeStateAtom, turnOn);
            return turnOn;
        }

        const position = appSettings.appUi.uiGeneral.sawPosition;
        const waiter = createSawModeWaiter();

        R2MCalls.setSawModeOnMain({ setOn: turnOn, position, requestId: waiter.requestId });
        const applied = await waiter.promise;
        set(_sawModeStateAtom, applied);

        return applied;
    }
);

const _sawModeStateAtom = atom<boolean>(false); // Is saw mode on or off

type SawModeWaiter = {
    resolve: (setOn: boolean) => void;
};

let nextSawModeRequestId = 1;
const sawModeWaiters = new Map<number, SawModeWaiter>();

function createSawModeWaiter(): { requestId: number; promise: Promise<boolean>; } {
    const requestId = nextSawModeRequestId++;
    const promise = new Promise<boolean>((resolve) => {
        sawModeWaiters.set(requestId, { resolve });
    });
    return { requestId, promise };
}

function hasPendingSawModeWaiters(): boolean {
    return sawModeWaiters.size > 0;
}

function resolveSawModeWaiter({ requestId, setOn }: { requestId?: number; setOn: boolean; }): boolean {
    if (requestId === undefined) {
        return false;
    }

    const waiter = sawModeWaiters.get(requestId);
    if (!waiter) {
        return false;
    }

    sawModeWaiters.delete(requestId);
    waiter.resolve(setOn);
    return true;
}

function resolveAllSawModeWaiters(setOn: boolean): void {
    for (const waiter of sawModeWaiters.values()) {
        waiter.resolve(setOn);
    }
    sawModeWaiters.clear();
}

//TODO: check what we do on cancel from main.
