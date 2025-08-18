import { type InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { inputRingClasses } from "@/ui";

export function RowInput({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className={classNames(rowInputClasses, inputRingClasses, className)} {...rest} />
    );
}

const rowInputClasses = "\
px-2 py-1 h-7 \
\
text-mani-foreground bg-mani-background \
\
border-mani-border-muted border \
\
rounded-sm \
outline-hidden";
