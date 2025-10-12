import { type ComponentPropsWithoutRef } from "react";
import { classNames, useAtomEffect } from "@/utils";
import { type MFormProps } from "@/store/2-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";
import { isManualManifestNew } from "../../0-all";
import { InFormBlockOptions } from "../../../2-form-options";
import { loginChangesEffectFn } from "./2-login-changes-effect";
//import { usePrintFormFields } from "./8-use-print-form-fields";

export function ManualModeView({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & ComponentPropsWithoutRef<'div'>) {
    useAtomEffect(
        loginChangesEffectFn({ mFormProps })
    );
    //usePrintFormFields({ maniAtoms: mFormProps.maniAtoms, formIdx: guardedFormIdx(mFormProps) });

    return (<>
        <div className={classNames(manualModeViewClasses, isManualManifestNew(mFormProps) ? "@[600px]:gap-y-4" : "h-full", className)} {...rest}>
            <ManualPanelActions className="@container/actions" mFormProps={mFormProps} />
            <ManualPanelProps className="@container/props min-h-[180px] text-xs" mFormProps={mFormProps} />
        </div>
        <div className="">
            <div className="font-semibold select-none">
                Additional options
            </div>
            <div className="mb-1 text-xs flex flex-col items-start gap-1 select-none">
                <InFormBlockOptions anyFormProps={mFormProps} />
            </div>
        </div>
    </>);
}

const manualModeViewClasses = "\
min-w-60 min-h-0 \
\
grid \
grid-cols-1 \
grid-rows-[minmax(100px_1fr),auto,auto] \
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
