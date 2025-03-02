import { type ComponentPropsWithoutRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, ImageHolder, Label } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom, monitorCounterAtom, sawHandleAtom, sawIconAtom } from "@/store";
import { doTurnOffSawModeOnClientAtom } from "../0-ctx";
import { doMoveToSecondDlgAtom } from "../0-ctx/2-move-to-second-dlg";
import { DebugButtonsForSaw } from "../../8-test-buttons";
import { hasMain } from "@/xternal-to-main";

export function MonitorOverlayBody() {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    useDissmissNextToasts();
    return (
        <div className="mx-auto w-4/5 max-w-72 h-full text-xs grid place-items-center">
            <DebugBorder>
                <MonitorCounter className="absolute right-2 bottom-1 text-right opacity-25" />

                <div className="relative px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="text-center text-balance">
                        Launch the program or browse to the Web site that
                        contains the login screen for which you want to create a managed logon.
                    </div>

                    <CurrentApp />

                    <Label className="place-self-center text-xs flex items-center gap-2">
                        <Checkbox className="size-4" />
                        Set up a managed logon manually
                    </Label>

                    {/* <div className="">To continue click the button below.</div> */}

                    <Button className="place-self-center" variant="default" size="xs"
                        onClick={() => doMoveToSecondDlg({ cancel: false, hwnd: '' })}
                    >
                        Continue
                    </Button>
                </div>
            </DebugBorder>
        </div>
    );
}
//TODO: icon update
//TODO: app name text popup on update and multiline truncation
function DebugBorder({ className, children, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    if (hasMain()) {
        return (<div className="relative">{children}</div>);
    }
    return (<>
        <div className={classNames("relative w-[430px] h-[510px] border-border border rounded-md", className)} {...rest}>
            <div className="absolute left-0 -top-16 py-0.5 w-full text-right border-border/75 border rounded-md shadow opacity-50">
                <DebugButtonsForSaw className="scale-[.74] origin-left" />
            </div>

            <div className="relative px-3 py-3 w-full text-sm border-border border-b flex items-center justify-center">
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

function CurrentApp({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const sawHandle = useAtomValue(sawHandleAtom);
    const iconsLarge = true;
    return (
        <div className={classNames("w-full grid place-items-center", className)} {...rest}>
            {/* <div className=""> Login screen detected: </div> */}
            <div className="">
                Active application:
            </div>

            <div className="text-left 1place-self-center size-24 border-border border rounded grid place-items-center">
                <ImageHolder className={iconsLarge ? "size-12" : "size-5"} imageAtom={sawIconAtom} />
            </div>

            <div className="place-self-center">
                {/* App name: */}
                <div className="text-xs min-h-8">
                    {sawHandle?.caption}
                </div>
            </div>
        </div>
    );
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
