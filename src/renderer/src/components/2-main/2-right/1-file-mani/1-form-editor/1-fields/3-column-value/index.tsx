import React, { InputHTMLAttributes } from "react";
import { PrimitiveAtom as PA, useAtom, useAtomValue } from "jotai";
import { ValueAs, ValueLife } from "@/store/manifest";
import { getValueUiState, mapIndexToValueLife } from "./select-uitils";
import { Dropdown, isKeyToClearDefault } from "../6-shared-ui";
import { classNames } from "@/utils";

const inputParentClasses = "\
grid grid-cols-[minmax(0,1fr)_auto] \
\
bg-primary-700 \
\
ring-primary-600 focus-within:ring-offset-primary-800 focus-within:ring-primary-400 \
focus-within:ring-1 focus-within:ring-offset-1 \
rounded overflow-hidden";

const inputClasses = "\
px-2 py-3 h-8 \
!bg-primary-700 !text-primary-200 \
outline-none";

export function Column3_Value({ useItAtom, valueLifeAtom, choosevalue, className, ...rest }: { useItAtom: PA<boolean>; valueLifeAtom: PA<ValueLife>; choosevalue: string | undefined; } & InputHTMLAttributes<HTMLInputElement>) {
    const useIt = useAtomValue(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const {
        dropdownAllItems,
        dropdownSelectedIndex,
        context,
        inputText,
        showAsRef,
        disabled,
        title,
    } = getValueUiState(valueLife, choosevalue);

    const showInputText = !useIt && !valueLife.isRef && !valueLife.value;

    function onSetDropdownIndex(idx: number) {
        setValueLife((v) => mapIndexToValueLife(idx, v, context));
    }

    function onSetText(value: string) {
        setValueLife((v) => ({ ...v, value, isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
    }

    function onSetKey(event: React.KeyboardEvent) {
        showAsRef && isKeyToClearDefault(event.key) &&
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: true, }));
    }

    function onBlur() {
        showAsRef && !inputText &&
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
    }

    return (
        <div className={classNames(inputParentClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            <input
                className={classNames(
                    inputClasses,
                    showAsRef && !valueLife.isNon && "text-[0.6rem] !text-blue-400 cursor-default",
                    disabled && "pointer-events-none",
                )}
                value={showInputText ? '' : inputText}
                onChange={(event) => onSetText(event.target.value)}
                onKeyDown={onSetKey}
                onBlur={onBlur}
                readOnly={disabled}
                disabled={disabled}
                title={title}
                autoComplete="off" list="autocompleteOff" spellCheck={false}
            />

            {!!dropdownAllItems.length &&
                Dropdown(useItAtom, dropdownAllItems, dropdownSelectedIndex, onSetDropdownIndex)
            }
        </div>
    );
}

//Note: Theoretically, two buttons cannot be selected. Only the first one will be pressed, but it depends on the application (submit vs. trigger).
