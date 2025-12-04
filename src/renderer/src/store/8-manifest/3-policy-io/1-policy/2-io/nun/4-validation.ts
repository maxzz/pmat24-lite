import { Poli } from "@/store/8-manifest";

export function isValidPolicy(policy: Poli.Policy): boolean {
    return (
        !(
            (!policy.custom && policy.useAs == Poli.UseAs.none) ||   // Simple without policy type - Invalid
            (policy.custom && !policy.custom)                    // Extended without pattern text - Invalid
        )
    );
}
