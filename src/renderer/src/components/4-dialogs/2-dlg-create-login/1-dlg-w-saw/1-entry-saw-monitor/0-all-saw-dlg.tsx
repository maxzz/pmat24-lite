import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { type AnimationProps, type Transition, AnimatePresence, motion } from "motion/react";
import { napiBuildState } from "@/store/7-napi-atoms";
import { checkboxCreateManualModeAtom, doMoveToSecondDlgAtom, isOpen_SawMonitorAtom } from "@/store/1-atoms/7-dialogs";
import { CurrentApp } from "./1-current-app";
import { RuntimeCounter } from "./2-runtime-counter";
import { DebugFrame } from "./8-debug-frame";

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
    return (
        <div className="mx-auto h-full text-xs grid place-items-center">
            <DebugFrame>
                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="1text-center 1text-balance select-none">
                        Launch the program or browse to the Web site that
                        contains the login screen for which you want to create a managed logon.
                    </div>

                    <CurrentApp />

                    <Label className="place-self-start text-xs flex items-center gap-2 select-none">
                        <Checkbox className="size-4" checked={checkboxCreateManualMode} onCheckedChange={(v) => setCheckboxCreateManualMode(!!v)} />
                        Set up a managed logon manually
                    </Label>

                    <ButtonContinue />
                </div>

                <CornerSelector className="absolute left-2 bottom-1" />
                <RuntimeCounter className="absolute right-2 bottom-1 text-right opacity-25" />
            </DebugFrame>
        </div>
    );
}

function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-[auto,0px,auto] grid-rows-[auto,0px,auto] 1gap-1 text-xs", className)}>
            {/* <div className={classNames("grid grid-cols-3 grid-rows-3 1gap-1 text-xs", className)}> */}
            <div className="size-4 border border-border col-start-1 row-start-1 grid place-items-center">1</div>
            <div className="size-4 border border-border col-start-3 row-start-1 grid place-items-center">2</div>
            <div className="absolute -left-2 -top-2 bg-purple-500 size-4 border border-border col-start-2 row-start-2 grid place-items-center">3</div>
            <div className="bg-slate-500 size-4 border border-border col-start-1 row-start-3 grid place-items-center">4</div>
            <div className="size-4 border border-border col-start-3 row-start-3 grid place-items-center">5</div>
        </div>
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
