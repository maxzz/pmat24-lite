import { useAtomValue } from "jotai";
import { monitorCounterAtom } from "@/store";
import { Button, Checkbox, Label } from "@/ui";

export function MonitorOverlayBody() {
    const monitorCounter = useAtomValue(monitorCounterAtom);
    return (
        <div className="h-full text-sm grid grid-cols-[1fr_2fr_1fr] place-content-center">
            <div className="col-start-2 grid gap-y-4 text-center">

                <div className="">{monitorCounter}</div>

                <div className="text-balance">
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

//doOpenCreateManiSawAtom