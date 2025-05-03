import { useEffect } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { createManualManiAtom, isOpen_SawMonitorAtom, useMonitoringOnOpen } from "@/store/1-atoms/7-dialogs";
import { clearIconsCache } from "@/store/7-napi-atoms";
import { SawMonitorDlgBody } from "./1-body";

export function DialogSawMonitor() {

    const isOpen = useAtomValue(isOpen_SawMonitorAtom);
    useMonitoringOnOpen();

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div initial={false} className="fixed inset-0 bg-background 1bg-sky-300 z-[100]" {...animationProps}>
                    <BodyExitWoTransition />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function BodyExitWoTransition() {

    const isOpen = useAtomValue(isOpen_SawMonitorAtom);
    const createManualMani = useSetAtom(createManualManiAtom);

    useEffect(() => {
        // initialize
        if (isOpen) {
            createManualMani(false);
        }

        // deinitialize. clear icons cache on close and reset manual checkbox
        return () => {
            !isOpen && clearIconsCache();
        };
    }, [isOpen]);

    return (<>
        {isOpen && <SawMonitorDlgBody />}
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
