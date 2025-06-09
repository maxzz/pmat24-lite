import { classNames } from "@/utils";
import { InputLabel, type InputLabelProps } from "./1-input-label";
import { focusClasses } from "../../../8-manual-shared-styles";

const inputTextClasses = "\
px-2 py-1 \
bg-primary-100 dark:bg-primary-700/50 \
border-primary-400 border dark:border-none \
rounded";

export function InputField({ label, labelClasses, horizontal, className, ...rest }: InputLabelProps) {
    return (
        <InputLabel label={label} labelClasses={labelClasses} horizontal={horizontal} {...rest}>
            <input className={classNames(inputTextClasses, focusClasses, className)} />
        </InputLabel>
    );
}
