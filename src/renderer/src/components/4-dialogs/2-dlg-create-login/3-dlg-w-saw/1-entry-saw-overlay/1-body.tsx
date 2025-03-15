import { type ComponentPropsWithoutRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { classNames, useDissmissNextToasts } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { secondsCounterAtom, napiBuildState } from "@/store";
import { createManualManiAtom, doMoveToSecondDlgAtom } from "../0-ctx";
import { CurrentApp } from "./2-current-app";
import { DebugFrame } from "./8-debug-frame";

export function MonitorOverlayBody() {
    const [createManualMani, setCreateManualMani] = useAtom(createManualManiAtom);
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
                        <Checkbox className="size-4" checked={createManualMani} onCheckedChange={(v) => setCreateManualMani(!!v)} />
                        Set up a managed logon manually
                    </Label>

                    {/* <div className="">To continue click the button below.</div> */}

                    <ButtonContinue />
                </div>

                <MonitorCounter className="absolute right-2 bottom-1 text-right opacity-25" />
            </DebugFrame>
        </div>
    );
}

function ButtonContinue({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const isRunning = useSnapshot(napiBuildState).buildRunning;
    const doMoveToSecondDlg = useSetAtom(doMoveToSecondDlgAtom);
    return (
        <Button
            className="place-self-center" variant="default" size="xs"
            disabled={isRunning}
            onClick={() => doMoveToSecondDlg({ cancel: false })}
        >
            Continue
        </Button>
    );
}

function MonitorCounter({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const monitorCounter = useAtomValue(secondsCounterAtom);
    if (monitorCounter < 0) {
        return null;
    }
    return (
        <div className={classNames(className)} {...rest}>
            {monitorCounter}s
        </div>
    );
}
