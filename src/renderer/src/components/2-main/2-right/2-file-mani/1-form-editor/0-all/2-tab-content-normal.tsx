import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormProps } from "@/store/1-file-mani-atoms";
import { FieldsList, InFormBlockSubmit } from "../1-normal";
import { InFormBlockOptions } from "../../2-form-options";

export function TabContent_NormalForm({ nFormProps, className, ...rest }: { nFormProps: NFormProps; } & ComponentPropsWithoutRef<'div'>) {
    const hasFieldsNeedSubmit = !!nFormProps.nFormCtx.normal.rowCtxs.length;
    return (
        <div className={classNames("pr-1 flex flex-col", className)} {...rest}>

            <div className={sectionLabelClasses}>
                Form fields
            </div>
            <FieldsList nFormProps={nFormProps} />

            {hasFieldsNeedSubmit && (<>
                <div className={sectionLabelClasses}>
                    Form submit options
                </div>

                <InFormBlockSubmit nFormProps={nFormProps} />
            </>)}

            <div className={sectionLabelClasses}>
                Additional options
            </div>
            <div className="pl-2 pr-2 pt-3 text-xs flex flex-col items-start gap-1 select-none">
                <InFormBlockOptions anyFormProps={nFormProps} />
            </div>

        </div>
    );
}

const sectionLabelClasses = "ml-2 mr-2 mt-1 1-mb-1 text-xs font-semibold select-none";
