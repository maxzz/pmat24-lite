import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FormOptionsAndFileUsCtxAtoms, OFormContextProps, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";

export function WebDetectionContenty({ ctx }: { ctx: OFormContextProps; }) {
    const formIdx = ctx.oAllAtoms.options.formIdx;
    return (
        <p className={textClasses}>
            Kick off your experience by setting up Motion-Primitives. This
            section covers the basics of installation and how to add animations
            to your projects. You’ll get familiar with the initial setup and the
            core features quickly.
        </p>
    );
}

export function W32DetectionContent({ ctx }: { ctx: OFormContextProps; }) {
    return (<>
        win32
    </>);
}

const textClasses = 'pl-6 pr-2 font-normal';
