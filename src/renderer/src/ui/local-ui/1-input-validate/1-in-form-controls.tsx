import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type Variants, AnimatePresence, motion } from "motion/react";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString, OptionAsTextarea } from "@/ui/local-ui";

export function InFormRowInputWTitle({ label, containerClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <div className={classNames("col-span-2 py-1 text-xs grid gap-0.5", containerClasses)}>
            <div className="font-light">
                {label}
            </div>

            <InputOrCheckWithErrorMsg {...rest} />
        </div>
    );
}

export function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, asTextarea, children, className, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    const errorClasses = classNames(hasError && 'outline-offset-[0px] outline-red-500', className);
    return (<>
        {children
            ? children
            : (<>
                {asCheckbox
                    ? <OptionAsCheckbox stateAtom={stateAtom} className={errorClasses} {...rest} />
                    : asTextarea
                        ? <OptionAsTextarea stateAtom={stateAtom} className={errorClasses} {...rest} />
                        : <OptionAsString stateAtom={stateAtom} className={errorClasses} {...rest} />
                }
            </>)}

        <InputErrorPopupMessage hasError={!!hasError} error={state.error} />
    </>);
}

export function InputErrorPopupMessage({ hasError, error }: { hasError: boolean | undefined | ''; error: string | undefined; }) {
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
