import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type Variants, AnimatePresence, motion } from "motion/react";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString, OptionAsTextarea } from "@/ui/local-ui";

export function InFormRowInputWTitle({ label, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <div className="col-span-2 py-1 text-xs grid gap-0.5">
            <div className="font-light">
                {label}
            </div>

            <InputOrCheckWithErrorMsg {...rest} />
        </div>
    );
}

function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, asTextarea, className, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    const errorClasses = classNames(hasError && 'outline-offset-[0px] outline-red-500', className);
    return (<>
        {asCheckbox
            ? <OptionAsCheckbox stateAtom={stateAtom} className={errorClasses} {...rest} />
            : asTextarea
                ? <OptionAsTextarea stateAtom={stateAtom} className={errorClasses} {...rest} />
                : <OptionAsString stateAtom={stateAtom} className={errorClasses} {...rest} />
        }

        <InputErrorPopupMessage hasError={!!hasError} error={state.error} />
    </>);
}

export function InputErrorPopupMessage({ hasError, error }: { hasError: boolean; error: string | undefined; }) {
    return (
        <AnimatePresence initial={false}>
            {hasError && (
                <motion.div className="text-[0.65rem] text-red-500" variants={variants} initial='collapsed' animate='expanded' exit='collapsed'>
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const variants: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
};
