import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { monitorCounterAtom, sawHandleAtom } from "@/store";

export function MonitorOverlayBody() {

    const sawHandle = useAtomValue(sawHandleAtom);
    return (
        <div className="mx-auto w-4/5 max-w-72 h-full text-sm grid place-items-center">
            <div className="relative px-3 py-4 grid gap-y-4 place-items-center boder-border border rounded-md">

                <MonitorCounter className="absolute right-2 bottom-1 text-right" />

                <div className="text-center text-balance">
                    Launch the program or browse to the Web site that
                    contains the login screen for which you want to create a managed logon.
                </div>

                <div className="">
                    Login screen detected:
                </div>

                <div className="">
                    <div className="place-self-center size-24 border-border border rounded">
                    </div>

                    <div className="place-self-center">
                        App name
                        {sawHandle?.caption}
                    </div>
                </div>

                <Label className="place-self-center flex items-center gap-2">
                    <Checkbox className="size-4" />
                    Set up a managed logon manually
                </Label>

                <div className="">To continue click the button below.</div>

                <Button className="place-self-center" variant="default" size="xs">
                    Continue
                </Button>

            </div>
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

function MonitorCounter({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const monitorCounter = useAtomValue(monitorCounterAtom);
    return (
        <div className={classNames(className)} {...rest}>
            {monitorCounter}
        </div>
    );
}
