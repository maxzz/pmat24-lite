import { type ReactNode } from "react";
import { useAtomValue } from "jotai";
import { classNames } from "@/utils";
import { type Variants, AnimatePresence, motion } from "motion/react";
import { type OptionInputWTypeProps, OptionAsCheckbox, OptionAsString, OptionAsTextarea } from "@/ui/local-ui";

export function InputWithTitle2Rows({ label, containerClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} className={classNames(children2RowsClasses, containerClasses)} labelClasses={label2RowsClasses}>
            <InputOrCheckWithErrorMsg {...rest} />
        </FormRowChildren>
    );
}

export function InputWithTitle2Cols({ label, containerClasses, ...rest }: { label: string; } & OptionInputWTypeProps) {
    return (
        <FormRowChildren label={label} className={classNames(children2ColsClasses, containerClasses)} labelClasses={label2ColsClasses}>
            <InputOrCheckWithErrorMsg {...rest} />
        </FormRowChildren>
    );
}

export function ChildrenWithLabel2Cols({ label, children, containerClasses }: { label: string; children: ReactNode; containerClasses?: string; }) {
    return (
        <FormRowChildren label={label} className={classNames(children2ColsClasses, containerClasses)} labelClasses={label2ColsClasses}>
            {children}
        </FormRowChildren>
    );
}

// Row input with error message

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

// Row with children

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
