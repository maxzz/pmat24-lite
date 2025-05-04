import { type ComponentPropsWithoutRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { classNames, useDissmissNextToasts } from "@/utils";
import { Checkbox, Label } from "@/ui";
import { secondsCounterAtom } from "@/store/7-napi-atoms";
import { createManualManiCheckboxAtom } from "@/store/1-atoms/7-dialogs";
import { DebugFrame } from "./8-debug-frame";
import { CurrentApp } from "./2-current-app";
import { ButtonContinue } from "./3-dlg-button-continue";

export function SawMonitorDlgBody() {
    const [createManualManiCheckbox, setCreateManualManiCheckbox] = useAtom(createManualManiCheckboxAtom);
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
                        <Checkbox className="size-4" checked={createManualManiCheckbox} onCheckedChange={(v) => setCreateManualManiCheckbox(!!v)} />
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
