import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doMonitoringAtom } from "@/store";
import { hasMain } from "@/xternal-to-main";
import { doTurnOffSawModeOnClientAtom } from "../0-ctx";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);
    const doTurnOffSawModeOnClient = useSetAtom(doTurnOffSawModeOnClientAtom);

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
                doTurnOffSawModeOnClient();

                return () => {
                    doMonitoring({ doStart: false });
                };
            }
        }, [isOpen]
    );
}
