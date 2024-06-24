import { InputHTMLAttributes, ReactNode } from "react";
import { InputTooltipShell, Label, OptionCheckbox, OptionInput, RowInputStateAtom } from "@/ui";
import { RowTrigger } from "./3-row-trigger";

export function RowLabel({ label, children }: { label: string; children: ReactNode; }) {
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
        <RowLabel label={label}>
            <InputTooltipShell stateAtom={stateAtom} Trigger={RowTrigger}>
                {asCheckbox
                    ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                    : <OptionInput stateAtom={stateAtom} {...rest} />
                }
            </InputTooltipShell>
        </RowLabel>
    );
}

export function RowInputAndButtonWLabel({ label, stateAtom, asCheckbox, button, ...rest }: RowInputWLabelProps & { button: ReactNode; }) {
    return (
        <RowLabel label={label}>
            <div className="w-full flex items-center justify-between gap-1">

                <InputTooltipShell stateAtom={stateAtom} Trigger={RowTrigger}>
                    {asCheckbox
                        ? <OptionCheckbox stateAtom={stateAtom} {...rest} />
                        : <OptionInput className="flex-1" stateAtom={stateAtom} {...rest} />
                    }
                </InputTooltipShell>

                {button}
            </div>
        </RowLabel>
    );
}
