import { InputHTMLAttributes } from "react";
import { useAtom } from "jotai";
import { RowInputStateAtom } from "./9-types";
import { classNames } from "@/utils";

type OptionCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
    onValueChange?: () => void;
};

export function OptionCheckbox({ stateAtom, className, onValueChange, ...rest }: OptionCheckboxProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.checked ? '1' : '';
        setState((prev) => {
            return {
                ...prev,
                data: value,
                dirty: state.initialData !== value,
            };
        });
        onValueChange?.();
    }

    function onBlur() {
        setState((prev) => {
            return {
                ...prev,
                touched: true,
                dirty: state.initialData !== prev.data,
            };
        });
        onValueChange?.();
    }

    return (
        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={state.data === '1'}
            onChange={onChange}
            onBlur={onBlur}
            {...rest} />
    );
}
