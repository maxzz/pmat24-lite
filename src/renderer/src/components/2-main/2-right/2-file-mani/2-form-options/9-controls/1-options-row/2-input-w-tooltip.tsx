import { OptionInputTooltipShell, OptionCheckbox, OptionInput, type OptionInputWTypeProps } from "@/ui";
import { TooltipTrigger } from "./3-tooltip-trigger";

export function InputWTooltip({ stateAtom, asCheckbox, ...rest }: OptionInputWTypeProps) {
    return (
        <OptionInputTooltipShell stateAtom={stateAtom} Trigger={TooltipTrigger}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionInput stateAtom={stateAtom} {...rest} />
            }
        </OptionInputTooltipShell>
    );
}
