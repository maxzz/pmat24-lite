import { InputHTMLAttributes } from "react";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { ValueAs, ValueLife } from "@/store/manifest";
import { getValueUiState, mapIndexToValueLife } from "./select-uitils";
import { DropdownValue } from "./2-value-dropdown";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";

const inputParentClasses = "\
h-7 grid grid-cols-[minmax(0,1fr)_auto] \
\
bg-mani-background \
\
border-mani-border-muted border \
\
rounded overflow-hidden";

const inputClasses = "\
px-2 py-3 h-7 \
bg-mani-background text-mani-foreground \
outline-none";

type Column4_ValueProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    valueLifeAtom: PrimitiveAtom<ValueLife>;
    choosevalue: string | undefined;
    parentDisabled?: boolean; // Container is disabled vs. input is disabled
};

export function Column4_Value({ useItAtom, valueLifeAtom, choosevalue, parentDisabled, className, ...rest }: Column4_ValueProps) {

    const useIt = useAtomValue(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const {
        dropdownAllItems,
        dropdownSelectedIndex,
        context,
        inputText,
        showAsRef,
        disabled: disabledItself,
        title,
    } = getValueUiState(valueLife, choosevalue);

    const showInputText = !useIt && !valueLife.isRef && !valueLife.value;
    const disabled = parentDisabled || disabledItself;

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)} {...rest}>
            
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
                {...turnOffAutoComplete}
            />

            {!!dropdownAllItems.length && !disabled && (
                <DropdownValue useItAtom={useItAtom} items={dropdownAllItems} selectedIndex={dropdownSelectedIndex} onSetIndex={onSetDropdownIndex} />
            )}
        </div>
    );

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

}

//NOTE: Theoretically, two buttons cannot be selected. Only the first one will be pressed, but it depends on the application (submit vs. trigger).
