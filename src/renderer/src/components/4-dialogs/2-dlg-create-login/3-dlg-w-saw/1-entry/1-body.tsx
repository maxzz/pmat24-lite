import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { hasMain, sendToMain } from "@/xternal-to-main";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { doDissmissNextToastsAtom } from "@/utils";
import { doOpenCreateManiSawAtom } from "@/store";

export function DialogSawBody() {
    const doOpen = useSetAtom(doOpenCreateManiSawAtom);

    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    useEffect(() => doDissmissNextToasts, []);

    function startTest() {
        if (!hasMain()) {
            return;
        }
        sendToMain({ type: 'r2m:set-saw-mode', isOn: true });
    }

    return (
        <div className="h-full flex flex-col">
            <D.DialogHeader className="relative text-base font-bold border-b border-foreground/20 flex items-center">
                <D.DialogTitle asChild>
                    <div className="py-3 text-sm">
                        New manifest
                    </div>
                </D.DialogTitle>

                {!hasMain() && (
                    <div className="absolute -left-[38px] -top-[14px] scale-[.74] bg-muted/50 rounded-tl-md border border-foreground/10">
                        {/* <DebugButtons /> */}
                    </div>
                )}

                <Button
                    className="absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                    onClick={() => doOpen(false)}
                >
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                {/* <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20 justify-center" />
                <PagesBodyAnimation /> */}

                <Button variant="ghost" size="sm" className="text-xs" onClick={() => startTest()}>
                    <Cross2Icon className="size-4" />
                </Button>
                
            </div>

            {/* <WizardButtons className="py-3 border-t border-foreground/20" /> */}
        </div>
    );
}
