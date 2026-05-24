import { type InputHTMLAttributes, useRef } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, turnOffAutoComplete, useClickAway } from "@/utils";
import { doHighlightControlAtom } from "@/store/7-napi-atoms";
import { type FieldHighlightCtx } from "@/store/2-file-mani-atoms";
import { FieldTyp } from "@/store/8-manifest";

type Column3_LabelProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PA<boolean>;
    valueAtom: PA<string>;
    typeAtom: PA<FieldTyp>;
    highlightCtx?: FieldHighlightCtx;
};

export function Column3_Label({ useItAtom, valueAtom, typeAtom, highlightCtx, className, ...rest }: Column3_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const useIt = useAtomValue(useItAtom);
    const isTypeTxt = useAtomValue(typeAtom) === FieldTyp.text;
    const inputRef = useRef<HTMLInputElement>(null);

    const doHighlightRect = useSetAtom(doHighlightControlAtom);

    useClickAway(inputRef, () => {
        const input = inputRef.current;
        if (input && document.activeElement === input) {
            input.blur();
        }
    }, ['pointerdown']);

    function onFocusBlur(focusOrBlur: boolean) {
        if (highlightCtx) {
            doHighlightRect({ ...highlightCtx, focusOrBlur });
        }
    }

    return (
        <input
            ref={inputRef}
            className={classNames(Column3_LabelClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => onFocusBlur(true)}
            onBlur={() => onFocusBlur(false)}
            readOnly={isTypeTxt}
            title={useIt ? isTypeTxt ? textFieldTitle : labelTitle : undefined}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

const textFieldTitle = `This is a text field used to specify additional content for the matching window.
If the field is used but left empty, the original label value will be used.
The field value can be specified either as an exact string match or using a regular expression.
For example, "User John Doe" will match the following regular expression: "[U|u]ser.*".`;
const labelTitle = "This is a label that appears next to an input field.";

const Column3_LabelClasses = "\
px-2 py-3 h-7 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
ring-mani-ring \
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-mani-background \
focus:ring-mani-ring-activated \
\
truncate \
outline-hidden \
rounded \
";

//TODO: add default text 'Give me a name' or 'No name, give me one';
