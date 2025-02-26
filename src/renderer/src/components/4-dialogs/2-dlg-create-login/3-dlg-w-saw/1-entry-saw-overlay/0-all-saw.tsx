import { useCallback, useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { doOpenSawOverlayAtom, isOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doMonitoringAtom } from "@/store";
import { MonitorOverlayBody } from "./1-body";

export function MonitorOverlay() {

    const isOpen = useAtomValue(isOpenSawOverlayAtom);
    const doOpen = useSetAtom(doOpenSawOverlayAtom);

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

    return (<>
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-sky-300 z-[100]" {...animationProps} onClick={() => doOpen(false)}>
                    <MonitorOverlayBody />
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

const animationTransition: Transition = {
    // type: "spring",
    // stiffness: 500,
    // damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.75 },
};

function useMonitoringOnOpen() {
    const isOpen = useAtomValue(isOpenSawOverlayAtom);
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
