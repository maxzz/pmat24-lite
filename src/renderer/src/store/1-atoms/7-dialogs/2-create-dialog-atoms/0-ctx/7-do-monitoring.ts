import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { isOpen_SawMonitorAtom } from "../1-open-saw-monitor";
import { setSawMonitorSizeSmallAtom } from "./8-saw-monitor-size";
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
            set(_monitorCounterAtom, -1);

        } else {
            if (!willStart) {
                return;
            }

            timeoutId.clearTimeout();
            set(_nowMonitoringAtom, true);
            set(_monitorCounterAtom, 1);

            timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);

            function runTimeout() {
                set(doUpdateHwndAndIconAtom);
                set(_monitorCounterAtom, get(_monitorCounterAtom) + 1);
                timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);
            }
        }
    }
);

const _nowMonitoringAtom = atom(false);

const timeoutId = {
    id: undefined as undefined | ReturnType<typeof setTimeout>,
    clearTimeout() {
        if (this.id) {
            clearTimeout(this.id);
            this.id = undefined;
        }
    }
};

const _monitorCounterAtom = atom(-1); // How many seconds passed since the start of monitoring

const timesPerSecond = 2;

export const secondsCounterAtom = atom(
    (get) => Math.ceil(get(_monitorCounterAtom) / timesPerSecond)
);

//

export function useMonitoringOnOpen() {
    const isMonitorDlgOpen = useAtomValue(isOpen_SawMonitorAtom);

    const startMonitorTimer = useSetAtom(startMonitorTimerAtom);
    const stopMonitorTimer = useSetAtom(stopMonitorTimerAtom);
    const setSawMonitorSizeSmall = useSetAtom(setSawMonitorSizeSmallAtom);

    useEffect(
        () => {
            if (isMonitorDlgOpen) {
                startMonitorTimer();
                setSawMonitorSizeSmall();

                return () => {
                    stopMonitorTimer();
                };
            }
        }, [isMonitorDlgOpen]
    );
}

//

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
