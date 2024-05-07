import { InputHTMLAttributes } from "react";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";
import { RowLabel } from "./2-row-label";
import { InputBody } from "./4-row-body-w-tooltip";

type RowInputWAtomProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
};

export function RowInputGuard({ label, ...rest }: RowInputWAtomProps) {
    return (
        <RowLabel label={label}>
            <InputBody {...rest} />
        </RowLabel>
    );
}
