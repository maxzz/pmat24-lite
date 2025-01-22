import { type ComponentProps } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { newManiCtx } from "../../9-types-ctx";
import { Step } from "./2-step";
import { stepItems } from "./8-step-items-data";

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
    const [currentStep, setCurrentStep] = useAtom(newManiCtx.currentPageAtom);
    return (
        <div className="px-4 flex items-center justify-end gap-1">
            <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep < 0}>
                Prev
            </Button>
            <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s + 1)} disabled={currentStep >= stepItems.length}>
                Next
            </Button>
        </div>
    );
}

//TODO: should use doSetWizardPageAtom
//TODO: add loader after some time

//ctx:
//currentPage
//selectedApp get local atom with custom set
//0-ctx instead of 9-types
