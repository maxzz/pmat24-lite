import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { newManiCtx, wizardLastPage } from "../../0-new-mani-ctx";

export function WizardButtons({ className, ...rest }: ComponentProps<"div">) {

    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doAdvancePage = useSetAtom(newManiCtx.doAdvancePageAtom);

    return (
        <div className={classNames("px-4 flex items-center justify-end gap-1", className)} {...rest}>
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
