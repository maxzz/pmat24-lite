import { type ReactNode } from "react";
import { classNames } from "@/utils";
import { type OptionInputWTypeProps, formRow2ColsChildrenClasses, formRow2ColsChildrenLabelClasses, FormRowChildren, InputOrCheckWithErrorMsg } from "@/ui/local-ui";

// Row with input

export function RowInputWTitle2Cols({ label, containerClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} className={classNames(formRow2ColsChildrenClasses, containerClasses)} labelClasses={formRow2ColsChildrenLabelClasses}>
            <InputOrCheckWithErrorMsg {...rest} />
        </FormRowChildren>
    );
}

// Row with children

export function ChildrenWithLabel2Cols({ label, children, containerClasses }: { label: string; children: ReactNode; containerClasses?: string; }) {
    return (
        <FormRowChildren label={label} className={classNames(formRow2ColsChildrenClasses, containerClasses)} labelClasses={formRow2ColsChildrenLabelClasses}>
            {children}
        </FormRowChildren>
    );
}

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";
