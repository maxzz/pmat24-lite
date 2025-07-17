import { type ComponentPropsWithoutRef, useMemo } from "react";
import { type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { type ValueLife, ValueAs } from "@/store/manifest";
import { getValueUiState, mapIndexToValueLife } from "./3-select-uitils";
import { DropdownValue } from "./2-dropdown-value";
import { inputRingClasses } from "@/ui/local-ui";
import { isKeyToClearDefault } from "../6-fields-shared-ui";
import { doHighlightControlAtom } from "@/store/7-napi-atoms";
import { type FieldHighlightCtx } from "@/store/1-atoms/2-file-mani-atoms";

type Column4_ValueProps = ComponentPropsWithoutRef<'input'> & {
    useItAtom: PrimitiveAtom<boolean>;
    valueLifeAtom: PrimitiveAtom<ValueLife>;
    choosevalue: string | undefined;
    parentDisabled?: boolean; // Container is disabled vs. input is disabled
    highlightCtx?: FieldHighlightCtx;
};

export function Column4_Value({ useItAtom, valueLifeAtom, choosevalue, parentDisabled, className, highlightCtx, ...rest }: Column4_ValueProps) {
    const doHighlightRect = useSetAtom(doHighlightControlAtom);

    const useIt = useAtomValue(useItAtom);
    const [valueLife, setValueLife] = useAtom(valueLifeAtom);

    const uiState = useMemo(() => getValueUiState(valueLife, choosevalue), [Object.values(valueLife), choosevalue]);
    const { dropdownAllItems, dropdownSelectedIndex, context, inputText, showAsRef, disabled: itselfDisabled, title, } = uiState;

    const showInputText = !useIt && !valueLife.isRef && !valueLife.value;
    const showAsRefAndNotNon = showAsRef && !valueLife.isNon;
    const disabled = parentDisabled || itselfDisabled;

    function onFocusBlur(focusOn: boolean) {
        if (highlightCtx) {
            doHighlightRect({ ...highlightCtx, focusOrBlur: focusOn });
        }
    }

    return (
        <div className={classNames(inputParentClasses, inputRingClasses, !useIt && "opacity-30 cursor-pointer", className)}>
            <input
                className={classNames(inputClasses, showAsRefAndNotNon && inputAsRefClasses, disabled && "pointer-events-none")}
                value={showInputText ? '' : inputText}
                onChange={(event) => onSetText(event.target.value)}
                onKeyDown={onSetKey}
                onFocus={() => onFocusBlur(true)}
                onBlur={onBlurLocal}
                readOnly={disabled}
                disabled={disabled}
                title={title}
                {...turnOffAutoComplete}
                {...rest}
            />

            {dropdownAllItems.length && !disabled && (
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

    function onBlurLocal() {
        showAsRef && !inputText &&
            setValueLife((v) => ({ ...v, value: '', isRef: false, valueAs: ValueAs.askReuse, isNon: false, }));
        onFocusBlur(false);
    }
}

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
truncate outline-none";

const inputAsRefClasses = "text-[0.6rem] !text-blue-400 cursor-default";
