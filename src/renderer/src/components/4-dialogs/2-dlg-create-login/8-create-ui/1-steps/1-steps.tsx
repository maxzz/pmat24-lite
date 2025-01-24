import { type ComponentProps } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { newManiCtx, stepItems } from "../../9-new-mani-ctx";
import { Step } from "./2-step";

export function LeftPanelProgress({ className, ...rest }: ComponentProps<"div">) {
    const currentStep = useAtomValue(newManiCtx.currentPageAtom);
    return (
        <div className={classNames("max-w-64 bg-muted/20 flex flex-col items-start gap-4 1debug", className)} {...rest}>
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
