import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button, Checkbox, Label } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doOpenCreateManiSawAtom, doOpenSawOverlayAtom, monitorCounterAtom, sawHandleAtom } from "@/store";

export function MonitorOverlayBody() {

    const doOpen = useSetAtom(doOpenSawOverlayAtom);
    const doOpenCreateManiSaw = useSetAtom(doOpenCreateManiSawAtom);

    const sawHandle = useAtomValue(sawHandleAtom);
    return (
        <div className="mx-auto w-4/5 max-w-72 h-full text-sm grid place-items-center">

            <div className="relative boder-border border rounded-md">

                <div className="relative px-3 py-3 w-full border-border border-b flex items-center justify-center">
                    Select application

                    <Button
                        className="absolute 1py-4 right-2 top-1/2 -translate-y-1/2 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                        onClick={() => doOpen(false)}
                    >
                        <Cross2Icon className="size-4" />
                    </Button>

                </div>

                <MonitorCounter className="absolute right-2 bottom-1 text-right opacity-25" />

                <div className="px-3 pt-3 pb-4 grid gap-y-4 place-items-center">
                    <div className="text-center text-balance">
                        Launch the program or browse to the Web site that
                        contains the login screen for which you want to create a managed logon.
                    </div>

                    {/* <div className="">
                        Login screen detected:
                    </div> */}
                    <div className="-mt-4">
                        Active application:
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

                    {/* <div className="">To continue click the button below.</div> */}

                    <Button className="place-self-center" variant="default" size="xs"
                        onClick={() => {
                            doOpen(false);
                            doOpenCreateManiSaw(true);
                        }}
                    >
                        Continue
                    </Button>
                </div>

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
            {monitorCounter}s
        </div>
    );
}
