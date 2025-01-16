import { ComponentProps, type ReactNode } from "react";
import { atom, useAtom } from "jotai";
import { Button } from "@/ui/shadcn";
import { StatusEnum, Step, type StepItem } from "./2-step";

const stepItems: StepItem[] = [
    { label: "Pick application", },
    { label: "Select fields and submit", },
    { label: "Name and options", },
    { label: "Save", },
];

const currentStepAtom = atom(1);

/**
 * Former Timeline5WithAI from shadch-tv
 */
export function LeftPanelProgress(props: ComponentProps<"div">) {
    const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
    return (
        <div className="bg-muted/20 flex flex-col items-start gap-4"{...props}>
            {stepItems.map((item, idx) => {
                const status =
                    idx < currentStep
                        ? StatusEnum.complete
                        : idx === currentStep
                            ? StatusEnum.current
                            : StatusEnum.notStarted;
                return (
                    <Step idx={idx} label={item.label} isLast={idx === stepItems.length - 1} status={status} key={idx} />
                );
            })}
        </div>
    );
}

export function TestButtons() {
    const [currentStep, setCurrentStep] = useAtom(currentStepAtom);
    return (
        <div className="flex items-center justify-end gap-1">
            <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s - 1)} disabled={currentStep < 0}>
                Prev
            </Button>
            <Button variant="outline" size="xs" onClick={() => setCurrentStep((s) => s + 1)} disabled={currentStep >= stepItems.length}>
                Next
            </Button>
        </div>
    );
}
