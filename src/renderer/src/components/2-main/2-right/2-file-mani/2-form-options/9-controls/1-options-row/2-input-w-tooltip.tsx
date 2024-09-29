import { OptionInputTooltipShell, OptionCheckbox, OptionString, type OptionInputWTypeProps } from "@/ui";
import { TooltipTrigger } from "./3-tooltip-trigger";

export function InputWTooltip({ stateAtom, asCheckbox, ...rest }: OptionInputWTypeProps) {
    return (
        <OptionInputTooltipShell stateAtom={stateAtom} Trigger={TooltipTrigger}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionString stateAtom={stateAtom} {...rest} />
            }
        </OptionInputTooltipShell>
    );
}
