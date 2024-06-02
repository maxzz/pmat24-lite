import { Poli } from "pm-manifest";

export function isValidPolicy(policy: Poli.Policy): boolean {
    return (
        !(
            (!policy.useExt && policy.useAs == Poli.UseAs.none) ||   // Simple without policy type - Invalid
            (policy.useExt && !policy.custom)                    // Extended without pattern text - Invalid
        )
    );
}
