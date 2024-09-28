import { type InputHTMLAttributes } from "react";
import { LabelWChildren } from "../1-options-row";
import { ExtPolicySelectUi, type SelectNameValueItem, type StringValueChangeProps } from "./2-ext-policy-select-ui";
import { classNames } from "@/utils";

type ExtPolicySelectProps = InputHTMLAttributes<HTMLInputElement> & StringValueChangeProps & {
    items: SelectNameValueItem[];
};

export function ExtPolicySelect({ items, className, ...rest }: ExtPolicySelectProps) {
    return (
        <LabelWChildren label="Extended authentication policy">

            <ExtPolicySelectUi items={items} {...rest} />
        </LabelWChildren>
    );
}
