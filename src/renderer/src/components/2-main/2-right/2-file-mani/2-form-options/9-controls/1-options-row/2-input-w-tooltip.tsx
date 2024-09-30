import { OptionInputTooltipShell, OptionCheckbox, OptionString, type OptionInputWTypeProps } from "@/ui";
import { TooltipTrigger } from "./3-tooltip-trigger";

export function InputWTooltip({ stateAtom, asCheckbox, containerClasses, ...rest }: OptionInputWTypeProps) {
    return (
        <OptionInputTooltipShell stateAtom={stateAtom} Trigger={TooltipTrigger} containerClasses={containerClasses}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionString stateAtom={stateAtom} {...rest} />
            }
        </OptionInputTooltipShell>
    );
}
