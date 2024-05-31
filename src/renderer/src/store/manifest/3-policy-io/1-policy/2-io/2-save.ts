import { POLICYTYPE, PolicyIo } from "../1-types";
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
    switch (policy.type) {
        case POLICYTYPE.none: return '';
        case POLICYTYPE.verify: type = "[p4]v:"; break;
        case POLICYTYPE.generate: type = "[p4]g:"; break;
    }

    const chset = charset_str(policy.simpleChSet);
    const constr = constrains_str(policy.constrains);

    return `${type}:${policy.minLength}:${policy.maxLength}:${chset}:${constr}`;
}

function policyToStringExtended(v: Partial<PolicyIo>): string {
    let type = '';
    if (v.useExt) {
        switch (v.type) {
            case POLICYTYPE.none: return '';
            case POLICYTYPE.verify: type = "[e1]v:"; break;
            case POLICYTYPE.generate: type = "[e1]g:"; break;
        }
    }

    return `${type}${v.policyExt}<${v.minLength},${v.maxLength}>`;
}