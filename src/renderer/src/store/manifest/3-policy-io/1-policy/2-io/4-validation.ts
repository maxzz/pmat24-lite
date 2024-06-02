import { Poli } from "pm-manifest";
import { PolicyIo } from "../1-types";

export function isValidPolicy(policy: PolicyIo): boolean {
    return (
        !(
            (!policy.useExt && policy.useAs == Poli.UseAs.none) ||   // Simple without policy type - Invalid
            (policy.useExt && !policy.custom)                    // Extended without pattern text - Invalid
        )
    );
}
