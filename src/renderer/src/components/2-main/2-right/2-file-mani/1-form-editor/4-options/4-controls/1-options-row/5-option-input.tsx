import { InputHTMLAttributes } from "react";
import { useAtom } from "jotai";
import { RowInputState, RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";

const optionInputClasses = "\
px-2 py-1 h-7 w-full \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-none";

type OptionInputProps = InputHTMLAttributes<HTMLInputElement> & {
    stateAtom: RowInputStateAtom;
    onValueChange?: () => void;
};

export function OptionInput({ stateAtom, className, onValueChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        setState((prev) => {
            const value = e.target.value;
            const newState: RowInputState = {
                ...prev,
                data: value,
                error: prev.validate?.(value),
                dirty: prev.initialData !== value,
            };
            return newState;
        });
        onValueChange?.();
    }

    function onBlur() {
        setState((prev) => {
            const newState: RowInputState = {
                ...prev,
                touched: true,
                error: prev.validate?.(prev.data),
                dirty: prev.initialData !== prev.data,
            };
            return newState;
        });
    }

    return (
        <input
            className={classNames(optionInputClasses, inputRingClasses /*, vakue.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...turnOffAutoComplete}
            {...rest} />
    );
}
