import { type InputHTMLAttributes } from "react";
import { classNames, turnOffAutoComplete } from "@/utils";
import { Input } from "@/ui/shadcn";

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
        <textarea
            className="p-1 w-full min-h-[3rem] text-[.65rem] leading-3 bg-primary-700 rounded"
            rows={3}
            {...turnOffAutoComplete}
        />
    );
}
