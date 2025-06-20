import { useCallback } from "react";
import { type Getter, type Setter, useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { type MotionNodeOptions, type Transition, AnimatePresence, motion } from "motion/react";
import { napiBuildState, useSawHandleListener } from "@/store/7-napi-atoms";
import { checkboxCreateManualModeAtom, doMoveToSecondDlgAtom, isOpen_SawMonitorAtom } from "@/store/1-atoms/7-dialogs";
import { CurrentApp } from "./1-current-app";
import { RuntimeCounter } from "./2-runtime-counter";
import { DebugFrame } from "./8-debug-frame";
import { GetTargetWindowResult } from "@shared/ipc-types";

export function DialogSawMonitor() {
    const isOpen = useAtomValue(isOpen_SawMonitorAtom);
    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div initial={false} className="fixed inset-0 bg-background 1bg-sky-300 z-[100]" {...animationProps}>
                    {isOpen && (
                        <SawMonitorDlgBody />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function SawMonitorDlgBody() {
    const [checkboxCreateManualMode, setCheckboxCreateManualMode] = useAtom(checkboxCreateManualModeAtom);
    useDissmissNextToasts();
    useSawHandleMonitor();
    return (
        <div className="mx-auto h-full text-xs grid place-items-center">
            <DebugFrame>
                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="1text-center 1text-balance select-none">
                        Launch the program or browse to the Web site that
                        contains the login screen for which you want to create a managed logon.
                    </div>

                    <CurrentApp />

                    <Label className="place-self-start text-xs flex items-center gap-2 select-none cursor-pointer">
                        <Checkbox className="size-4" checked={checkboxCreateManualMode} onCheckedChange={(v) => setCheckboxCreateManualMode(!!v)} />
                        Set up a managed logon manually
                    </Label>

                    <ButtonContinue />
                </div>

                {/* <CornerSelector className="absolute left-1.5 bottom-4" /> */}
                <RuntimeCounter className="absolute right-2 bottom-1 text-right opacity-25" />
            </DebugFrame>
        </div>
    );
}

//TODO: move out of this file
function useSawHandleMonitor() {
    useSawHandleListener(
        useCallback(
            (get: Getter, set: Setter, newVal: GetTargetWindowResult | null, prevVal: GetTargetWindowResult | null) => {
                if (newVal?.hwnd !== prevVal?.hwnd) {
                    console.log('useSawHandleListener', newVal);
                }
            }, []
        )
    );
}

function ButtonContinue() {
    const isRunning = useSnapshot(napiBuildState).buildRunning;
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button className="place-self-center active:scale-[.97]" variant="default" size="xs" disabled={isRunning} onClick={() => doMoveToSecondDlg({ cancel: false })}>
            Continue
        </Button>
    );
}

const animationTransition: Transition = {
    // type: "spring", stiffness: 500, damping: 50,
    duration: 0.2,
};

const animationProps: MotionNodeOptions = {
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
