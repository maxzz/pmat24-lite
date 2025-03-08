import { useAtomValue } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { MonitorOverlayBody } from "./1-body";
import { useMonitoringOnOpen } from "../0-ctx";

export function MonitorOverlay() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);

    useMonitoringOnOpen();

    return (<>
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 bg-background 1bg-sky-300 z-[100]" {...animationProps}>
                    <BodyExitWoTransition />
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

function BodyExitWoTransition() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    return (<>
        {isOpen && <MonitorOverlayBody />}
    </>);
}

const animationTransition: Transition = {
    // type: "spring", stiffness: 500, damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: .2 } },
};

// const dialogClasses = "\
// p-0 \
// !w-11/12 max-w-5xl \
// h-4/5 min-h-[60vh] max-h-[90vh] \
// rounded-md \
// data-[state=open]:[animation-duration:200ms] \
// ";
