import { TOKEN_PREVENT_CHARACTERREPEAT, TOKEN_PREVENT_CHARACTERPOSITION } from "./0-defs";
//import { constructorFromString } from "./1-load";
// import { policyToString } from "../2-save";

/**
 * for manifest_io LOAD parser
 */
export function compatibility_combine_optionsToPolicy(customRuleOptions_: string, policyStr_: string): string {
    // 0. Combines custom rule options to policy (if applicable).
    //
    // NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
    // until we split. So, we split the policy string and if it contains custom rule
    // then we add custom rule options to the policy string then combine back.

    if (!customRuleOptions_) { // 1. Check if we have any custom rule options to combine.
        return policyStr_;
    }


    
    return policyStr_;
/* not needed, but keep for reference
    const policy: PolicyIo = constructorFromString(policyStr_); // 2. Check if policy string has custom rule.
    if (!policy.useExt) {
        return policyStr_;
    }

    setCustomRulePolicyOptionsToText(customRuleOptions_, policy.policyExt);
    policyStr_ = policyToString(policy);

    return policyStr_;
*/
}

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

        const ch = substr_customRule[0];
        const isCharsetToken = ch == '[' || ch == 'a' || ch == 'A' || ch == 'd' || ch == 's';

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
