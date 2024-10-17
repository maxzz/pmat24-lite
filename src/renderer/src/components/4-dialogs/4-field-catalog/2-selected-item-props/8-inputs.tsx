import { type InputHTMLAttributes } from "react";
import { Input, Label, TextareaAutoGrow } from "@/ui/shadcn";
import { classNames, turnOffAutoComplete } from "@/utils";

const itemClasses = "text-xs flex flex-col";

export const inputFocusClasses = "\
focus:outline-none \
focus:ring-1 \
focus:ring-offset-1 \
\
focus:ring-primary-400 \
focus:ring-offset-primary-800 \
";

export function PropInput({ label, className, ...rest }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Label className={itemClasses}>
            {label}
            <Input
                className={classNames("h-7", inputFocusClasses, className)}
                {...turnOffAutoComplete}
                {...rest}
            />
        </Label>
    );
}

export function PropTextarea({ label, className, ...rest }: { label: string; } & InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Label className={itemClasses}>
            {label}
            <TextareaAutoGrow
                className="w-full text-xs min-h-0"
                containerPaddingFont="text-xs"
                {...turnOffAutoComplete}
                rows={1}
            />
        </Label >
    );
}
