import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { newManiCtx, wizardLastPage } from "../../0-new-mani-ctx";
import { ControlsScanProgressBar } from "./1-progress-cancel";

export function WizardButtons({ className, ...rest }: ComponentProps<"div">) {

    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doAdvancePage = useSetAtom(newManiCtx.doAdvancePageAtom);

    return (
        <div className={classNames("relative px-4 flex items-center justify-end gap-1", className)} {...rest}>

            <div className="absolute left-2 top-1/2 -translate-y-1/2">
                <ControlsScanProgressBar />
            </div>

            <Button
                variant="outline"
                size="xs"
                onClick={() => doAdvancePage({ next: false })}
                disabled={currentStep <= 0}
            >
                Prev
            </Button>

            <Button
                variant="default"
                size="xs"
                onClick={() => doAdvancePage({ next: true })} // always enabled to show toast as hint
            >
                {currentStep === wizardLastPage ? 'Save' : 'Next'}
            </Button>
        </div>
    );
}
