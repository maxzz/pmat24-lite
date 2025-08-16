import { type InputHTMLAttributes } from "react";
import { type PrimitiveAtom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { doHighlightControlAtom } from "@/store/7-napi-atoms";
import { type FieldHighlightCtx } from "@/store/2-file-mani-atoms";

type Column3_LabelProps = InputHTMLAttributes<HTMLInputElement> & {
    useItAtom: PrimitiveAtom<boolean>;
    valueAtom: PrimitiveAtom<string>;
    highlightCtx?: FieldHighlightCtx;
};

export function Column3_Label({ useItAtom, valueAtom, highlightCtx, className, ...rest }: Column3_LabelProps) {
    const [value, setValue] = useAtom(valueAtom);
    const useIt = useAtomValue(useItAtom);
    
    const doHighlightRect = useSetAtom(doHighlightControlAtom);

    function onFocusBlur(focusOrBlur: boolean) {
        if (highlightCtx) {
            doHighlightRect({ ...highlightCtx, focusOrBlur });
        }
    }

    return (
        <input
            className={classNames(Column3_LabelClasses, !useIt && "opacity-30 cursor-pointer", className)}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => onFocusBlur(true)}
            onBlur={() => onFocusBlur(false)}
            title={useIt ? "This is a label that appears next to an input field." : undefined}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

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
outline-none \
rounded \
";

//TODO: add default text 'Give me a name' or 'No name, give me one';
