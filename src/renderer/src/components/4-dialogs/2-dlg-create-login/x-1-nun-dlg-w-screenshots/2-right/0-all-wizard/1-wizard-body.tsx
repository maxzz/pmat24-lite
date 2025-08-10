import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { doDissmissNextToastsAtom } from "@/utils";
import * as D from "@/ui/shadcn/dialog";
import { Button } from "@/ui";
import { Cross2Icon } from "@radix-ui/react-icons";
import { hasMain } from "@/xternal-to-main";
import { doOpenCreateManiAtom } from "@/store/1-atoms/7-dialogs";
import { LeftPanelProgress } from "../../8-create-ui";
import { WizardButtons } from "../../3-wizard-buttons";
import { DebugButtonsForScreenshots } from "../../../8-test-buttons";
import { PagesBodyAnimation } from "./2-pages-body";

export function WizardBody() {
    const doOpenCreateMani = useSetAtom(doOpenCreateManiAtom);

    const doDissmissNextToasts = useSetAtom(doDissmissNextToastsAtom);
    useEffect(() => doDissmissNextToasts, []);

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
                        <DebugButtonsForScreenshots />
                    </div>
                )}

                <Button
                    className="absolute py-4 right-2 -top-0.5 hover:text-white hover:bg-red-500" variant="ghost" size="xs" tabIndex={-1}
                    onClick={() => doOpenCreateMani(false)}
                >
                    <Cross2Icon className="size-4" />
                </Button>
            </D.DialogHeader>

            <div className="h-full grid grid-cols-[auto_1fr]">
                <LeftPanelProgress className="p-4 bg-muted border-r border-foreground/20 justify-center" />
                <PagesBodyAnimation />
            </div>

            <WizardButtons className="py-3 border-t border-foreground/20" />
        </div>
    );
}
