import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { isOpen_SawMonitorAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doGetWindowIconAtom, doMonitoringTimerAtom, napiLock, sawHandleAtom } from "@/store";
import { setSawMonitorSizeSmallAtom } from "./8-saw-monitor-size";

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
