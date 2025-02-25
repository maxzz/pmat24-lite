import { useAtomValue, useSetAtom } from "jotai";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { doOpenSawOverlayAtom, isOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { doMonitoringAtom, monitorCounterAtom } from "@/store";
import { useCallback, useEffect } from "react";

export function MonitorOverlay() {

    const isOpen = useAtomValue(isOpenSawOverlayAtom);
    const doOpen = useSetAtom(doOpenSawOverlayAtom);

    const doMonitoring = useSetAtom(doMonitoringAtom);

    const monitorCounter = useAtomValue(monitorCounterAtom);

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
                <motion.div
                    className="fixed inset-0 bg-sky-300 z-[100]"
                    {...animationProps}
                    onClick={() => doOpen(false)}
                >
                    <div className="h-full text-sm grid grid-cols-3 place-content-center">
                        <div className="col-start-2 grid gap-y-4 text-center">
                            <div className="text-balance">
                                Launch the program or browse to the Web site that
                                contains the login screen for which you want to create a managed logon.
                            </div>

                            <div className="">
                                Login screen detected: 123
                            </div>

                            <div className="">{monitorCounter}</div>

                        </div>

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
    initial: { opacity: 0, scale: 0.75 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.75 },
};
