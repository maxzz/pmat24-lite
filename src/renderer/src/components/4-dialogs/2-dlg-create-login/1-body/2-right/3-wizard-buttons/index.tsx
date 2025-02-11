import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { newManiCtx, stepItems } from "../../0-new-mani-ctx";
import { classNames } from "@/utils";

export function WizardButtons({ className, ...rest }: ComponentProps<"div">) {

    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doAdvancePage = useSetAtom(newManiCtx.doAdvancePageAtom);
    const nextEnabled = useAtomValue(newManiCtx.nextEnabledAtom);

    return (
        <div className={classNames("px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button
                variant="outline"
                size="xs"
                onClick={() => doAdvancePage({ next: false })}
                disabled={currentStep < 0}
            >
                Prev
            </Button>

            <Button
                variant="outline"
                size="xs"
                onClick={() => doAdvancePage({ next: true })}
                // disabled={currentStep >= stepItems.length}
                disabled={!nextEnabled}
            >
                Next
            </Button>
        </div>
    );
}
