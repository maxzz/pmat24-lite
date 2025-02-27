import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doGetTargetHwndAtom, doMonitoringAtom, doOpenCreateManiSawAtom } from "@/store";
import { hasMain } from "@/xternal-to-main";
import { sawModeOnClientAtom } from "../0-ctx";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);
    const setSawOpen = useSetAtom(sawModeOnClientAtom);

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
                setSawOpen({ turnOn: true, canceledByMain: false });

                return () => {
                    doMonitoring({ doStart: false });
                };
            }
        }, [isOpen]
    );
}
