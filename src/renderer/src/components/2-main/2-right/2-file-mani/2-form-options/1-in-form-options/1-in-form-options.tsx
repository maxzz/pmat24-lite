import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type FormOptionsAndFileUsCtxAtoms, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { WebDetectionContenty, W32DetectionContent } from "./2-detection-content";

export function InFormOptions({ ctx, className, ...rest }: { ctx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const formOptionsCtx = ctx.maniAtoms?.[ctx.formIdx];
    if (!formOptionsCtx) {
        return null;
    }
    return (
        <div className={classNames("ml-2 mr-2 mt-1 text-xs flex flex-col items-start gap-1 select-none", className)} {...rest}>
            <div className="font-semibold">
                Additional options
            </div>

            <FormDetection formOptionsCtx={formOptionsCtx} />
        </div>
    );
}

function FormDetection({ formOptionsCtx }: { formOptionsCtx: FormOptionsAndFileUsCtxAtoms; }) {
    const isWeb = useAtomValue(formOptionsCtx.options.isWebAtom);
    const formIdx = formOptionsCtx.options.formIdx;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            {isWeb
                ? <WebDetectionContenty ctx={formOptionsCtx} />
                : <W32DetectionContent ctx={formOptionsCtx} />
            }
        </AccordionWithTrigger>
    );
}
