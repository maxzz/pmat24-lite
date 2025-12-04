import { TOKEN_PREVENT_CHARACTERREPEAT, TOKEN_PREVENT_CHARACTERPOSITION } from "./0-defs";
//import { policyToString } from "../2-save";
//import { constructorFromString } from "./1-load";

type compatibility_split_optionsFromPolicyParams = {
    policy: string;
    options: string;
};

type UpdateCustomRulePolicyOptionsFromTextParams = {
    text: string;
    options: string;
};

/**
 * for manifest_io SAVE
 */
export function compatibility_split_optionsFromPolicy(pm: compatibility_split_optionsFromPolicyParams): void {
    // 0. Splits custom rule options from policy (if available).
    //
    // NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
    // until we split. So, we split the policy string and if it contains custom rule
    // then we split custom rule options from the policy string before combining policy back.

    if (!pm.policy) { // 1. Check if we have any policy to split.
        return;
    }
    return;
/* not needed, but keep for reference
    let policy: PolicyIo = constructorFromString(pm.policy); // 2. Check if policy string has custom rule.
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
*/
}

// Checks custom rule prepended tokens '~', '&' then places the information in JSON text within m_polExtOptions.
// ~&<custom rule text>
function updateCustomRulePolicyOptionsFromText(pm: UpdateCustomRulePolicyOptionsFromTextParams): void {
    if (pm.text.length < 2)
        return;

    let posPreventCharRepeat = -1;
    let posPreventCharPosition = -1;

    let substrCustomRule = '';

    if (pm.text.length > 2) {
        substrCustomRule = pm.text.substring(0, 2);

        const ch = substrCustomRule[0];
        const isCharsetToken = ch === '[' || ch === 'a' || ch === 'A' || ch === 'd' || ch === 's';

        if (isCharsetToken)
            substrCustomRule = '';
        else {
            posPreventCharRepeat = substrCustomRule.indexOf(TOKEN_PREVENT_CHARACTERREPEAT);
            posPreventCharPosition = substrCustomRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
        }
    }

    let doPreventCharRepeat = posPreventCharRepeat !== -1;
    let doPreventCharPosition = posPreventCharPosition !== -1;

    const jsonRoot = JSON.parse(pm.options);
    jsonRoot["chgpolopts"] = jsonRoot["chgpolopts"] || {};
    jsonRoot["chgpolopts"]["norep"] = doPreventCharRepeat;
    jsonRoot["chgpolopts"]["chkppos"] = doPreventCharPosition;

    pm.options = JSON.stringify(jsonRoot);

    if (posPreventCharRepeat !== -1) {
        pm.text = pm.text.slice(0, posPreventCharRepeat) + pm.text.slice(posPreventCharRepeat + 1);
        substrCustomRule = substrCustomRule.slice(0, posPreventCharRepeat) + substrCustomRule.slice(posPreventCharRepeat + 1);

        posPreventCharPosition = substrCustomRule.indexOf(TOKEN_PREVENT_CHARACTERPOSITION);
    }

    if (posPreventCharPosition !== -1) {
        pm.text = pm.text.slice(0, posPreventCharPosition) + pm.text.slice(posPreventCharPosition + 1);
    }
}
