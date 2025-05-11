import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { FieldsGrid, TabSubmit } from "../1-normal";
import { AccordionWithTrigger, TestAccordionVariant } from "@/ui/motion-primitives";

export function TabContent_NormalForm({ ctx, className, ...rest }: { ctx: NFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
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

            <div className={labelClasses}>
                Screen detection
            </div>

            <FormDetection ctx={ctx} />
            
            <TestAccordionVariant />
            <AccordionWithTrigger formIdx={ctx.nAllAtoms.options.formIdx} name='form-detection' />

        </div>
    );
}

const labelClasses = "ml-2 mt-1 -mb-1 text-xs font-semibold select-none";

function FormDetection({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        <div className="ml-1 p-1 1flex items-center gap-1 select-none">
            {ctx.nAllAtoms.options.formIdx
                ? <DetectionBodyForWeb ctx={ctx} />
                : <DetectionBodyForWin32 ctx={ctx} />
            }
        </div>
    </>);
}

function DetectionBodyForWeb({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
    123
    </>);
}

function DetectionBodyForWin32({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        456
    </>);
}
