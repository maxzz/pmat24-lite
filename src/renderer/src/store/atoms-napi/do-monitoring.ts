import { atom } from "jotai";

export const monitoringCounterAtom = atom(-1);

const _isMonitoringAtom = atom(false);

let monitorTimerId: ReturnType<typeof setTimeout> | undefined;

export const doMonitoringAtom = atom(
    (get) => get(_isMonitoringAtom),
    (get, set, {doStart, callback}: {doStart: boolean, callback?: Function}) => {
        const isMonitoring = get(_isMonitoringAtom);

        if (isMonitoring) {
            if (!doStart) {
                set(_isMonitoringAtom, false);
                set(monitoringCounterAtom, -1);

                if (monitorTimerId) {
                    clearTimeout(monitorTimerId);
                    monitorTimerId = undefined;
                }
            }
        } else {
            if (doStart) {
                set(_isMonitoringAtom, true);

                if (monitorTimerId) {
                    clearTimeout(monitorTimerId);
                    monitorTimerId = undefined;
                }

                function runTimeout() {
                    callback?.();

                    set(monitoringCounterAtom, get(monitoringCounterAtom) + 1);
                    monitorTimerId = setTimeout(runTimeout, 1000);
                }

                set(monitoringCounterAtom, 1);
                monitorTimerId = setTimeout(runTimeout, 1000);
            }
        }
    }
);
