import { Poli } from "@/store/manifest";
import { str_charset, str_constrains } from "./4-casting";
import { POLICY_SEPARATOR } from "./nun/0-defs";

/** /
export function constructorFromString(v: string): Poli.Policy {
    const rv = { type: Poli.UseAs.none } as Poli.Policy;

    const { policyOld: policySimple, policyExt } = compatibility_split_policy(v);

    policyFromStringSimple(policySimple, rv);
    policyFromStringExtended(policyExt, rv);

    return rv;
}
/**/

/**
 * This version wo/ using compatibility_split_policy() and POLICY_SEPARATOR.
 */
export function policyFromStrings(policy: string | undefined, policy2: string | undefined, options: string | undefined): Poli.Policy {
    const rv = { useAs: Poli.UseAs.none } as Poli.Policy; 

    policyFromStringSimple(policy, rv);
    policyFromStringExtended(policy2, rv);

    return rv;
}

/** /
/**
 * Used only by oti_manifest_io.h to SAVE policy to manifest and somehow by constructorFromString() in this file.
 * No this is used by LOAD and was introduced due to parser limitations.
 * /
function compatibility_split_policy(policy: string): { policyOld?: string | undefined; policyExt?: string | undefined; } {
    // 0. Split 'policy' in 'policyOld' and 'policyNew' to save as manifest fields: 'policy' and 'policy2'.
    // This call is for manifest_io, and for policy string parsing.

    const rv: {
        policyOld?: string,
        policyExt?: string,
    } = {};

    const arr = policy.split(POLICY_SEPARATOR);
    for (const part of arr) {
        if (part.startsWith("[p4]")) { // policy with 4 elements.
            rv.policyOld = part;
        }
        else if (part.startsWith("[e1]")) { // policy extension version 1.
            rv.policyExt = part;
        }
    }

    return rv;
}
/**/

/*
* Simple policy format: [type]:min,max:charset:constrains
*/
const rePolicySimple = /^\[p4\](v|g):(\d+):(\d+):(\w*):(\w*)$/;

function policyFromStringSimple(v: string | undefined, rv: Partial<Poli.Policy>) { // initial rv is {}
    if (!v) {
        return;
    }

    const m = v.match(rePolicySimple);
    if (!m || m.length !== 6) {
        console.error(`invalid simple policy: '${v}'`);
        return;
    }

    const [_, type, minLen, maxLen, charset, constrains] = m;
    rv.useAs = type === 'v' ? Poli.UseAs.verify : type === 'g' ? Poli.UseAs.generate : Poli.UseAs.none;
    rv.minLen = +minLen;
    rv.maxLen = +maxLen;
    rv.constrainSet = str_charset(charset);
    rv.constrainPsw = str_constrains(constrains);
}

/*
* Extended policy format: [type]:[policyExt]<min,max>: [e1]v:ab<1,2>cde<1,2> -> m1:v; m2:ab<1,2>cde; m3:1; m4:2
*/
const rePolicyComplex = /^\[e1\](v|g):(.*)<(\d+),(\d+)>$/;

function policyFromStringExtended(v: string | undefined, rv: Partial<Poli.Policy>): void { // initial rv is {}
    rv.custom = '';

    if (!v) {
        return;
    }

    const m = v.match(rePolicyComplex);
    if (!m || m.length !== 5) {
        console.error(`invalid extended policy: '${v}'`);
        return;
    }

    const [_, type, custom, minLen, maxLen] = m;

    rv.useAs = type === 'v' ? Poli.UseAs.verify : type === 'g' ? Poli.UseAs.generate : Poli.UseAs.none;
    rv.custom = custom;
    rv.minLen = +minLen;
    rv.maxLen = +maxLen;
}
