import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type FormOptionsAndFileUsCtxAtoms, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { WebDetectionContenty, W32DetectionContent } from "./2-detection-content";

export function InFormOptionsNormal({ ctx, className, ...rest }: { ctx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("ml-2 mr-2 mt-1 text-xs flex flex-col items-start gap-1 select-none", className)} {...rest}>
            <div className="font-semibold">
                Additional options
            </div>
            <InFormOptionsGuard ctx={ctx} />
        </div>
    );
}

// export function InFormOptionsManual({ ctx, ...rest }: { ctx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
//     return (
//         <div>
//             <div className="mt-2 mr-2 1-mb-1 text-xs font-semibold select-none">
//                 Additional options
//             </div>

//             <InFormOptionsGuard ctx={ctx} />
//         </div>
//     );
// }

function InFormOptionsGuard({ ctx, ...rest }: { ctx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const formOptions = ctx.maniAtoms?.[ctx.formIdx];
    if (!formOptions) {
        return null;
    }

    return (
        <FormDetection ctx={formOptions} {...rest} />
    );
}

function FormDetection({ ctx }: { ctx: FormOptionsAndFileUsCtxAtoms; }) {
    const isWeb = useAtomValue(ctx.options.isWebAtom);
    const formIdx = ctx.options.formIdx;
    return (
        <AccordionWithTrigger formIdx={formIdx} name='form-detection' triggerText="Screen detection">
            {isWeb
                ? <WebDetectionContenty ctx={ctx} />
                : <W32DetectionContent ctx={ctx} />
            }
        </AccordionWithTrigger>
    );
}
