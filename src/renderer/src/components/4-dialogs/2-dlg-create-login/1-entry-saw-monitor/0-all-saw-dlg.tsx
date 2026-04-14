import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { type MotionNodeOptions, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { stateNapiAccess, useSawRectMonitor } from "@/store/7-napi-atoms";
import { checkboxCreateManualModeAtom, doCancelMoveToSecondDlgAtom, doMoveToSecondDlgAtom, sawMonitor_doFinishCloseAtom, sawMonitor_doFinishOpenAtom, sawMonitor_isBodyVisibleAtom, sawMonitor_isCoverAtom, sawMonitor_isOpenAtom } from "@/store/4-dialogs-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { CurrentApp } from "./1-current-app";
import { RuntimeCounter } from "./2-runtime-counter";
import { DebugFrame } from "./8-debug-frame";

export function DialogSawMonitor() {
    const finishOpen = useSetAtom(sawMonitor_doFinishOpenAtom);
    const finishClose = useSetAtom(sawMonitor_doFinishCloseAtom);

    const isOpen = useAtomValue(sawMonitor_isOpenAtom);
    const isCover = useAtomValue(sawMonitor_isCoverAtom);
    const isBodyVisible = useAtomValue(sawMonitor_isBodyVisibleAtom);

    const prefersReducedMotion = useReducedMotion() ?? false;
    
    const animationProps = getAnimationProps(prefersReducedMotion);
    const bodyAnimationProps = getBodyAnimationProps(prefersReducedMotion);

    const isVisible = isOpen || isCover;
    const showBody = isOpen && isBodyVisible;

    const handleAnimationComplete = () => {
        if (isOpen) {
            finishOpen();
        }
    };

    return (
        <AnimatePresence initial={false} onExitComplete={finishClose}>
            {isVisible && (
                <motion.div className="fixed inset-0 bg-background 1bg-sky-300 z-100" {...animationProps} onAnimationComplete={handleAnimationComplete}>
                    {showBody && (
                        <motion.div className="h-full" {...bodyAnimationProps}>
                            <SawBody />
                        </motion.div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function SawBody() {
    const [checkboxCreateManualMode, setCheckboxCreateManualMode] = useAtom(checkboxCreateManualModeAtom);
    const isCpassMode = !!newManiContent.maniForCpassAtom;
    
    const doCancelMoveToSecondDlg = useSetAtom(doCancelMoveToSecondDlgAtom);

    useDissmissNextToasts();
    useSawRectMonitor();

    useEffect(
        () => {
            function onKeyDown(e: KeyboardEvent) {
                if (e.key === "Escape" && !e.repeat) {
                    e.preventDefault();
                    doCancelMoveToSecondDlg();
                }
            }

            const controller = new AbortController();
            window.addEventListener("keydown", onKeyDown, { signal: controller.signal });
            return () => controller.abort();
        },
        [doCancelMoveToSecondDlg]);

    return (
        <div className="mx-auto h-full text-xs grid place-items-center">
            <DebugFrame>
                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="1text-center 1text-balance select-none">
                        {isCpassMode
                            ? "Launch the program or browse to the Web site that contains the change password screen you want to set up."
                            : "Launch the program or browse to the Web site that contains the login screen for which you want to create a managed logon."
                        }
                    </div>

                    <CurrentApp />

                    <Label className="place-self-start text-xs flex items-center gap-2 select-none cursor-pointer">
                        <Checkbox className="size-4" checked={checkboxCreateManualMode} onCheckedChange={(v) => setCheckboxCreateManualMode(!!v)} />
                        {isCpassMode
                            ? "Set up a change password screen manually"
                            : "Set up a managed logon manually"
                        }
                    </Label>

                    <ButtonContinue />
                </div>

                <RuntimeCounter className="absolute right-2 bottom-1 text-right opacity-25" />
            </DebugFrame>
        </div>
    );
}

function ButtonContinue() {
    const isRunning = useSnapshot(stateNapiAccess).buildRunning;
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button className="place-self-center active:scale-[.97]" variant="default" size="xs" disabled={isRunning} onClick={doMoveToSecondDlg}>
            Continue
        </Button>
    );
}

function getAnimationProps(reducedMotion: boolean): MotionNodeOptions {
    const duration = reducedMotion ? 0.01 : 0.2;
    return {
        initial: { opacity: 0, scale: 0.15 },
        animate: { opacity: 1, scale: 1, transition: { duration } },
        exit: { opacity: 0, scale: 0.15, transition: { duration } },
    };
}

function getBodyAnimationProps(reducedMotion: boolean): MotionNodeOptions {
    const duration = reducedMotion ? 0.01 : 0.18;
    return {
        initial: { opacity: 0, scale: 0.96 },
        animate: { opacity: 1, scale: 1, transition: { duration } },
    };
}

// const dialogClasses = "\
// p-0 \
// w-11/12! max-w-5xl \
// h-4/5 min-h-[60vh] max-h-[90vh] \
// rounded-md \
// data-[state=open]:duration-ani-200 \
// ";
