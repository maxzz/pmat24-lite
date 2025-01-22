import { type ComponentProps } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { doMoveWizardPageAtom, newManiCtx, stepItems } from "../../9-new-mani-ctx";
import { Step } from "./2-step";

export function LeftPanelProgress({ className, ...rest }: ComponentProps<"div">) {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    return (
        <div className={classNames("bg-muted/20 flex flex-col items-start gap-4 1debug", className)} {...rest}>
            {stepItems.map((item, idx) => {
                return (
                    <Step
                        idx={idx}
                        currentStep={currentStep}
                        label={item.label}
                        isLast={idx === stepItems.length - 1}
                        key={idx}
                    />
                );
            })}
        </div>
    );
}

export function TestButtons() {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    const doMoveWizardPage = useSetAtom(doMoveWizardPageAtom);
    return (
        <div className="px-4 flex items-center justify-end gap-1">
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: false})} disabled={currentStep < 0}>
                Prev
            </Button>
            <Button variant="outline" size="xs" onClick={() => doMoveWizardPage({next: true})} disabled={currentStep >= stepItems.length}>
                Next
            </Button>
        </div>
    );
}

//TODO: add loader after some time
