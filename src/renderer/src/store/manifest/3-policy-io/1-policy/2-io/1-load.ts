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

    if (ss.length != 5) {
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

function policyFromStringExtended(v: string | undefined, rv: Partial<PolicyIo>): void { // initial rv is {}
    rv.useExt = false;
    rv.policyExt = '';

    if (!v || v.length < 6)
        return;

    const prefix: string = v.substring(0, 6);

    if (prefix === "[e1]v:")
        rv.type = POLICYTYPE.verify;
    else if (prefix === "[e1]g:")
        rv.type = POLICYTYPE.generate;
    else {
        rv.type = POLICYTYPE.none;
        return;
    }

    rv.useExt = true;

    const suffix = v.substring(6);
    const parts = getExtendedParts(suffix, rv.minLength || 0, rv.maxLength || 0);
    rv = { ...rv, ...parts };
}

function getExtendedParts(v: string, minLength: number, maxLength: number): Pick<PolicyIo, 'policyExt' | 'minLength' | 'maxLength'> {
    const rv: Pick<PolicyIo, 'policyExt' | 'minLength' | 'maxLength'> = {
        policyExt: v,
        minLength: minLength,
        maxLength: maxLength,
    };

    const beginpos = v.lastIndexOf('<');
    const endpos = v.indexOf('>', beginpos);
    if (beginpos === -1 || endpos === -1) {
        return rv;
    }

    const values = v.substring(beginpos + 1, endpos - beginpos - 1).split(',');
    if (values.length !== 2) {
        return rv; // console.error(`Invalid extended policy: ${v}. using default`);
    }

    rv.policyExt = v.substring(0, beginpos) + v.substring(endpos + 1);
    rv.minLength = +values[0];
    rv.maxLength = +values[1];

    return rv;
}
