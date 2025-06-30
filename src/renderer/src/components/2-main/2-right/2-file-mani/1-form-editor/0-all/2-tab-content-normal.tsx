import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { InFormBlockFields, InFormBlockSubmit } from "../1-normal";
import { InFormBlockOptions } from "../../2-form-options";

export function TabContent_NormalForm({ nFormctx, className, ...rest }: { nFormctx: NFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const hasFieldsNeedSubmit = !!nFormctx.nAllAtoms.normal.rowCtxs.length;
    return (
        <div className={classNames("pr-1 flex flex-col", className)} {...rest}>

            <div className={sectionLabelClasses}>
                Form fields
            </div>
            <InFormBlockFields ctx={nFormctx} />

            {hasFieldsNeedSubmit && (<>
                <div className={sectionLabelClasses}>
                    Form submit options
                </div>

                <InFormBlockSubmit ctx={nFormctx} />
            </>)}

            <div className={sectionLabelClasses}>
                Additional options
            </div>
            <div className="pl-2 pr-2 pt-3 text-xs flex flex-col items-start gap-1 select-none">
                <InFormBlockOptions n_m_ctx={nFormctx} />
            </div>

        </div>
    );
}

const sectionLabelClasses = "ml-2 mr-2 mt-1 1-mb-1 text-xs font-semibold select-none";
