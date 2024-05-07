import { InputHTMLAttributes } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { inputRingClasses } from "@/ui";
import { RowInputStateAtom } from "@/store/atoms/3-file-mani-atoms/4-options";

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
};

export function OptionInput({ stateAtom, className, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setState((v) => ({ ...v, data: value, error: state.validate?.(value), dirty: state.initialData !== value }));
    }

    function onBlur() {
        setState((v) => ({ ...v, touched: true, error: state.validate?.(state.data), dirty: state.initialData !== state.data }));
    }

    return (
        <input
            className={classNames(optionInputClasses, inputRingClasses /*, vakue.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...rest} />
    );
}
