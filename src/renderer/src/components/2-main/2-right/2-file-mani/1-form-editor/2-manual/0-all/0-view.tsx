import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type MFormContextProps } from "@/store/1-atoms/3-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";

export function ManualModeView({ ctx, className, ...rest }: { ctx: MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames(manualModeViewClasses, className)} {...rest}>
            <ManualPanelActions className="@container/actions" ctx={ctx} />
            <ManualPanelProps className="@container/props min-h-[180px] text-xs" ctx={ctx} />
        </div>
    );
}

const manualModeViewClasses = "\
min-w-60 h-full min-h-0 \
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
