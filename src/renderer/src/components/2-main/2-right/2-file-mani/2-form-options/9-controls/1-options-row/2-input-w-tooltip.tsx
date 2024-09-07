import { InputHTMLAttributes } from "react";
import { InputTooltipShell, OptionCheckbox, OptionInput, RowInputStateAtom } from "@/ui";
import { TooltipTrigger } from "./3-tooltip-trigger";

type InputWTooltipProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function InputWTooltip({ stateAtom, asCheckbox, ...rest }: InputWTooltipProps) {
    return (
        <InputTooltipShell stateAtom={stateAtom} Trigger={TooltipTrigger}>
            {asCheckbox
                ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                : <OptionInput stateAtom={stateAtom} {...rest} />
            }
        </InputTooltipShell>
    );
}
