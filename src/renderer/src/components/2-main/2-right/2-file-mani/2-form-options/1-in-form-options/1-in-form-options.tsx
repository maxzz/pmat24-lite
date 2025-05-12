import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type FormOptionsAndFileUsCtxAtoms, type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { DetectionBodyForWeb, DetectionBodyForWin32 } from "./2-form-detection";

export function InFormOptions({ ctx, ...rest }: { ctx: NFormContextProps | MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
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
    return (<>
        {isWeb
            ? <DetectionBodyForWeb ctx={ctx} />
            : <DetectionBodyForWin32 ctx={ctx} />
        }
    </>);
}
