import { POLICYTYPE, Policy } from "./1-types";
import { charset_str, constrains_str, str_charset, str_constrains } from "./3-casting";

const POLICY_SEPARATOR = "#expo#"; // "EXtended POlicy". keep the length less then 8.
const TOKEN_PREVENT_CHARACTERREPEAT = "~";
const TOKEN_PREVENT_CHARACTERPOSITION = "&";

// export function GetPolicyType(policy: Policy): POLICYTYPE        /**/ { return policy.type; }
// export function IsPolicyToGenerate(policy: Policy): boolean      /**/ { return policy.type == POLICYTYPE.generate; }
// export function IsPolicyToVerify(policy: Policy): boolean        /**/ { return policy.type == POLICYTYPE.verify; }
// export function IsEmptyPolicy(policy: Policy): boolean           /**/ { return policy.type == POLICYTYPE.none; }
// export function GetConstrains(policy: Policy): RESTRICTTYPE      /**/ { return policy.constrains; }
// export function GetSimpleCharSet(policy: Policy): CHARSETTYPE    /**/ { return policy.simpleChSet; }
// export function IsExtendedPolicy(policy: Policy): boolean        /**/ { return policy.useExt; }
// export function GetExtendedPolicyStr(policy: Policy): string     /**/ { return policy.policyExt; }
// export function GetMinLength(policy: Policy): number             /**/ { return policy.minLength; }
// export function GetMaxLength(policy: Policy): number             /**/ { return policy.maxLength; }

// Constructor from #### policyFromString ####
export function constructorFromString(v: string, type: POLICYTYPE = POLICYTYPE.none): Policy {
    const rv = {
        type,
    } as Policy;

    const { policyOld: policySimple, policyExt } = compatibility_split_policy(v);

    policyFromStringSimple(policySimple, rv);
    policyFromStringExtended(policyExt, rv);

    return rv;

    function policyFromStringSimple(v: string | undefined, rv: Partial<Policy>) { // initial rv is {}
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

    function policyFromStringExtended(v: string | undefined, rv: Partial<Policy>): void { // initial rv is {}
        rv.useExt = false;
        rv.policyExt = '';

        if (!v || v.length < 4)
            return;

        let policyPF: string = v.substring(0, 6);

        if (policyPF === "[e1]v:")
            rv.type = POLICYTYPE.verify;
        else if (policyPF === "[e1]g:")
            rv.type = POLICYTYPE.generate;
        else {
            rv.type = POLICYTYPE.none;
            return;
        }

        v = v.substring(6);

        rv.useExt = true;
        rv.policyExt = v;

        const parts = getExtendedParts(v, rv.minLength || 0, rv.maxLength || 0);
        rv = { ...rv, ...parts };
    }

    function getExtendedParts(v: string, minLength: number, maxLength: number): Pick<Policy, 'policyExt' | 'minLength' | 'maxLength'> {
        const rv: Pick<Policy, 'policyExt' | 'minLength' | 'maxLength'> = {
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
}

export function policyToString(policy: Policy): string {
    let rvSimple = policyToStringSimple(policy);
    let rvExt = policyToStringExtended(policy);

    let rv = '';
    compatibility_combine_policy(rv, rvSimple, rvExt);
    return rv;

    function policyToStringSimple(policy: Policy): string {
        let strType = '';
        switch (policy.type) {
            case POLICYTYPE.none: return '';
            case POLICYTYPE.verify: strType = "[p4]v:"; break;
            case POLICYTYPE.generate: strType = "[p4]g:"; break;
        }
    
        const chset = charset_str(policy.simpleChSet);
        const constr = constrains_str(policy.constrains);
    
        const rv = `${strType}:${policy.minLength}:${policy.maxLength}:${chset}:${constr}`;
        return rv;
    }

    function policyToStringExtended(v: Partial<Policy>): string {
        let rv: string = '';
    
        if (v.useExt) {
            switch (v.type) {
                case POLICYTYPE.none:
                    return rv;
                case POLICYTYPE.verify:
                    rv = "[e1]v:";
                    break;
                case POLICYTYPE.generate:
                    rv = "[e1]g:";
                    break;
            }
        }
    
        rv = `${rv}${v.policyExt}<${v.minLength},${v.maxLength}>`; // rv += sformat("%s<%d,%d>", m_policyExt, m_minLength, m_maxLength);
        return rv;
    }
}

/**
 * Used only by oti_manifest_io.h to save policy to manifest and somehow by constructorFromString() in this file.
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

/**
 * Used only by oti_manifest_io.h to load policy from manifest and somehow by policyToString() in this file.
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

export function theSame(a: Policy, b: Policy): boolean {
    const rv =
        a.type === b.type &&
        a.constrains === b.constrains &&
        a.simpleChSet === b.simpleChSet &&
        a.minLength === b.minLength &&
        a.maxLength === b.maxLength &&
        a.useExt === b.useExt &&
        a.policyExt === b.policyExt;
    return rv;
}

export function isValidPolicy(policy: Policy): boolean {
    return (
        !(
            (!policy.useExt && policy.type == POLICYTYPE.none) ||   // Simple without policy type - Invalid
            (policy.useExt && !policy.policyExt)                    // Extended without pattern text - Invalid
        )
    );
}
