import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { focusClasses } from "../../8-manual-shared-styles";

const inputTextClasses = "\
px-2 py-1 \
bg-primary-100 dark:bg-primary-700/50 \
border-primary-400 border dark:border-none \
rounded";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    labelClasses?: string;
    horizontal?: boolean;
};

export function InputField({ label, labelClasses, horizontal, className, ...rest }: InputFieldProps) {
    return (
        <label className={classNames("flex", horizontal ? "items-center space-x-2" : "flex-col space-y-1")}>
            <div className={classNames("text-xs", labelClasses)}>
                {label}
            </div>

            <input className={classNames(inputTextClasses, focusClasses, className)} {...rest} />
        </label>
    );
}
