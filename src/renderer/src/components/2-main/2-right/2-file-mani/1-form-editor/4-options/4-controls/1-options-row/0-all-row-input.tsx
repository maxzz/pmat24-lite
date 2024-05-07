import { InputHTMLAttributes } from "react";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowLabel } from "./2-row-label";
import { InputBody } from "./4-row-body-w-tooltip";
import { OptionInput } from "./5-option-input";
import { OptionCheckbox } from "./6-option-checkbox";

type RowInputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function RowInputWLabel({ label, stateAtom, asCheckbox, ...rest }: RowInputWLabelProps) {
    return (
        <RowLabel label={label}>
            <InputBody stateAtom={stateAtom}>
                {asCheckbox
                    ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                    : <OptionInput stateAtom={stateAtom} {...rest} />
                }
            </InputBody>
        </RowLabel>
    );
}
