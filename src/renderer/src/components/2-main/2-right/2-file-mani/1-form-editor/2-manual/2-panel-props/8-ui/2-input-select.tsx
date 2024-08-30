import { InputHTMLAttributes } from "react";
import { ModifierDisplayText } from "@/store/manifest";
import { InputSelectUi, StringValueChangeProps } from "./3-input-select-ui";
import { classNames } from "@/utils";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & StringValueChangeProps & {
    label: string;
    labelClasses?: string;
    horizontal?: boolean;
    
    items: ModifierDisplayText[];
};

export function InputSelect({ items, label, labelClasses, title, horizontal = false, className, ...rest }: InputSelectProps) {
    return (
        <div className={classNames("flex", horizontal ? "items-center space-x-2" : "flex-col space-y-1", className)} title={title}>
            <div className={classNames("text-xs", labelClasses)}>
                {label}
            </div>

            <InputSelectUi items={items} {...rest} />
        </div>
    );
}
