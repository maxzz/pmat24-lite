import { extPolicyIcons, extPolicyTokens } from "@/components/2-main/2-right/2-file-mani/2-form-options/9-controls/4-ext-policies";

export function TestPolicyIcons() {
    return (<>
        {extPolicyTokens.map(
            (token, idx) => {
                const Icon = token.icon && extPolicyIcons[token.icon];
                return (Icon && <Icon key={idx} className="size-6" />);
            }
        )}
    </>);
}
