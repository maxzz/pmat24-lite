import { type ChangeEvent, type FocusEvent } from "react";
import { useAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";
import { type OptionInputProps, type RowInputState } from "./9-types";

export function OptionAsString({ stateAtom, className, onValueStateChange, onBlur, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
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

    function onLocalBlur(e: FocusEvent<HTMLInputElement>) {
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
        <input
            className={classNames(optionInputClasses, inputRingClasses /*, value.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onLocalBlur}
            {...state.error && { 'aria-invalid': true }}
            {...turnOffAutoComplete}
            {...rest}
        // type="number" min={0} max={99999} step={1}
        />
    );
}

const optionInputClasses = "\
px-2 py-1 h-7 w-full \
\
text-mani-foreground font-normal bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-hidden";
