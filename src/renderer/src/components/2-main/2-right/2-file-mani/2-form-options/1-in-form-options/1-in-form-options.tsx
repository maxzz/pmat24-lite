import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type OFormContextProps, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { DetectionContent_Web, DetectionContent_W32 } from "./2-detection-content";

export function InFormOptions({ n_mCtx, className, ...rest }: { n_mCtx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const formOptionsCtx = n_mCtx.maniAtoms?.[n_mCtx.formIdx];
    if (!formOptionsCtx) {
        return null;
    }
    const ctx: OFormContextProps = { maniAtoms: n_mCtx.maniAtoms, oAllAtoms: formOptionsCtx, formIdx: n_mCtx.formIdx };
    return (
        <div className={classNames("text-xs flex flex-col items-start gap-1 select-none", className)} {...rest}>
            <div className="font-semibold">
                Additional options
            </div>

            <FormDetection ctx={ctx} />
        </div>
    );
}

function FormDetection({ ctx }: { ctx: OFormContextProps; }) {
    const isWeb = useAtomValue(ctx.oAllAtoms.options.isWebAtom);
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <AccordionWithTrigger name='form-detection' formIdx={formIdx} triggerText="Screen detection">
            {isWeb
                ? <DetectionContent_Web ctx={ctx} />
                : <DetectionContent_W32 ctx={ctx} />
            }
        </AccordionWithTrigger>
    );
}
