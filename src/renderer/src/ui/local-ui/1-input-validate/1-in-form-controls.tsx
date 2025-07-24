import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type Variants, AnimatePresence, motion } from "motion/react";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString, OptionAsTextarea } from "@/ui/local-ui";

export function ChildrenWithLabel2Cols({ label, children, containerClasses }: { label: string; children: ReactNode; containerClasses?: string; }) {
    return (
        <FormRowChildren label={label} className={classNames(children2ColsClasses, containerClasses)} labelClasses={label2ColsClasses}>
            {children}
        </FormRowChildren>
    );
}

export function InputWithTitle2Cols({ label, containerClasses, labelClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} className={classNames(children2ColsClasses, containerClasses)} labelClasses={classNames(label2ColsClasses, labelClasses)}>
            <InputOrCheckWithErrorMsg {...rest} />
        </FormRowChildren>
    );
}

export function InputWithTitle2Rows({ label, containerClasses, labelClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} className={classNames(children2RowsClasses, containerClasses)} labelClasses={classNames(label2RowsClasses, labelClasses)}>
            <InputOrCheckWithErrorMsg twoRows {...rest} />
        </FormRowChildren>
    );
}

// Row input with error message

export function InputOrCheckWithErrorMsg({ stateAtom, asCheckbox, asTextarea, className, twoRows, ...rest }: OptionInputWTypeProps) {
    const state = useAtomValue(stateAtom);
    const hasError = state.error && state.touched;
    const errorInputClasses = classNames(hasError && 'outline-offset-[0px] outline-red-500', className);
    return (<>
        {asCheckbox
            ? <OptionAsCheckbox stateAtom={stateAtom} className={errorInputClasses} {...rest} />
            : asTextarea
                ? <OptionAsTextarea stateAtom={stateAtom} className={errorInputClasses} {...rest} />
                : <OptionAsString stateAtom={stateAtom} className={errorInputClasses} {...rest} />
        }

        <InputErrorPopupMessage hasError={!!hasError} error={state.error} errorClasses={twoRows ? '' : "col-start-2"} />
    </>);
}

export function InputErrorPopupMessage({ hasError, error, errorClasses }: { hasError: boolean | undefined | ''; error: string | undefined; errorClasses?: string; }) {
    return (
        <InputPopupMessage show={hasError} message={error} messageClasses={classNames("text-[0.65rem] text-red-500", errorClasses)} />
    );
}

export function InputPopupMessage({ show, message, messageClasses }: { show: boolean | undefined | ''; message: ReactNode; messageClasses?: string; }) {
    return (
        <AnimatePresence initial={false}>
            {show && (
                <motion.div className={messageClasses} variants={variants} initial='collapsed' animate='expanded' exit='collapsed'>
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const variants: Variants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: 0, opacity: 0 },
};

// Row with children simle DOM layout

export function FormRowChildren({ label, children, className, labelClasses }: { label: string; children: ReactNode; className?: string; labelClasses?: string; }) {
    return (
        <div className={className}>
            <div className={labelClasses}>
                {label}
            </div>

            {children}
        </div>
    );
}

const children2RowsClasses = "col-span-2 py-1 text-xs grid gap-0.5";
const label2RowsClasses = "font-light";

const children2ColsClasses = "col-span-2 py-1 pr-0.5 text-xs grid grid-cols-subgrid items-center";
const label2ColsClasses = "font-light text-end";

export const SubSubGridClasses = "col-span-2 grid grid-cols-subgrid";
