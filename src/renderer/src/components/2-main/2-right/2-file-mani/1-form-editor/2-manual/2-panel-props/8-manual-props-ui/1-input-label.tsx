import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";

export type InputLabelProps = InputHTMLAttributes<HTMLLabelElement> & {
    label: string;
    labelClasses?: string;
    horizontal?: boolean;
};

export function InputLabel({ label, labelClasses, horizontal, className, children, ...rest }: InputLabelProps) {
    return (
        <label className={classNames("flex", horizontal ? "items-center space-x-2" : "flex-col space-y-1")} {...rest}>
            <div className={classNames("text-xs", labelClasses)}>
                {label}
            </div>

            {children}
        </label>
    );
}
