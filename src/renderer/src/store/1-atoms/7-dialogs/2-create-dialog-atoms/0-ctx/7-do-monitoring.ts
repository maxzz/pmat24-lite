import { useCallback, useEffect } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { isOpen_SawMonitorAtom } from "../1-open-saw-monitor";
import { setSawMonitorSizeSmallAtom } from "./8-saw-monitor-size";
import { doGetTargetHwndAtom, doGetWindowIconAtom, napiLock, sawHandleAtom } from "@/store/7-napi-atoms";

export const startMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { doStart: true }));
export const stopMonitorTimerAtom = atom(null, async (get, set) => set(doMonitoringTimerAtom, { doStart: false }));

export const doMonitoringTimerAtom = atom(
    (get) => get(_isMonitoringTimerAtom),
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringTimerAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringTimerAtom, false);
                set(_monitorCounterAtom, -1);
                timeoutId.clear();
            }
        } else {
            if (doStart) {
                set(_isMonitoringTimerAtom, true);
                timeoutId.clear();

                set(_monitorCounterAtom, 1);
                timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);

                function runTimeout() {
                    callback?.();
                    set(_monitorCounterAtom, get(_monitorCounterAtom) + 1);
                    timeoutId.id = setTimeout(runTimeout, 1000 / timesPerSecond);
                }
            }
        }
    }
);

const _isMonitoringTimerAtom = atom(false);

const timeoutId = {
    id: undefined as undefined | ReturnType<typeof setTimeout>,
    clear() {
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

    const doMonitoringTimer = useSetAtom(doMonitoringTimerAtom);
    const doTurnOnSawModeOnClient = useSetAtom(setSawMonitorSizeSmallAtom);
    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom);

    useEffect(
        () => {
            if (isMonitorDlgOpen) {
                doMonitoringTimer({ doStart: true, callback: doUpdateHwndAndIcon });
                doTurnOnSawModeOnClient();

                return () => {
                    doMonitoringTimer({ doStart: false });
                };
            }
        }, [isMonitorDlgOpen]
    );
}

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

/**
 * Combines monitoring atom and clearing timeout on unmount
 */
function useMonitoringTimer(callback?: () => void) {
    const [isMonitoring, doMonitoring] = useAtom(doMonitoringTimerAtom);

    useEffect(
        () => {
            if (isMonitoring) {
                return () => {
                    timeoutId.clear();
                };
            }
        }, [isMonitoring]
    );

    const toggleStartStop = useCallback(
        async function sendRequest() {
            doMonitoring({ doStart: !isMonitoring, callback });
        }, [isMonitoring, callback]
    );

    return [isMonitoring, toggleStartStop] as const;
}

