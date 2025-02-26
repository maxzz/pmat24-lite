import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doMonitoringAtom } from "@/store";

export function useMonitoringOnOpen() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    const doMonitoring = useSetAtom(doMonitoringAtom);

    const callback = useCallback(
        () => {
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
