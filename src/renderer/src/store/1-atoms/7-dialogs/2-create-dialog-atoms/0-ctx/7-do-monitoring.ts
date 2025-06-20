import { atom } from "jotai";
import { doGetTargetHwndAtom, doGetWindowIconAtom, napiLock, sawHandleAtom } from "@/store/7-napi-atoms";

export const startMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { willStart: true }));
export const stopMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { willStart: false }));

const doMonitoringTimerAtom = atom(
    (get) => null,
    (get, set, { willStart }: { willStart: boolean; }) => {
        const nowMonitoring = get(_nowMonitoringAtom);

        if (nowMonitoring) {
            if (willStart) {
                return;
            }

            timeoutId.clearTimeout();
            set(_nowMonitoringAtom, false);
            set(_monitorCountAtom, -1);
        } else {
            if (!willStart) {
                return;
            }

            timeoutId.clearTimeout();
            set(_nowMonitoringAtom, true);
            set(_monitorCountAtom, 1);

            timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);

            function runTimeout() {
                set(doUpdateHwndAndIconAtom);
                set(_monitorCountAtom, get(_monitorCountAtom) + 1);

                timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);
            }
        }
    }
);

// Seconds counter

export const secondsCounterAtom = atom(
    (get) => Math.ceil(get(_monitorCountAtom) / timesPerSecond)
);

const _nowMonitoringAtom = atom(false);
const _monitorCountAtom = atom(-1); // How many seconds passed since the start of monitoring
const timesPerSecond = 2;

const timeoutId = {
    id: undefined as undefined | ReturnType<typeof setTimeout>,
    clearTimeout() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = undefined;
        }
    }
};

// Update hwnd and icon

export const doUpdateHwndAndIconAtom = atom(
    null,
    async (get, set) => {
        if (!napiLock.isLocked) { // Avoid attempt to get hwnd by timer when napi is locked
            await set(doGetTargetHwndAtom);
            const sawHandle = get(sawHandleAtom);
            set(doGetWindowIconAtom, sawHandle?.hwnd);
        }
    }
);
