import { type ComponentPropsWithoutRef } from "react";
import { classNames, useAtomEffect } from "@/utils";
import { type MFormProps, guardedFormIdx } from "@/store/2-file-mani-atoms";
import { ManualPanelActions } from "../1-panel-actions";
import { ManualPanelProps } from "../2-panel-props";
import { isManualManifestNew } from "../../0-all";
import { InFormBlockOptions } from "../../../2-form-options";
import { loginChangesEffectFn } from "./2-login-changes-effect";
import { usePrintFormFields } from "./8-use-print-form-fields";

export function ManualModeView({ mFormProps, className, ...rest }: { mFormProps: MFormProps; } & ComponentPropsWithoutRef<'div'>) {
    useAtomEffect(
        loginChangesEffectFn({ mFormProps })
    );
    usePrintFormFields({ maniAtoms: mFormProps.maniAtoms, formIdx: guardedFormIdx(mFormProps) });

    return (<>
        <div className={classNames(manualModeViewClasses, isManualManifestNew(mFormProps) ? "@[600px]:gap-y-4" : "h-full", className)} {...rest}>
            <ManualPanelActions className="[grid-area:actions] @container/actions" mFormProps={mFormProps} />
            <ManualPanelProps className="[grid-area:props] @container/props min-h-37.5 text-xs" mFormProps={mFormProps} />
            <div className="[grid-area:options]">
                <div className="font-semibold select-none">
                    Additional options
                </div>
                <div className="mb-1 text-xs flex flex-col items-start gap-1 select-none">
                    <InFormBlockOptions anyFormProps={mFormProps} />
                </div>
            </div>
        </div>
    </>);
}

const manualModeViewClasses = "\
min-w-60 min-h-0 \
grid \
grid-rows-[1fr_auto_auto] \
[grid-template-areas:'actions''props''options'] @[600px]:[grid-template-areas:'actions_props''options_options'] \
gap-x-1 \
gap-y-2 \
";

//TODO: check focus-within when added new item from the empty list

//TODO: remove frame; leave only line inbetween
//TODO: scroll panels independently - done
//TDOO: header is not part of the scroll - done
