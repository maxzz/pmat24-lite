import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { FormOptionsAndFileUsCtxAtoms, type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";

export function DetectionBodyForWeb({ ctx }: { ctx: FormOptionsAndFileUsCtxAtoms; }) {
    const formIdx = ctx.options.formIdx;
    return (
        <AccordionWithTrigger formIdx={formIdx} name='form-detection' truggerText="Screen detection">
            <p className={textClasses}>
                Kick off your experience by setting up Motion-Primitives. This
                section covers the basics of installation and how to add animations
                to your projects. You’ll get familiar with the initial setup and the
                core features quickly.
            </p>
        </AccordionWithTrigger>
    );
}

export function DetectionBodyForWin32({ ctx }: { ctx: FormOptionsAndFileUsCtxAtoms; }) {
    return (<>
        win32
    </>);
}

const textClasses = 'pl-6 pr-2';
