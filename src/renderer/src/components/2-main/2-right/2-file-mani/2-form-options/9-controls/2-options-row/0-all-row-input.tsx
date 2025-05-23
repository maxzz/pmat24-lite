import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { formRow2ColsChildrenClasses, formRow2ColsChildrenLabelClasses, FormRowChildren, InputOrCheckWithErrorMsg, type OptionInputWTypeProps } from "@/ui/local-ui";

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
        // <div className="">
            <FormRowChildren label={label} className={classNames(formRow2ColsChildrenClasses, containerClasses)} labelClasses={formRow2ColsChildrenLabelClasses}>
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
