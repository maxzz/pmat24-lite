import { useAtom } from "jotai";
import { type OptionInputProps } from "@/ui/local-ui/1-input-validate";
import { type SelectNameValueItem, ExtPolicySelectUi } from "./2-ext-policy-select-ui";
import { extPolicyIcons, extPolicyTokens } from "./9-types";
import { SelectTm, SelectTmTextValue } from "@/ui/local-ui";

export function ExtPolicySelect({ stateAtom, onValueStateChange: onValueChange, ...rest }: OptionInputProps) {
    const [state, setState] = useAtom(stateAtom);

    function onChange(newValue: string) {
        const value = newValue === '0' ? '' : newValue;
        setState((prev) => {
            const rv = { ...prev, data: value, dirty: prev.initialData !== value, };
            return rv;
        });
        onValueChange?.();
    }

    return (
        <SelectTm
            items={tokenReactNodes}
            value={state.data || '0'}
            onValueChange={onChange} {...rest}
        />
    );
}

const tokenReactNodes: SelectTmTextValue[] = extPolicyTokens.map(
    (token, idx) => {
        const Icon = token.icon && extPolicyIcons[token.icon];
        return [
            (
                <div className="flex items-center">
                    {Icon && (
                        <Icon key={idx} className="mr-1 size-6" />
                    )}
                    {token.displayName}
                </div>
            ),
            token.value,
        ];
    }
);
