import { Poli } from "pm-manifest";
import { PolicyIo } from "../1-types";

export function isValidPolicy(policy: PolicyIo): boolean {
    return (
        !(
            (!policy.useExt && policy.type == Poli.UseAs.none) ||   // Simple without policy type - Invalid
            (policy.useExt && !policy.policyExt)                    // Extended without pattern text - Invalid
        )
    );
}
