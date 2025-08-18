import { type ChangeEvent, type FocusEvent } from "react";
import { useAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";
import { type OptionInputProps, type RowInputState } from "./9-types";

export function OptionAsTextarea({ stateAtom, className, onValueStateChange, onBlur, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: ChangeEvent<HTMLTextAreaElement>) {
        setState(
            (prev) => {
                const value = e.target.value;
                const rv: RowInputState = {
                    ...prev,
                    data: value,
                    error: prev.validate?.(value),
                    dirty: prev.initialData !== value,
                };
                return rv;
            }
        );
        onValueStateChange?.();
    }

    function onLocalBlur(e: FocusEvent<HTMLTextAreaElement>) {
        setState(
            (prev) => {
                const rv: RowInputState = {
                    ...prev,
                    touched: true,
                    error: prev.validate?.(prev.data),
                    dirty: prev.initialData !== prev.data,
                };
                return rv;
            }
        );
        onBlur?.(e);
    }

    return (
        <textarea
            className={classNames(optionInputClasses, inputRingClasses /*, value.error && "ring-1 ring-red-500/70"*/, className)}
            style={{ 'fieldSizing': 'content' } as React.CSSProperties}
            value={state.data}
            onChange={onChange}
            onBlur={onLocalBlur}
            {...state.error && { 'aria-invalid': true }}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

export const optionInputClasses = "\
px-2 py-1 min-h-7 w-full resize-none \
\
text-mani-foreground font-normal bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-hidden";
