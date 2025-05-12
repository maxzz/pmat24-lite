import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";
import { FormDetection, InFormOptions } from "../../2-form-options";

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

            {/* <div className={labelClasses}>
                Screen detection
            </div> */}

            <InFormOptions ctx={ctx} />
        </div>
    );
}

const sectionLabelClasses = "ml-2 mt-1 -mb-1 text-xs font-semibold select-none";
