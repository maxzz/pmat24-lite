import { InputHTMLAttributes } from "react";
import { InputBody, OptionCheckbox, OptionInput, RowInputStateAtom } from "@/ui";
import { RowLabel } from "./2-row-label";
import { RowTrigger } from "./3-row-trigger";

type RowInputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function RowInputWLabel({ label, stateAtom, asCheckbox, ...rest }: RowInputWLabelProps) {
    return (
        <RowLabel label={label}>
            <InputBody stateAtom={stateAtom} Trigger={RowTrigger}>
                {asCheckbox
                    ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                    : <OptionInput stateAtom={stateAtom} {...rest} />
                }
            </InputBody>
        </RowLabel>
    );
}
