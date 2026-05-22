import { type FocusEvent, type FocusEventHandler, type MouseEventHandler } from "react";
import { useAtom } from "jotai";
import { classNames } from "@/utils";
import { type OptionInputProps } from "./9-types";
import { Switch } from "@/ui/shadcn";

const defaultSwitchClasses = "data-[state=checked]:bg-primary/20 dark:data-[state=checked]:bg-primary/40";

export function OptionAsSwitch({ stateAtom, className, onValueStateChange, onBlur, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onCheckedChange(checked: boolean) {
        const value = checked ? '1' : '';
        setState(
            (prev) => {
                const rv = {
                    ...prev,
                    data: value,
                    dirty: state.initialData !== value,
                };
                return rv;
            }
        );
        onValueStateChange?.();
    }

    function onLocalBlur(e: FocusEvent<HTMLButtonElement>) {
        setState(
            (prev) => {
                const rv = {
                    ...prev,
                    touched: true,
                    dirty: state.initialData !== prev.data,
                };
                return rv;
            }
        );
        onValueStateChange?.();
        onBlur?.(e as unknown as FocusEvent<HTMLInputElement>);
    }

    const { onFocus, onClick, readOnly, disabled, ...switchRest } = rest;

    return (
        <Switch
            className={classNames(defaultSwitchClasses, className)}
            checked={state.data === '1'}
            onCheckedChange={onCheckedChange}
            onBlur={onLocalBlur}
            onFocus={onFocus as unknown as FocusEventHandler<HTMLButtonElement>}
            onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
            disabled={disabled || readOnly}
            {...switchRest}
        />
    );
}
