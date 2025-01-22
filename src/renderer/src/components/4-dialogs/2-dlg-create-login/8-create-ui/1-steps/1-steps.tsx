import { type ComponentProps } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Button } from "@/ui/shadcn";
import { newManiCtx } from "../../9-types-ctx";
import { StatusEnum, Step, type StepItem } from "./2-step";
import { classNames } from "@/utils";

const stepItems: StepItem[] = [
    {
        label: <div className="flex flex-col gap-1">
            <div className="text-sm font-semibold">Pick application</div>
            <div className="text-xs">Select application to train</div>
        </div>
    }, {
        label: <div className="flex flex-col gap-1">
            <div className="font-semibold">Fields and submit</div>
            <div className="text-xs">Select fields and submit</div>
        </div>
    }, {
        label: <div className="flex flex-col gap-1">
            <div className="font-semibold">Options</div>
            <div className="text-xs">Customize options of the new manifest</div>
        </div>
    }, {
        label: <div className="flex flex-col gap-1">
            <div className="font-semibold">Save</div>
            <div className="text-xs">Name manifest and save</div>
        </div>
    },
];

export function LeftPanelProgress({ className, ...rest }: ComponentProps<"div">) {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    return (
        <div className={classNames("bg-muted/20 flex flex-col items-start gap-4 1debug", className)} {...rest}>
            {stepItems.map((item, idx) => {
                const status =
                    idx < currentStep
                        ? StatusEnum.complete
                        : idx === currentStep
                            ? StatusEnum.current
                            : StatusEnum.notStarted;
                return (
                    <Step
                        idx={idx}
                        label={item.label}
                        isLast={idx === stepItems.length - 1}
                        status={status}
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
