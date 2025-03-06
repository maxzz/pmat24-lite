import { useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doGetWindowIconAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { doSawModeOnClientAtom } from "./8-saw-mode-on-client";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);
    const doSetSawModeOnClient = useSetAtom(doSawModeOnClientAtom);

    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom);
    // const callback = useCallback(() => { doUpdateHwndAndIcon(); console.log('Monitoring callback'); }, []);

    useEffect(
        () => {
            if (isOpen) {
                doMonitoring({ doStart: true, callback: doUpdateHwndAndIcon });
                doSetSawModeOnClient({ turnOn: true, canceledByMain: false });

                return () => {
                    doMonitoring({ doStart: false });
                };
            }
        }, [isOpen]
    );
}

const doUpdateHwndAndIconAtom = atom(
    null,
    async (get, set) => {
        await set(doGetTargetHwndAtom);
        const sawHandle = get(sawHandleAtom);
        set(doGetWindowIconAtom, sawHandle?.hwnd);
    }
);
