import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { type OptionTextValue } from "@/store/manifest";
import { InputSelectUi, StringValueChangeProps } from "./4-input-select-ui";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & StringValueChangeProps & {
    label: string;
    labelClasses?: string;
    horizontal?: boolean;
    triggerClasses?: string;
    
    items: OptionTextValue[];
};

export function InputSelect({ items, label, labelClasses, title, horizontal = false, ...rest }: InputSelectProps) {
    return (
        <div className={classNames("flex", horizontal ? "items-center gap-x-2" : "flex-col gap-y-0.5")} title={title}>
            <div className={classNames("text-xs", labelClasses)}>
                {label}
            </div>

            <InputSelectUi items={items} {...rest} />
        </div>
    );
}
