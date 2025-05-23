import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";
import { InFormOptions } from "../../2-form-options";

export function TabContent_NormalForm({ ctx, className, ...rest }: { ctx: NFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const hasFieldsNeedSubmit = !!ctx.nAllAtoms.normal.rowCtxs.length;
    return (
        <div className={classNames("flex flex-col", className)} {...rest}>

            <div className={sectionLabelClasses}>
                Form fields
            </div>
            
            <FieldsGrid ctx={ctx} />

            {hasFieldsNeedSubmit && (<>
                <div className={sectionLabelClasses}>
                    Form submit options
                </div>

                <TabSubmit ctx={ctx} />
            </>)}

            <InFormOptions className="pl-2 pr-2 pt-1" n_mCtx={ctx} />
        </div>
    );
}

const sectionLabelClasses = "ml-2 mr-2 mt-1 1-mb-1 text-xs font-semibold select-none";
