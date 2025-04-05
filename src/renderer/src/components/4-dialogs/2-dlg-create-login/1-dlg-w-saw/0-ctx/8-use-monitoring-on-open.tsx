import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayForLoginAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doGetWindowIconAtom, doMonitoringTimerAtom, napiLock, sawHandleAtom } from "@/store";
import { doTurnOnSawModeOnClientAtom } from "./8-saw-mode-on-client";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayForLoginAtom);

    const doMonitoringTimer = useSetAtom(doMonitoringTimerAtom);
    const doTurnOnSawModeOnClient = useSetAtom(doTurnOnSawModeOnClientAtom);
    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom);

    useEffect(
        () => {
            if (isOpen) {
                doMonitoringTimer({ doStart: true, callback: doUpdateHwndAndIcon });
                doTurnOnSawModeOnClient();

                return () => {
                    doMonitoringTimer({ doStart: false });
                };
            }
        }, [isOpen]
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
