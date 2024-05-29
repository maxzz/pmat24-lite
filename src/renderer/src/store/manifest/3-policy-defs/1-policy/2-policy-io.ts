import { POLICYTYPE, Policy } from "./1-types";
import { charset_str, constrains_str, str_charset, str_constrains } from "./3-casting";

/*
    {1fdf1f83-a96f-422c-981e-3ca4e6cedd20}.dpm; login form:

    policy="[p4]g:8:20::different_ap"
	policy2="[e1]g:A{2,5}d{1,}[!@#$%^&amp;*._]{1,}a{2,5}&lt;8,20&gt;"
	options="{&quot;chgpolopts&quot;:{&quot;chkppos&quot;:false,&quot;norep&quot;:false}}"
*/

const POLICY_SEPARATOR = "#expo#";              // "ex-tended po-licy" (keep the length < 8)
const TOKEN_PREVENT_CHARACTERREPEAT = "~";
const TOKEN_PREVENT_CHARACTERPOSITION = "&";

export function constructorFromString(v: string, type: POLICYTYPE = POLICYTYPE.none): Policy {
    const rv = { type } as Policy;

    const { policyOld: policySimple, policyExt } = compatibility_split_policy(v);

    policyFromStringSimple(policySimple, rv);
    policyFromStringExtended(policyExt, rv);

    return rv;

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

    function policyToStringSimple(policy: Policy): string {
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

    function policyToStringExtended(v: Partial<Policy>): string {
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

type compatibility_split_optionsFromPolicyParams = {
    policy: string;
    options: string;
};

type UpdateCustomRulePolicyOptionsFromTextParams = {
    text: string;
    options: string;
};

/**
 * for manifest_io
 */
function compatibility_split_optionsFromPolicy(pm: compatibility_split_optionsFromPolicyParams): void {
    // 0. Splits custom rule options from policy (if available).
    //
    // NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
    // until we split. So, we split the policy string and if it contains custom rule
    // then we split custom rule options from the policy string before combining policy back.

    if (!pm.policy) { // 1. Check if we have any policy to split.
        return;
    }

    let policy: Policy = constructorFromString(pm.policy); // 2. Check if policy string has custom rule.
    if (!policy.useExt) {
        return;
    }

    let pm2: UpdateCustomRulePolicyOptionsFromTextParams = {
        text: policy.policyExt,
        options: pm.options,
    };

    updateCustomRulePolicyOptionsFromText(pm2); // 3. Update custom rule options and custom rule policy text.

    pm.options = pm2.options; // 4. Update custom rule options.
    pm.policy = policyToString(policy); // 5. Combine policy back without custom rule options in it.

    // Checks custom rule prepended tokens '~', '&' then places the information in JSON text within m_polExtOptions.
    // ~&<custom rule text>
    function updateCustomRulePolicyOptionsFromText(pm: UpdateCustomRulePolicyOptionsFromTextParams): void {
        if (pm.text.length < 2)
            return;

        let pos_preventcharrepeat = -1;
        let pos_preventcharposition = -1;

        let substr_customRule = '';
        if (pm.text.length > 2) {
            substr_customRule = pm.text.substr(0, 2);

            let isCharsetToken =
                substr_customRule[0] == '[' || substr_customRule[0] == 'a' ||
                substr_customRule[0] == 'A' || substr_customRule[0] == 'd' ||
                substr_customRule[0] == 's';

            if (isCharsetToken)
                substr_customRule = '';
            else {
                pos_preventcharrepeat = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERREPEAT);
                pos_preventcharposition = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
            }
        }

        let preventcharrepeat = pos_preventcharrepeat !== -1;
        let preventcharposition = pos_preventcharposition !== -1;

        const jsonRoot = JSON.parse(pm.options);
        jsonRoot["chgpolopts"] = jsonRoot["chgpolopts"] || {};
        jsonRoot["chgpolopts"]["norep"] = preventcharrepeat;
        jsonRoot["chgpolopts"]["chkppos"] = preventcharposition;

        pm.options = JSON.stringify(jsonRoot);

        if (pos_preventcharrepeat !== -1) {
            pm.text = pm.text.slice(0, pos_preventcharrepeat) + pm.text.slice(pos_preventcharrepeat + 1);
            substr_customRule = substr_customRule.slice(0, pos_preventcharrepeat) + substr_customRule.slice(pos_preventcharrepeat + 1);

            pos_preventcharposition = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
        }

        if (pos_preventcharposition !== -1) {
            pm.text = pm.text.slice(0, pos_preventcharposition) + pm.text.slice(pos_preventcharposition + 1);
        }
    }
}

/**
 * for manifest_io
 */
function compatibility_combine_optionsToPolicy(customRuleOptions_: string, policyStr_: string): string {
    // 0. Combines custom rule options to policy (if applicable).
    //
    // NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
    // until we split. So, we split the policy string and if it contains custom rule
    // then we add custom rule options to the policy string then combine back.

    if (!customRuleOptions_) { // 1. Check if we have any custom rule options to combine.
        return policyStr_;
    }

    const policy: Policy = constructorFromString(policyStr_); // 2. Check if policy string has custom rule.
    if (!policy.useExt) {
        return policyStr_;
    }

    setCustomRulePolicyOptionsToText(customRuleOptions_, policy.policyExt);
    policyStr_ = policyToString(policy);

    return policyStr_;

    function setCustomRulePolicyOptionsToText(customRulePolicyOptions: string, customRuleText: string): string {
        if (!customRulePolicyOptions) {
            return customRuleText;
        }

        let customruleopt_norep = false;
        let customruleopt_chkpos = false;

        const jsonRoot = JSON.parse(customRulePolicyOptions);
        const jsonExtOptions = jsonRoot["chgpolopts"];
        if (jsonExtOptions) {
            customruleopt_norep = jsonExtOptions["norep"];
            customruleopt_chkpos = jsonExtOptions["chkppos"];
        }

        let pos_preventcharrepeat = -1;
        let pos_preventcharposition = -1;

        let substr_customRule = '';
        if (customRuleText.length > 2) {
            substr_customRule = customRuleText.substring(0, 2);

            const isCharsetToken =
                substr_customRule[0] == '[' || substr_customRule[0] == 'a' ||
                substr_customRule[0] == 'A' || substr_customRule[0] == 'd' ||
                substr_customRule[0] == 's';

            if (isCharsetToken)
                substr_customRule = '';
            else {
                pos_preventcharrepeat = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERREPEAT);
                pos_preventcharposition = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
            }
        }

        if (customruleopt_norep) {
            // Check 'Prevent two identical consecutive characters' option.
            if (pos_preventcharrepeat === -1) {
                customRuleText = TOKEN_PREVENT_CHARACTERREPEAT + customRuleText;
            }
        } else {
            // Update text since option is false
            if (pos_preventcharrepeat !== -1) {
                let pos = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERREPEAT);

                customRuleText = customRuleText.slice(0, pos) + customRuleText.slice(pos + 1);
                substr_customRule = substr_customRule.slice(0, pos) + substr_customRule.slice(pos + 1);
            }
        }

        if (customruleopt_chkpos) {
            // 'Prevent character in same position' option.
            if (pos_preventcharposition === -1) {
                customRuleText = TOKEN_PREVENT_CHARACTERPOSITION + customRuleText;
            }
        } else {
            // Update text since option is false
            if (pos_preventcharposition !== -1) {
                const pos = substr_customRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
                if (pos !== -1) {
                    customRuleText = customRuleText.slice(0, pos) + customRuleText.slice(pos + 1);
                }
            }
        }

        return customRuleText;
    }
}
