import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { newManiCtx, stepItems } from "../../9-new-mani-ctx";
import { classNames } from "@/utils";

export function WizardBottomButtons({className, ...rest}: ComponentProps<"div">) {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doMoveWizardPage = useSetAtom(newManiCtx.doMoveWizardPageAtom);
    return (
        <div className={classNames("px-4 flex items-center justify-end gap-1", className)} {...rest}>
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: false})} disabled={currentStep < 0}>
                Prev
            </Button>
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: true})} disabled={currentStep >= stepItems.length}>
                Next
            </Button>
        </div>
    );
}
