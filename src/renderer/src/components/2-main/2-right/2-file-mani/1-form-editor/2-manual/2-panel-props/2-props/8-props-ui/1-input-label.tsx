import { type InputHTMLAttributes } from "react";
import { classNames } from "@/utils";

export type InputLabelProps =
    InputHTMLAttributes<HTMLLabelElement>
    & {
        label: string;
        className?: string;
        labelClasses?: string;
        horizontal?: boolean;
    };

export function InputLabel({ label, className, labelClasses, horizontal, children, ...rest }: InputLabelProps) {
    return (
        <label className={classNames("flex", horizontal ? "items-center space-x-2" : "flex-col gap-y-0.5", className)} {...rest}>
            <div className={classNames("text-xs", labelClasses)}>
                {label}
            </div>

            {children}
        </label>
    );
}
