import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { type MFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";
import { isNewManifest } from "../../0-all";
import { InFormBlockOptions } from "../../../2-form-options";

export function ManualModeView({ ctx, className, ...rest }: { ctx: MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames(manualModeViewClasses, isNewManifest(ctx) ? "@[600px]:gap-y-4" : "h-full", className)} {...rest}>
            <ManualPanelActions className="@container/actions" ctx={ctx} />
            <ManualPanelProps className="@container/props min-h-[180px] text-xs" ctx={ctx} />
            <InFormBlockOptions className="mb-1" n_mCtx={ctx} />
        </div>
    );
}

const manualModeViewClasses = "\
min-w-60 min-h-0 \
\
grid \
grid-cols-1 \
grid-rows-[minmax(100px,_1fr),auto,auto] \
\
@[600px]:grid-cols-2 \
@[600px]:gap-y-0 \
gap-y-2 \
gap-x-1 \
";

const sectionLabelClasses = "mt-2 1-mb-1 text-xs font-semibold select-none";

//TODO: check focus-within when added new item from the empty list

//TODO: remove frame; leave only line inbetween
//TODO: scroll panels independently
//TDOO: header is not part of the scroll

//04.02.25
//TODO: label for the new manifest on the right option
