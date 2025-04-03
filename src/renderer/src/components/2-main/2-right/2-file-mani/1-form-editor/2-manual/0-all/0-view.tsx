import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";

export function ManualModeView({ ctx, className, ...rest }: { ctx: MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames(manualModeViewClasses, !isNewManual(ctx) && "h-full", className)} {...rest}>
            <ManualPanelActions className="@container/actions" ctx={ctx} />
            <ManualPanelProps className="@container/props min-h-[180px] text-xs" ctx={ctx} />
        </div>
    );
}

/**
 * Limit height for new manifests to show manifest options otherwise
 * options are hidden and user need to quess that something is below.
 */
function isNewManual(ctx: MFormContextProps) {
    const fileUs = ctx.maniAtoms[ctx.formIdx]?.fileUsCtx?.fileUs;
    if (!fileUs) {
        return null;
    }
    const newManual = fileUs.fileCnt.newAsManual;
    return newManual;
}

const manualModeViewClasses = "\
min-w-60 min-h-0 \
\
grid \
grid-cols-1 \
grid-rows-[minmax(100px,_1fr),auto] \
\
@[600px]:grid-cols-2 \
@[600px]:gap-y-0 \
gap-y-2 \
gap-x-1 \
";

//TODO: check focus-within when added new item from the empty list

//TODO: remove frame; leave only line inbetween
//TODO: scroll panels independently
//TDOO: header is not part of the scroll
