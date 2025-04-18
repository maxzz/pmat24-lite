import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { clearIconsCache } from "@/store";
import { doOpenSawOverlayForLoginAtom } from "@/store/1-atoms/7-dialogs";
import { createManualManiAtom, useMonitoringOnOpen } from "../0-ctx";
import { MonitorOverlayBody } from "./1-body";

export function MonitorOverlay() {
    const isOpen = useAtomValue(doOpenSawOverlayForLoginAtom);

    useMonitoringOnOpen();

    return (<>
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div initial={false} className="fixed inset-0 bg-background 1bg-sky-300 z-[100]" {...animationProps}>
                    <BodyExitWoTransition />
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

function BodyExitWoTransition() {

    const isOpen = useAtomValue(doOpenSawOverlayForLoginAtom);
    const createManualMani = useSetAtom(createManualManiAtom);

    useEffect(() => {
        // initialize
        if (isOpen) {
            createManualMani(false);
        }

        // deinitialize
        return () => {
            !isOpen && clearIconsCache();
        };
    }, [isOpen]); // clear icons cache on close and reset manual checkbox

    return (<>
        {isOpen && <MonitorOverlayBody />}
    </>);
}

const animationTransition: Transition = {
    // type: "spring", stiffness: 500, damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    // initial: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: 2.2 }  },
    animate: { opacity: 1, scale: 1 },
    // exit: { opacity: 0, scale: 0.75, transition: { delay: .2, duration: .2 } },
    exit: { opacity: 0, scale: 0.75, transition: { duration: 0 } }, //TODO: do we need 'exit' animation and AnimatePresence here?
};

// const dialogClasses = "\
// p-0 \
// !w-11/12 max-w-5xl \
// h-4/5 min-h-[60vh] max-h-[90vh] \
// rounded-md \
// data-[state=open]:[animation-duration:200ms] \
// ";
