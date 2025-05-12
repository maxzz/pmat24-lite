import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { FormDetection } from "./2-form-detection";

export function InFormOptions({ ctx }: { ctx: NFormContextProps | MFormContextProps; }) {
    const formOptions = ctx.maniAtoms?.[ctx.formIdx];
    if (!formOptions) {
        return null;
    }

    return (
        <div className="ml-1 p-1 1flex items-center gap-1 select-none">
            <FormDetection ctx={formOptions} />
        </div>
    );
}
