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
                <motion.div
                    className="fixed inset-0 bg-sky-300 z-[100]"
                    {...animationProps}
                >
                    <BodyExitWoTransition />
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
    exit: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: .2 } },
};

function BodyExitWoTransition() {
    const isOpen = useAtomValue(doOpenSawOverlayAtom);
    return (<>
        {isOpen && <MonitorOverlayBody />}
    </>);
}
