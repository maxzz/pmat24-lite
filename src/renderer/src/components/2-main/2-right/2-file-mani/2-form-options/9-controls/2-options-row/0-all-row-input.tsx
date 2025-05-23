import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { formRow2ColsChildrenClasses, formRow2ColsChildrenLabelClasses, FormRowChildren, InputOrCheckWithErrorMsg, type OptionInputWTypeProps } from "@/ui/local-ui";

// Row with input

export function RowInputWTitle2Cols({ label, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <ChildrenWithLabel2Cols label={label}>
            <InputOrCheckWithErrorMsg {...rest} />
        </ChildrenWithLabel2Cols>
    );
}

// Row with input and button

export function RowInputAndButtonWTitle2Cols({ label, button, ...rest }: { label: string; button: ReactNode; } & OptionInputWTypeProps) {
    return (
        <ChildrenWithLabel2Cols label={label}>
            <div className="w-full flex items-center justify-between gap-1">
                <InputOrCheckWithErrorMsg {...rest} />
                {button}
            </div>
        </ChildrenWithLabel2Cols>
    );
}

// Row with children

export function ChildrenWithLabel2Cols({ label, children }: { label: string; children: ReactNode; }) {
    return (
        // <div className="">
            <FormRowChildren label={label} className={formRow2ColsChildrenClasses} labelClasses={formRow2ColsChildrenLabelClasses}>
                {children}
            </FormRowChildren>
            // {/* <div className="col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center">
            //     <div className="font-light text-end">
            //         {label}
            //     </div>
            //     {children}
            // </div> */}
        // </div>
    );
}

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";
