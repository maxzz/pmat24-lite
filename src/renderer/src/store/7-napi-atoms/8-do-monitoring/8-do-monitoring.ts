import { useCallback, useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";

export const isMonitoringAtom = atom(
    (get) => get(_isMonitoringAtom)
);

export const doMonitoringAtom = atom(
    null,
    (get, set, { doStart, callback }: { doStart: boolean, callback?: Function; }) => {
        const isMonitoring = get(_isMonitoringAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringAtom, false);
                set(monitorCounterAtom, -1);
                timeoutId.clear();
            }
        } else {
            if (doStart) {
                set(_isMonitoringAtom, true);
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

const _isMonitoringAtom = atom(false);

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
export function useMonitoring(callback?: () => void) {
    const isMonitoring = useAtomValue(isMonitoringAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);

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
