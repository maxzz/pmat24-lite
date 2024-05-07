import { InputHTMLAttributes } from "react";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowLabel } from "./2-row-label";
import { InputBody } from "./4-row-body-w-tooltip";

type RowInputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function RowInputWLabel({ label, asCheckbox, ...rest }: RowInputWLabelProps) {
    return (
        <RowLabel label={label}>
            <InputBody {...rest} />
        </RowLabel>
    );
}
