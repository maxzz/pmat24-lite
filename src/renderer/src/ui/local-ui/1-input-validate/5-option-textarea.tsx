import { useAtom } from "jotai";
import { type OptionInputProps, type RowInputState } from "./9-types";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";

export function OptionAsTextarea({ stateAtom, className, onValueStateChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setState(
            (prev) => {
                const value = e.target.value;
                const rv: RowInputState = {
                    ...prev,
                    data: value,
                    error: prev.validate?.(value),
                    dirty: prev.initialData !== value,
                };
                onValueStateChange?.(rv);
                return rv;
            }
        );
    }

    function onBlur() {
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
    }

    return (
        <textarea
            className={classNames(optionInputClasses, inputRingClasses /*, value.error && "ring-1 ring-red-500/70"*/, className)}
            value={state.data}
            onChange={onChange}
            onBlur={onBlur}
            {...state.error && { 'aria-invalid': true }}
            {...turnOffAutoComplete}
            {...rest}
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
outline-none";
