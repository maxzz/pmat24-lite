import { type ChangeEvent, type FocusEvent } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { type OptionInputProps } from "./9-types";

export function OptionAsCheckbox({ stateAtom, className, onValueStateChange, onBlur, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const value = e.target.checked ? '1' : '';
        setState(
            (prev) => {
                const rv = {
                    ...prev,
                    data: value,
                    dirty: state.initialData !== value,
                };
                onValueStateChange?.(rv);
                return rv;
            }
        );
    }

    function onLocalBlur(e: FocusEvent<HTMLInputElement>) {
        setState(
            (prev) => {
                const rv = {
                    ...prev,
                    touched: true,
                    dirty: state.initialData !== prev.data,
                };
                onValueStateChange?.(rv);
                return rv;
            }
        );
        onBlur?.(e);
    }

    return (
        <input
            className={classNames("size-4 dark-checkbox", className)}
            type="checkbox"
            checked={state.data === '1'}
            onChange={onChange}
            onBlur={onLocalBlur}
            {...rest}
        />
    );
}
