import { useAtom } from "jotai";
import { type OptionInputProps } from "./9-types";
import { classNames } from "@/utils";

export function OptionCheckbox({ stateAtom, className, onValueStateChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    function onBlur() {
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
    }

    return (
        <input
            className={classNames("place-self-center size-4 dark-checkbox", className)}
            type="checkbox"
            checked={state.data === '1'}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
        />
    );
}
