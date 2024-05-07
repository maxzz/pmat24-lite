import { InputHTMLAttributes } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";

type OptionCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
};

export function OptionCheckbox({ stateAtom, className, ...rest }: OptionCheckboxProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.checked ? '1' : '';
        setState((v) => ({ ...v, data: value, dirty: state.initialData !== value }));
    }

    function onBlur() {
        setState((v) => ({ ...v, touched: true, dirty: state.initialData !== v.data }));
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
