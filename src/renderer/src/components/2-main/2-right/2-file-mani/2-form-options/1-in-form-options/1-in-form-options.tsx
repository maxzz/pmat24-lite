import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type MFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";

export function InFormOptions({ ctx }: { ctx: NFormContextProps | MFormContextProps; }) {
    return (
        <div className="ml-1 p-1 1flex items-center gap-1 select-none">
            123
            {/* <FormDetection ctx={ctx} /> */}
        </div>
    );
}
