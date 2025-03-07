import { useCallback, useEffect } from "react";
import { atom, useAtom } from "jotai";

export const doMonitoringTimerAtom = atom(
    (get) => get(_isMonitoringTimerAtom),
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringTimerAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringTimerAtom, false);
                set(monitorCounterAtom, -1);
                timeoutId.clear();
            }
        } else {
            if (doStart) {
                set(_isMonitoringTimerAtom, true);
                timeoutId.clear();

                function runTimeout() {
                    callback?.();
                    set(monitorCounterAtom, get(monitorCounterAtom) + 1);
                    timeoutId.id = setTimeout(runTimeout, 1000);
                }

                set(monitorCounterAtom, 1);
                timeoutId.id = setTimeout(runTimeout, 1000);
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

export const monitorCounterAtom = atom(-1); // How many seconds passed since the start of monitoring

/**
 * Combines monitoring atom and clearing timeout on unmount
 */
export function useMonitoringTimer(callback?: () => void) {
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
