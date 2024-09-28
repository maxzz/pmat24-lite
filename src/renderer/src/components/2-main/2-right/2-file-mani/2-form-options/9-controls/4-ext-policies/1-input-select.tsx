import { useState, type InputHTMLAttributes } from "react";
import { LabelWChildren } from "../1-options-row";
import { ExtPolicySelectUi, type SelectNameValueItem, type StringValueChangeProps } from "./2-ext-policy-select-ui";
import { classNames } from "@/utils";
import { extPolicyIcons, extPolicyTokens } from "./9-types";

type ExtPolicySelectProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
// StringValueChangeProps & 
{
    // items: SelectNameValueItem[];
};

const items: SelectNameValueItem[] = extPolicyTokens.map((token, idx) => {
    const Icon = extPolicyIcons[token.icon];
    return [
        (<>
            <Icon key={idx} className="size-6" />
            {token.displayName}
        </>),
        token.value,
    ];
});



export function ExtPolicySelect({ ...rest }: ExtPolicySelectProps) {
    const [value, onValueChange] = useState<string>("");
    return (
        <LabelWChildren label="Extended authentication policy">

            <ExtPolicySelectUi items={items} value={value} onValueChange={onValueChange}  {...rest} />
        </LabelWChildren>
    );
}
