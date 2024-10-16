import { type InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
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
            {...rest}
        />
    );
}
