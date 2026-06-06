import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { type MotionNodeOptions, AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { stateNapiAccess, useSawRectMonitor } from "@/store/7-napi-atoms";
import { doOnButtonCancelAtom } from "../a-create-dialog-atoms/1-2-do-on-button-cancel";
import { doOnButtonContinueAtom } from "../a-create-dialog-atoms/1-1-do-on-button-continue";
import { sawMonitor_onFinishAnimation_AllCloseAtom, sawMonitor_onFinishAnimation_CoverOpenAtom, sawMonitor_isOpenBodyAtom, sawMonitor_isOpenCoverAtom, sawMonitor_isSawOpenAtom } from "../a-create-dialog-atoms/7-0-open-anim-saw-monitor";
import { checkboxCreateManualModeAtom } from "../a-create-dialog-atoms/7-3-ui-atoms";
import { newManiContent } from "@/store/0-serve-atoms/0-create/1-create-new-mani-ctx";
import { CurrentApp } from "./1-current-app";
import { RuntimeCounter } from "./2-runtime-counter";
import { DebugFrame } from "./8-debug-frame";

export function DialogSawMonitor() {
    const onFinishAnimation_AllClose = useSetAtom(sawMonitor_onFinishAnimation_AllCloseAtom);
    const onFinishAnimation_CoverOpen = useSetAtom(sawMonitor_onFinishAnimation_CoverOpenAtom);

    const isOpenDlg = useAtomValue(sawMonitor_isSawOpenAtom);
    const isOpenCover = useAtomValue(sawMonitor_isOpenCoverAtom);
    const isOpenBody = useAtomValue(sawMonitor_isOpenBodyAtom);

    const prefersReducedMotion = useReducedMotion() ?? false;
    
    const coverAnimationProps = getCoverAnimationProps(prefersReducedMotion);
    const bodyAnimationProps = getBodyAnimationProps(prefersReducedMotion);

    const isVisible = isOpenDlg || isOpenCover;
    const showBody = isOpenDlg && isOpenBody;

    const handleCoverAnimationComplete = () => {
        if (isOpenDlg) {
            onFinishAnimation_CoverOpen();
        }
    };

    return (
        <AnimatePresence initial={false} onExitComplete={onFinishAnimation_AllClose}>
            {isVisible && (
                <motion.div className="fixed inset-0 bg-background 1bg-sky-300 z-100" {...coverAnimationProps} onAnimationComplete={handleCoverAnimationComplete}>
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
    const mode = isCpassMode ? "cpass" : "login";
    
    const doOnButtonCancel = useSetAtom(doOnButtonCancelAtom);

    useDissmissNextToasts();
    useSawRectMonitor();

    useEffect(
        () => {
            function onKeyDown(e: KeyboardEvent) { //TODO: handle button Enter as well if "continue" button is enabled
                if (e.key === "Escape" && !e.repeat) {
                    e.preventDefault();
                    doOnButtonCancel();
                }
            }

            const controller = new AbortController();
            window.addEventListener("keydown", onKeyDown, { signal: controller.signal });
            return () => controller.abort();
        },
        [doOnButtonCancel]);

    return (
        <div className="mx-auto h-full text-xs grid place-items-center">
            <DebugFrame>
                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center select-none">
                    <div>
                        {uiStrings.description[mode]}
                    </div>

                    <CurrentApp />

                    <Label className="place-self-start text-xs flex items-center gap-2 cursor-pointer">
                        <Checkbox className="size-4" checked={checkboxCreateManualMode} onCheckedChange={(v) => setCheckboxCreateManualMode(!!v)} />
                        {uiStrings.manualLabel[mode]}
                    </Label>

                    <ButtonContinue />
                </div>

                <RuntimeCounter className="absolute right-2 bottom-1 text-right opacity-25" />
            </DebugFrame>
        </div>
    );
}

const uiStrings = {
    description: {
        cpass: "Launch the program or browse to the Web site that contains the change password screen you want to set up.",
        login: "Launch the program or browse to the Web site that contains the login screen for which you want to create a managed logon.",
    },
    manualLabel: {
        cpass: "Set up a change password screen manually",
        login: "Set up a managed logon manually",
    },
};

function ButtonContinue() {
    const buildRunning = useSnapshot(stateNapiAccess).buildRunning;
    const doOnButtonContinue = useSetAtom(doOnButtonContinueAtom);
    return (
        <Button className="place-self-center active:scale-[.97]" variant="default" size="xs" disabled={buildRunning} onClick={doOnButtonContinue}>
            Continue
        </Button>
    );
}

function getCoverAnimationProps(reducedMotion: boolean): MotionNodeOptions {
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
