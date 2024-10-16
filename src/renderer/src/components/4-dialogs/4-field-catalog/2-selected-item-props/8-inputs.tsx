import { type InputHTMLAttributes } from "react";
import { Input, TextareaAutoGrow } from "@/ui/shadcn";
import { classNames, turnOffAutoComplete } from "@/utils";

export const inputFocusClasses = "\
focus:outline-none \
focus:ring-1 \
focus:ring-offset-1 \
\
focus:ring-primary-400 \
focus:ring-offset-primary-800 \
";

export function PropInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Input
            className={classNames("", inputFocusClasses, className)}
            {...turnOffAutoComplete}
            {...rest}
        />
    );
}

export function PropTextarea({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <TextareaAutoGrow
            className="w-full text-xs min-h-0"
            containerPaddingFont="text-xs"
            {...turnOffAutoComplete}
            rows={1}
        />
    );
}
