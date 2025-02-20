import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";

export function NormalFormTabContent({ ctx, className, ...rest }: { ctx: NFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const hasFields = !!ctx.nAllAtoms.normal.rowCtxs.length;
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>

            <div className={labelClasses}>
                Form fields
            </div>

            <FieldsGrid ctx={ctx} />

            {hasFields && (<>
                <div className={labelClasses}>
                    Form submit options
                </div>

                <TabSubmit ctx={ctx} />
            </>)}
        </div>
    );
}

const labelClasses = "ml-2 mt-1 -mb-1 text-xs font-semibold select-none";
