import { type ReactNode } from "react";
import { type OptionInputWTypeProps } from "@/ui";
import { InputOrCheckWithTooltip } from "./2-input-or-check-w-tooltip";

// Row with input

export function RowInputWTitle({ label, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <ChildrenWithLabel label={label}>
            <InputOrCheckWithTooltip {...rest} />
        </ChildrenWithLabel>
    );
}

// Row with input and button

export function RowInputAndButtonWTitle({ label, button, ...rest }: { label: string; button: ReactNode; } & OptionInputWTypeProps) {
    return (
        <ChildrenWithLabel label={label}>
            <div className="w-full flex items-center justify-between gap-1">
                <InputOrCheckWithTooltip {...rest} />
                {button}
            </div>
        </ChildrenWithLabel>
    );
}

// Row with children

export function ChildrenWithLabel({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className={"col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center"}>
            <div className="font-light text-end">
                {label}
            </div>

            {children}
        </div>
    );
}

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";
