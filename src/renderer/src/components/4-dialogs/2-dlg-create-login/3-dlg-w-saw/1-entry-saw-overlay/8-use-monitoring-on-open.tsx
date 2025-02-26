import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { hasMain, sendToMain } from "@/xternal-to-main";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);

    const doGetTargetHwnd = useSetAtom(doGetTargetHwndAtom);

    const callback = useCallback(
        () => {
            if (hasMain()) {
                doGetTargetHwnd();
            }

            console.log('Monitoring callback');
        }, []
    );

    useEffect(
        () => {
            if (isOpen) {
                doMonitoring({ doStart: true, callback });
                return () => doMonitoring({ doStart: false });
            }
        }, [isOpen]
    );
}
