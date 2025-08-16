import { type ReactNode, type InputHTMLAttributes, HTMLAttributes } from "react";
import { useAtom, type PrimitiveAtom } from "jotai";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input, Textarea } from "@/ui/shadcn";
import { inputRingClasses } from "@/ui";
import { type FceCtx } from "@/store/3-field-catalog-atoms";
import { Column4_Value } from "@/components/2-main/2-right/2-file-mani/1-form-editor/1-normal/1-fields/4-column-value-selector";

const itemClasses = "text-xs font-normal flex flex-col select-none cursor-default";

export function NewLabel({ label, children, className, ...rest }: { label: string; children: ReactNode; } & HTMLAttributes<HTMLDivElement> ) {
    return (
        <div className={classNames(itemClasses, className)} {...rest}>
            {label}
            {children}
        </div>
    );
}

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
    editAtom: PrimitiveAtom<string>;
};

export function PropText({ editAtom, className, ...rest }: PropTextProps) {
    const [text, setText] = useAtom(editAtom);
    return (
        <Input
            className={classNames("h-7 text-xs rounded", inputFocusClasses2, inputRingClasses, className)}
            {...turnOffAutoComplete}
            value={text} onChange={(e) => setText(e.target.value)}
            {...rest}
        />
    );
}

type PropTextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
    editAtom: PrimitiveAtom<string>;
};

export function PropTextarea({ editAtom, className, ...rest }: PropTextareaProps) {
    const [text, setText] = useAtom(editAtom);
    return (
        <Textarea
            className={classNames("min-h-12 text-xs rounded", fixTextareaResizeClasses2, inputFocusClasses, className)}
            value={text} onChange={(e) => setText(e.target.value)}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

type PropValueProps = InputHTMLAttributes<HTMLInputElement> & {
    fceCtx: FceCtx;
    parentDisabled?: boolean;
};

export function PropValue({ fceCtx, ...rest }: PropValueProps) {
    const { useItAtom, valueLifeAtom } = fceCtx.fcePropAtoms;
    return (
        <Column4_Value
            useItAtom={useItAtom}
            valueLifeAtom={valueLifeAtom}
            choosevalue=""
            {...rest}
        />
    );
}
