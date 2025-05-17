import { type ReactNode } from "react";
import { type OptionInputWTypeProps, InputOrCheckWithTooltip } from "@/ui/local-ui";

// Row with input

export function InFormRowInputWTitle({ label, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <InFormChildrenWithLabel label={label}>
            <InputOrCheckWithTooltip {...rest} />
        </InFormChildrenWithLabel>
    );
}

// Row with children

export function InFormChildrenWithLabel({ label, children }: { label: string; children: ReactNode; }) {
    return (
        <div className="col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center">
            <div className="font-light text-end">
                {label}
            </div>

            {children}
        </div>
    );
}
