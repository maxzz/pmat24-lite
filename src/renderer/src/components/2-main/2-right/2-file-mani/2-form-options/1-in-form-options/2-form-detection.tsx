import { type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type NFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { AccordionWithTrigger } from "@/ui/motion-primitives";

export function FormDetection({ ctx }: { ctx: NFormContextProps; }) {
    const isWeb = useAtomValue(ctx.nAllAtoms.options.isWebAtom);
    return (
        <div className="ml-1 p-1 1flex items-center gap-1 select-none">
            {isWeb
                ? <DetectionBodyForWeb ctx={ctx} />
                : <DetectionBodyForWin32 ctx={ctx} />
            }
        </div>
    );
}

function DetectionBodyForWeb({ ctx }: { ctx: NFormContextProps; }) {
    const formIdx = ctx.nAllAtoms.options.formIdx;
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

function DetectionBodyForWin32({ ctx }: { ctx: NFormContextProps; }) {
    return (<>
        win32
    </>);
}

const textClasses = 'pl-6 pr-2';
