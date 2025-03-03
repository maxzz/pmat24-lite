import { type ComponentPropsWithoutRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { AnimatePresence, motion } from "motion/react";
import { classNames, useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, ImageHolder, Label } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom, monitorCounterAtom, sawHandleAtom, sawHandleCaptionAtom, sawIconAtom } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "../0-ctx";
import { doMoveToSecondDlgAtom } from "../0-ctx/2-move-to-second-dlg";
import { DebugButtonsForSaw } from "../../8-test-buttons";
import { hasMain } from "@/xternal-to-main";

export function MonitorOverlayBody() {
    useDissmissNextToasts();
    return (
        <div className="mx-auto w-[320px] h-full text-xs grid place-items-center">
            <DebugBorder>
                <MonitorCounter className="absolute right-2 bottom-1 text-right opacity-25" />

                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="1text-center 1text-balance select-none">
                        Launch the program or browse to the Web site that
                        contains the login screen for which you want to create a managed logon.
                    </div>

                    <CurrentApp />

                    <Label className="place-self-start text-xs flex items-center gap-2 select-none">
                        <Checkbox className="size-4" />
                        Set up a managed logon manually
                    </Label>

                    {/* <div className="">To continue click the button below.</div> */}

                    <ButtonContinue />
                </div>
            </DebugBorder>
        </div>
    );
}

function ButtonContinue({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button
            className="place-self-center" variant="default" size="xs"
            onClick={() => doMoveToSecondDlg({ cancel: false, hwnd: '' })}
        >
            Continue
        </Button>
    );
}

function CurrentApp({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("px-4 py-2 w-full border-border/30 border shadow rounded-md grid place-items-center gap-2", className)} {...rest}>
            {/* <div className=""> Login screen detected: </div> */}
            <div className="select-none">
                Active application:
            </div>

            <div className="size-8 grid place-items-center  select-none">
                <ImageHolder className="size-full" imageAtom={sawIconAtom} />
                {/* TODO: when tere is no icon, show a placeholder: Select application */}
            </div>

            <CurrentAppCaption />
        </div>
    );
}

function CurrentAppCaption({ className, ...rest }: ComponentPropsWithoutRef<typeof motion.div>) {
    const caption = useAtomValue(sawHandleCaptionAtom);
    console.log('CurrentAppCaption', caption);

    return (
        <div className="relative overflow-clip">
            <AnimatePresence mode="wait">
                <motion.div
                    className={classNames("w-full min-h-8 text-center line-clamp-2", className)}

                    key={caption}
                    // layoutDependency={caption}

                    initial={{ opacity: 0, y: -5, }}
                    animate={{ opacity: 1, y: 0, }}
                    exit={{ opacity: 0, y: 0, transition: { duration: 0 } }}
                    // transition={{ duration: 2 }}


                    // layoutId={caption}
                    // initial={{ opacity: 1, x: 100, }}
                    // animate={{ opacity: 1, x: 0, }}
                    // exit={{ opacity: 1, x: -100, }}
                    // transition: { delay: .2, duration: .2 }
                    title={caption} {...rest}
                >
                    <motion.div
                    // layoutDependency={caption}

                    // key={caption}
                    // initial={{ opacity: 0, x: -100, }}
                    // animate={{ opacity: 1, x: 0, }}
                    // exit={{ opacity: 0, x: 100, }}
                    // transition={{ duration: 2 }}

                    // layout="position"
                    >

                        {caption}
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

//TODO: app name text popup on update and multiline truncation

function DebugBorder({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    if (hasMain()) {
        return (<div className={classNames("relative bg-sky-400/20", className)} {...rest}>{children}</div>);
    }
    return (<>
        <div className={classNames("relative bg-sky-400/20 border-border/30 border shadow rounded-md", className)} {...rest}>

            <div className="absolute left-0 -top-16 py-0.5 w-full text-right border-border/75 border rounded-md shadow opacity-50">
                <DebugButtonsForSaw className="scale-[.74] origin-left" />
            </div>

            <div className="relative px-3 py-3 w-full text-sm border-border/30 border-b flex items-center justify-center select-none">
                Select application

                <Button
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                    onClick={() => doMoveToSecondDlg({ cancel: true, hwnd: '' })}
                >
                    <Cross2Icon className="size-4" />
                </Button>
            </div>

            {children}
        </div>
    </>);
}

function MonitorCounter({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const monitorCounter = useAtomValue(monitorCounterAtom);
    return (
        <div className={classNames(className)} {...rest}>
            {monitorCounter}s
        </div>
    );
}

const dialogClasses = "\
p-0 \
!w-11/12 max-w-5xl \
h-4/5 min-h-[60vh] max-h-[90vh] \
rounded-md \
data-[state=open]:[animation-duration:200ms] \
";
