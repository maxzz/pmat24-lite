import { InputHTMLAttributes, ReactNode } from "react";
import { Label, RowInputStateAtom } from "@/ui";
import { InputWTooltip } from "./2-input-w-tooltip";

function RowLabelWChildren({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <Label className={"col-span-2 py-0.5 pr-0.5 text-xs grid grid-cols-subgrid items-center"}>
            <div className="font-light">
                {label}
            </div>

            {children}
        </Label>
    );
}

type RowInputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function RowInputWLabel({ label, stateAtom, asCheckbox, ...rest }: RowInputWLabelProps) {
    return (
        <RowLabelWChildren label={label}>
            <InputWTooltip stateAtom={stateAtom} asCheckbox={asCheckbox} {...rest} />
        </RowLabelWChildren>
    );
}

type RowInputAndButtonWLabelProps = RowInputWLabelProps & {
    button: ReactNode;
};

export function RowInputAndButtonWLabel({ label, stateAtom, asCheckbox, button, ...rest }: RowInputAndButtonWLabelProps) {
    return (
        <RowLabelWChildren label={label}>
            <div className="w-full flex items-center justify-between gap-1">
                <InputWTooltip stateAtom={stateAtom} asCheckbox={asCheckbox} {...rest} />
                {button}
            </div>
        </RowLabelWChildren>
    );
}
