import { type ReactNode } from "react";
import { type OptionInputWTypeProps } from "@/ui";
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

type RowInputWLabelProps = OptionInputWTypeProps & {
    label: string;
};

export function RowInputWTitle({ label, ...rest }: RowInputWLabelProps) {
    return (
        <TitleWChildren label={label}>
            <InputWTooltip {...rest} />
        </TitleWChildren>
    );
}

type RowInputAndButtonWLabelProps = RowInputWLabelProps & {
    button: ReactNode;
};

export function RowInputAndButtonWTitle({ label, button, ...rest }: RowInputAndButtonWLabelProps) {
    return (
        <TitleWChildren label={label}>
            <div className="w-full flex items-center justify-between gap-1">
                <InputWTooltip {...rest} />
                {button}
            </div>
        </TitleWChildren>
    );
}
