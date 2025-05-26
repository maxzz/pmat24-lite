import { useEffect, type ComponentPropsWithoutRef } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { cpassFieldsIdx, loginFieldsIdx, type MFormContextProps } from "@/store/1-atoms/2-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";
import { isNewManifest } from "../../0-all";
import { InFormBlockOptions } from "../../../2-form-options";

export function ManualModeView({ ctx, className, ...rest }: { ctx: MFormContextProps; } & ComponentPropsWithoutRef<'div'>) {
    const loginFields = useAtomValue(ctx.maniAtoms[loginFieldsIdx]);
    const cpassFields = useAtomValue(ctx.maniAtoms[cpassFieldsIdx]);

    useEffect(
        () => {
            console.log('%c render ------------', 'background-color: magenta; color: white', `${ctx.formIdx ? 'cpass' : 'login'}`);
            console.log('%c login render fields', 'background-color: lime; color: white', loginFields);
            console.log('%c cpass render fields', 'background-color: green; color: white', cpassFields);
        }, [loginFields, cpassFields]
    );

    return (
        <div className={classNames(manualModeViewClasses, isNewManifest(ctx) ? "@[600px]:gap-y-4" : "h-full", className)} {...rest}>

            <ManualPanelActions className="@container/actions" ctx={ctx} />

            <ManualPanelProps className="@container/props min-h-[180px] text-xs" ctx={ctx} />

            <div className="font-semibold">
                Additional options
            </div>

            <div className="mb-1 text-xs flex flex-col items-start gap-1 select-none">
                <InFormBlockOptions n_m_ctx={ctx} />
            </div>

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
