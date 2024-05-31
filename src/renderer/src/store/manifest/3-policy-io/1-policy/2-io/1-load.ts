import { POLICYTYPE, PolicyIo } from "../1-types";
import { str_charset, str_constrains } from "../3-casting";
import { POLICY_SEPARATOR } from "./0-defs";

export function constructorFromString(v: string): PolicyIo {
    const rv = { type: POLICYTYPE.none } as PolicyIo;

    const { policyOld: policySimple, policyExt } = compatibility_split_policy(v);

    policyFromStringSimple(policySimple, rv);
    policyFromStringExtended(policyExt, rv);

    return rv;
}

export function constructorFromStrings(policy: string | undefined, policy2: string | undefined, options: string | undefined): PolicyIo {
    const rv = { type: POLICYTYPE.none } as PolicyIo;

    policyFromStringSimple(policy, rv);
    policyFromStringExtended(policy2, rv);

    return rv;
}

/**
 * Used only by oti_manifest_io.h to SAVE policy to manifest and somehow by constructorFromString() in this file.
 * No this is used by LOAD and was introduced due to parser limitations.
 */
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

function policyFromStringSimple(v: string | undefined, rv: Partial<PolicyIo>) { // initial rv is {}
    if (!v) {
        return;
    }

    const ss = v.split(":");

    if (ss.length !== 5) {
        return;
    }

    if (ss[0] === "[p4]v") {
        rv.type = POLICYTYPE.verify;
    }
    else if (ss[0] === "[p4]g") {
        rv.type = POLICYTYPE.generate;
    }
    else {
        return;
    }

    rv.minLength = +ss[1];
    rv.maxLength = +ss[2];
    rv.simpleChSet = str_charset(ss[3]);
    rv.constrains = str_constrains(ss[4]);
}

const rePolicyComplex = /^\[e1\](v|g):(.*)<(\d),(\d)>$/; // [type]:[policyExt]<min,max>: [e1]v:ab<1,2>cde<1,2> -> m1:v; m2:ab<1,2>cde; m3:1; m4:2

function policyFromStringExtended(v: string | undefined, rv: Partial<PolicyIo>): void { // initial rv is {}
    rv.useExt = false;
    rv.policyExt = '';

    if (!v) {
        return;
    }

    const m = v.match(rePolicyComplex);
    if (!m) {
        console.error(`invalid extended policy: '${v}'`);
        return;
    }

    const [_, type, policyExt, minLength, maxLength] = m;

    rv.useExt = true;
    rv.type = type === 'v' ? POLICYTYPE.verify : type === 'g' ? POLICYTYPE.generate : POLICYTYPE.none;
    rv.policyExt = policyExt;
    rv.minLength = +minLength;
    rv.maxLength = +maxLength;
}