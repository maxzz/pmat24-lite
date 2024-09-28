import { useState, type InputHTMLAttributes } from "react";
import { TitleWChildren } from "../1-options-row";
import { ExtPolicySelectUi, type SelectNameValueItem, type StringValueChangeProps } from "./2-ext-policy-select-ui";
import { classNames } from "@/utils";
import { extPolicyIcons, extPolicyTokens } from "./9-types";
import { RowInputStateAtom } from "@/ui/local-ui/1-input-validate";

type ExtPolicySelectProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> &
// StringValueChangeProps & 
{
    // items: SelectNameValueItem[];
    stateAtom: RowInputStateAtom;
};

const items: SelectNameValueItem[] = extPolicyTokens.map((token, idx) => {
    const Icon = token.icon && extPolicyIcons[token.icon];
    return [
        (<div className="flex items-center">
            {Icon && <Icon key={idx} className="mr-2 size-6" />}
            {token.displayName}
        </div>),
        token.value,
    ];
});

export function ExtPolicySelect({ ...rest }: ExtPolicySelectProps) {
    const [value, onValueChange] = useState<string>("");
    return (<>
        <TitleWChildren label="Extended authentication policy">
            <ExtPolicySelectUi items={items} value={value} onValueChange={onValueChange}  {...rest} />
        </TitleWChildren>
        </>);
}
