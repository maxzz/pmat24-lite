import { type Mani, Poli } from "@/store/manifest";
import { charset_str, constrains_str } from "./4-casting";
//import { POLICY_SEPARATOR } from "./nun/0-defs";

export function policyToStrings(policy: Poli.Policy, options: string): Mani.FieldPolicy {
    return {
        policy: policyToStringSimple(policy),
        policy2: policyToStringExtended(policy),
        options, //TODO: this is not used in manifest and should be removed later
    };
}

/** /
export function policyToString(policy: Poli.Policy): string {
    let rvSimple = policyToStringSimple(policy);
    let rvExt = policyToStringExtended(policy);

    let rv = '';
    rv = compatibility_combine_policy('', rvSimple, rvExt);
    return rv;
}
/**/

/** /
/**
 * Used only by oti_manifest_io.h to LOAD policy from manifest and somehow by policyToString() in this file.
 * /
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
/**/

function policyToStringSimple(policy: Poli.Policy): string {
    let useAs = '';
    switch (policy.useAs) {
        case Poli.UseAs.none: return '';
        case Poli.UseAs.verify: useAs = "v"; break;
        case Poli.UseAs.generate: useAs = "g"; break;
    }

    const chset = charset_str(policy.constrainSet);
    const constr = constrains_str(policy.constrainPsw);

    return `[p4]${useAs}:${policy.minLen}:${policy.maxLen}:${chset}:${constr}`;
}

function policyToStringExtended(v: Partial<Poli.Policy>): string {
    if (v.custom) {
        let useAs = '';
        switch (v.useAs) {
            case Poli.UseAs.none: return '';
            case Poli.UseAs.verify: useAs = "[e1]v:"; break;
            case Poli.UseAs.generate: useAs = "[e1]g:"; break;
        }
        return `${useAs}${v.custom}<${v.minLen},${v.maxLen}>`;
    }
    return '';
}
