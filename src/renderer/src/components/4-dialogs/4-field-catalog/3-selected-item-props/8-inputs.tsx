import { type InputHTMLAttributes } from "react";
import { fixTextareaResizeClasses, Input, Label, Textarea, TextareaAutoGrow } from "@/ui/shadcn";
import { classNames, turnOffAutoComplete } from "@/utils";
import { inputRingClasses } from "@/ui";
import { type FceCtx } from "@/store";
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

export function PropInput({ label, className, ...rest }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Label className={itemClasses}>
            {label}
            <Input
                className={classNames("h-7 text-xs", inputFocusClasses2, inputRingClasses, className)}
                {...turnOffAutoComplete}
                {...rest}
            />
        </Label>
    );
}

export function PropTextarea({ label, className, ...rest }: { label: string; } & InputHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <Label className={itemClasses}>
            {label}
            {/* <TextareaAutoGrow */}
            <Textarea
                className={classNames("min-h-[162px] text-xs", fixTextareaResizeClasses2, inputFocusClasses)}
                // containerPaddingFont="text-xs"
                // rows={1}
                {...turnOffAutoComplete}
                {...rest}
            />
        </Label >
    );
}

export function PropInputValue({ label, fceCtx, className, ...rest }: { label: string; fceCtx: FceCtx;} & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Label className={itemClasses}>
            {label}
            <Column4_Value
                useItAtom={fceCtx.fcePropAtoms.useItAtom}
                valueLifeAtom={fceCtx.fcePropAtoms.valueLifeAtom}
                choosevalue=""
                {...rest}
            />

            {/* <Input
                className={classNames("h-7 text-xs", inputFocusClasses2, inputRingClasses, className)}
                {...turnOffAutoComplete}
                {...rest}
            /> */}
        </Label>
    );
}
