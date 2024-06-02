import { Poli } from "pm-manifest";
import { PolicyIo } from "../1-types";
import { charset_str, constrains_str } from "../3-casting";
import { POLICY_SEPARATOR } from "./0-defs";

export function policyToString(policy: PolicyIo): string {
    let rvSimple = policyToStringSimple(policy);
    let rvExt = policyToStringExtended(policy);

    let rv = '';
    rv = compatibility_combine_policy('', rvSimple, rvExt);
    return rv;
}

/**
 * Used only by oti_manifest_io.h to LOAD policy from manifest and somehow by policyToString() in this file.
 */
function compatibility_combine_policy(policy: string, policyOld: string, policyExt: string): string {
    // 0. Combine 'policyOld' and 'policyNew' policies into 'policy' after manifest was loaded.
    // This call is for manifest_io only.

    if (!!policyOld) {
        policy = !policy ? policyOld : policyOld + POLICY_SEPARATOR + policy;
    }

    if (!!policyExt) {
        policy = !policy ? policyExt : policy + POLICY_SEPARATOR + policyExt;
    }

    return policy;
}

function policyToStringSimple(policy: PolicyIo): string {
    let type = '';
    switch (policy.useAs) {
        case Poli.UseAs.none: return '';
        case Poli.UseAs.verify: type = "[p4]v:"; break;
        case Poli.UseAs.generate: type = "[p4]g:"; break;
    }

    const chset = charset_str(policy.constrainSet);
    const constr = constrains_str(policy.constrainPsw);

    return `${type}:${policy.minLen}:${policy.maxLen}:${chset}:${constr}`;
}

function policyToStringExtended(v: Partial<PolicyIo>): string {
    let type = '';
    if (v.useExt) {
        switch (v.useAs) {
            case Poli.UseAs.none: return '';
            case Poli.UseAs.verify: type = "[e1]v:"; break;
            case Poli.UseAs.generate: type = "[e1]g:"; break;
        }
    }

    return `${type}${v.custom}<${v.minLen},${v.maxLen}>`;
}
