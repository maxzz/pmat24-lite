import { useAtom } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { MonitorOverlayBody } from "./1-body";
import { useMonitoringOnOpen } from "./8-use-monitoring-on-open";

export function MonitorOverlay() {
    const [isOpen, doOpen] = useAtom(doOpenSawOverlayAtom);

    useMonitoringOnOpen();

    return (<>
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-sky-300 z-[100]" {...animationProps} onClick={() => {}}>
                    <MonitorOverlayBody />
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

const animationTransition: Transition = {
    // type: "spring", stiffness: 500, damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.75 },
};
