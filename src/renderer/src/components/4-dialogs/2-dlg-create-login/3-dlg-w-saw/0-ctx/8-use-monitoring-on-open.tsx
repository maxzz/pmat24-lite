import { useCallback, useEffect } from "react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doGetWindowIconAtom, doMonitoringAtom, sawHandleAtom } from "@/store";
import { hasMain } from "@/xternal-to-main";
import { doSawModeOnClientAtom } from "./1-saw-mode-on-client";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);
    const doSetSawModeOnClient = useSetAtom(doSawModeOnClientAtom);

    const doUpdateHwndAndIcon = useSetAtom(doUpdateHwndAndIconAtom);

    const callback = useCallback(
        () => {
            if (hasMain()) {
                doUpdateHwndAndIcon();
            }

            console.log('Monitoring callback');
        }, []
    );

    useEffect(
        () => {
            if (isOpen) {
                doMonitoring({ doStart: true, callback });
                doSetSawModeOnClient({ turnOn: true, canceledByMain: false });

                return () => {
                    doMonitoring({ doStart: false });
                };
            }
        }, [isOpen]
    );
}

export const doUpdateHwndAndIconAtom = atom(
    null,
    async (get, set) => {
        await set(doGetTargetHwndAtom);

        const sawHandle = get(sawHandleAtom);

        if (sawHandle?.hwnd) {
            set(doGetWindowIconAtom, sawHandle.hwnd);
        }
    }
);
