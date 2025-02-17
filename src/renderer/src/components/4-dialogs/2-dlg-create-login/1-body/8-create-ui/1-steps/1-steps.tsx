import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { newManiCtx, stepItems } from "../../0-new-mani-ctx";
import { Step } from "./2-step";

export function LeftPanelProgress({ className, ...rest }: ComponentProps<"div">) {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    return (
        <div className={classNames("max-w-64 bg-muted/20 flex flex-col gap-4", className)} {...rest}>
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
