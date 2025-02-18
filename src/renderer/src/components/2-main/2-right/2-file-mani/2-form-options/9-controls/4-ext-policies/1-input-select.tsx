import { useAtom } from "jotai";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { TitleWChildren } from "../1-options-row";
import { ExtPolicySelectUi, type SelectNameValueItem } from "./2-ext-policy-select-ui";
import { extPolicyIcons, extPolicyTokens } from "./9-types";

export function ExtPolicySelect({ stateAtom, onValueStateChange: onValueChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(newValue: string) {
        const value = newValue === '0' ? '' : newValue;
        setState((prev) => {
            const rv = { ...prev, data: value, dirty: prev.initialData !== value, };
            onValueChange?.(rv);
            return rv;
        });
    }

    return (
        <TitleWChildren label="Extended authentication policy">
            <ExtPolicySelectUi
                items={tokenReactNodes}
                value={state.data || '0'}
                onValueChange={onChange} {...rest}
            />
        </TitleWChildren>
    );
}

const tokenReactNodes: SelectNameValueItem[] = extPolicyTokens.map(
    (token, idx) => {
        const Icon = token.icon && extPolicyIcons[token.icon];
        return [
            (
                <div className="flex items-center">
                    {Icon && <Icon key={idx} className="mr-1 size-6" />}
                    {token.displayName}
                </div>
            ),
            token.value,
        ];
    }
);
