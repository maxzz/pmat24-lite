import { Poli } from "pm-manifest";
import { PolicyIo } from "../1-types";
import { str_charset, str_constrains } from "../3-casting";
import { POLICY_SEPARATOR } from "./0-defs";

/** /
export function constructorFromString(v: string): PolicyIo {
    const rv = { type: Poli.UseAs.none } as PolicyIo;

    const { policyOld: policySimple, policyExt } = compatibility_split_policy(v);

    policyFromStringSimple(policySimple, rv);
    policyFromStringExtended(policyExt, rv);

    return rv;
}
/**/

/**
 * This version wo/ using compatibility_split_policy() and POLICY_SEPARATOR.
 */
export function constructorFromStrings(policy: string | undefined, policy2: string | undefined, options: string | undefined): PolicyIo {
    const rv = { type: Poli.UseAs.none } as PolicyIo; 

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

function policyFromStringSimple(v: string | undefined, rv: Partial<PolicyIo>) { // initial rv is {}
    if (!v) {
        return;
    }

    const m = v.match(rePolicySimple);
    if (!m || m.length !== 6) {
        console.error(`invalid simple policy: '${v}'`);
        return;
    }

    const [_, type, minLength, maxLength, charset, constrains] = m;
    rv.type = type === 'v' ? Poli.UseAs.verify : type === 'g' ? Poli.UseAs.generate : Poli.UseAs.none;
    rv.minLength = +minLength;
    rv.maxLength = +maxLength;
    rv.simpleChSet = str_charset(charset);
    rv.constrains = str_constrains(constrains);
}

/*
* Extended policy format: [type]:[policyExt]<min,max>: [e1]v:ab<1,2>cde<1,2> -> m1:v; m2:ab<1,2>cde; m3:1; m4:2
*/
const rePolicyComplex = /^\[e1\](v|g):(.*)<(\d+),(\d+)>$/;

function policyFromStringExtended(v: string | undefined, rv: Partial<PolicyIo>): void { // initial rv is {}
    rv.useExt = false;
    rv.policyExt = '';

    if (!v) {
        return;
    }

    const m = v.match(rePolicyComplex);
    if (!m || m.length !== 5) {
        console.error(`invalid extended policy: '${v}'`);
        return;
    }

    const [_, type, policyExt, minLength, maxLength] = m;

    rv.useExt = true;
    rv.type = type === 'v' ? Poli.UseAs.verify : type === 'g' ? Poli.UseAs.generate : Poli.UseAs.none;
    rv.policyExt = policyExt;
    rv.minLength = +minLength;
    rv.maxLength = +maxLength;
}
