import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import { type OptionTextValue } from "@/store/manifest";
import { InputSelectUi, StringValueChangeProps } from "./4-input-select-ui";
import { InputLabel } from "./1-input-label";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & StringValueChangeProps & {
    label: string;
    labelClasses?: string;
    horizontal?: boolean;
    triggerClasses?: string;
    
    items: OptionTextValue[];
};

export function InputSelect({ items, label, labelClasses, title, horizontal, ...rest }: InputSelectProps) {
    return (
        <InputLabel label={label} labelClasses={labelClasses} horizontal={horizontal} title={title}>
            <InputSelectUi items={items} {...rest} />
        </InputLabel>
    );
}
