import { useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, type AnimationProps, motion, type Transition } from "motion/react";
import { doOpenSawOverlayAtom, isOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";

export function MonitorOverlay() {
    const isOpen = useAtomValue(isOpenSawOverlayAtom);
    const doOpen = useSetAtom(doOpenSawOverlayAtom);
    return (<>
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-sky-500/20 backdrop-blur-sm"
                    {...animationProps}
                    onClick={() => doOpen(false)}
                >
                    <div className="h-full grid place-content-center">
                        123
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </>);
}

const dialogClasses = "\
p-0 \
!w-11/12 max-w-5xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:[animation-duration:200ms] \
";

const animationTransition: Transition = {
    // type: "spring",
    // stiffness: 500,
    // damping: 50,
    duration: 0.2,
};

const animationProps: AnimationProps = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
};
