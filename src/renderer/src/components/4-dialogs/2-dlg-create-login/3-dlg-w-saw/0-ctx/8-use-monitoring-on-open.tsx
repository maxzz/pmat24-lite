import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doGetWindowIconAtom, doMonitoringTimerAtom, napiLock, sawHandleAtom } from "@/store";
import { doSawModeOnClientAtom } from "./8-saw-mode-on-client";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoringTimer = useSetAtom(doMonitoringTimerAtom);
    const doSetSawModeOnClient = useSetAtom(doSawModeOnClientAtom);

    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom);

    useEffect(
        () => {
            if (isOpen) {
                doMonitoringTimer({ doStart: true, callback: doUpdateHwndAndIcon });
                doSetSawModeOnClient({ turnOn: true, canceledByMain: false });

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
        console.log('doUpdateHwndAndIconAtom monitoring');
        
        if (!napiLock.isLocked) { // Avoid attempt to get hwnd by timer when napi is locked
            await set(doGetTargetHwndAtom);
            const sawHandle = get(sawHandleAtom);
            set(doGetWindowIconAtom, sawHandle?.hwnd);
        }
    }
);
