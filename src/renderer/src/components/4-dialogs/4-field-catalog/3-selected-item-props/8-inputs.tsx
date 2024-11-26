import { type InputHTMLAttributes } from "react";
import { useAtom, type PrimitiveAtom } from "jotai";
import { type FceCtx } from "@/store";
import { Input, Label, Textarea } from "@/ui/shadcn";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";
import { Column4_Value } from "@/components/2-main/2-right/2-file-mani/1-form-editor/1-normal/1-fields/4-column-value/1-field";

const itemClasses = "text-xs font-normal flex flex-col";

export const inputFocusClasses = "\
\
text-mani-foreground bg-mani-background \
border-mani-border-muted border \
\
outline-none \
ring-mani-ring \
focus:ring-1 \
focus:ring-offset-1 \
focus:ring-offset-mani-background \
focus:ring-mani-ring-activated \
";

const inputFocusClasses2 = "";
const fixTextareaResizeClasses2 = "";
const inputRingClasses2 = "";

type PropTextProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    editAtom: PrimitiveAtom<string>;
};

export function PropText({ label, editAtom, className, ...rest }: PropTextProps) {
    const [text, setText] = useAtom(editAtom);
    return (
        <Label className={itemClasses}>
            {label}
            <Input
                className={classNames("h-7 text-xs rounded", inputFocusClasses2, inputRingClasses, className)}
                {...turnOffAutoComplete}
                value={text} onChange={(e) => setText(e.target.value)}
                {...rest}
            />
        </Label>
    );
}

type PropTextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    editAtom: PrimitiveAtom<string>;
};

export function PropTextarea({ label, editAtom, className, ...rest }: PropTextareaProps) {
    const [text, setText] = useAtom(editAtom);
    return (
        <Label className={itemClasses}>
            {label}
            <Textarea
                className={classNames("min-h-12 text-xs rounded", fixTextareaResizeClasses2, inputFocusClasses, className)}
                value={text} onChange={(e) => setText(e.target.value)}
                {...turnOffAutoComplete}
                {...rest}
            />
        </Label >
    );
}

type PropValueProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    fceCtx: FceCtx;
    parentDisabled?: boolean;
};

export function PropValue({ label, fceCtx, ...rest }: PropValueProps) {
    const { useItAtom, valueLifeAtom } = fceCtx.fcePropAtoms;
    return (
        <Label className={itemClasses}>
            {label}
            <Column4_Value
                useItAtom={useItAtom}
                valueLifeAtom={valueLifeAtom}
                choosevalue=""
                {...rest}
            />
        </Label>
    );
}
