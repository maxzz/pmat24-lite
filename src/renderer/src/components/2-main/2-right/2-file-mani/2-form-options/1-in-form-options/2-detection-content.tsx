import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FormOptionsAndFileUsCtxAtoms, type OFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";
import { Block4_ScreenDetection } from "../0-all/2-4-screen-detection";

export function WebDetectionContenty({ ctx }: { ctx: OFormContextProps; }) {
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <div className={textClasses}>
            <Block4_ScreenDetection ctx={ctx} />
        </div>
    );
}

export function W32DetectionContent({ ctx }: { ctx: OFormContextProps; }) {
    return (
        <div>
            win32
            <Block4_ScreenDetection ctx={ctx} />
        </div>
    );
}

const textClasses = 'pl-6 pr-2 font-normal';
