import { type InputHTMLAttributes } from "react";
import { classNames } from "@/utils";

export const inputFocusClasses = "focus:outline-none focus:ring-1 focus:ring-primary-400  focus:ring-offset-1 focus:ring-offset-primary-800";

export function Input({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={classNames("px-2 py-1.5 w-full text-primary-300 bg-primary-700 rounded", inputFocusClasses, className)}
            {...rest}
        />
    );
}
