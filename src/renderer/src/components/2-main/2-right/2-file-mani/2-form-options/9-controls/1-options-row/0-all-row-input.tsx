import { InputHTMLAttributes, ReactNode } from "react";
import { Label, RowInputStateAtom } from "@/ui";
import { InputWTooltip } from "./2-input-w-tooltip";

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";

export function TitleWChildren({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className={"col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center"}>
            <div className="font-light text-end">
                {label}
            </div>

            {children}
        </div>
    );
}

type RowInputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    stateAtom: RowInputStateAtom;
    asCheckbox?: boolean;
};

export function RowInputWLabel({ label, stateAtom, asCheckbox, ...rest }: RowInputWLabelProps) {
    return (
        <TitleWChildren label={label}>
            <InputWTooltip stateAtom={stateAtom} asCheckbox={asCheckbox} {...rest} />
        </TitleWChildren>
    );
}

type RowInputAndButtonWLabelProps = RowInputWLabelProps & {
    button: ReactNode;
};

export function RowInputAndButtonWLabel({ label, stateAtom, asCheckbox, button, ...rest }: RowInputAndButtonWLabelProps) {
    return (
        <TitleWChildren label={label}>
            <div className="w-full flex items-center justify-between gap-1">
                <InputWTooltip stateAtom={stateAtom} asCheckbox={asCheckbox} {...rest} />
                {button}
            </div>
        </TitleWChildren>
    );
}
