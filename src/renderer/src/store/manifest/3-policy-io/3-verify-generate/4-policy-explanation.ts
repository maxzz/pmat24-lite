import { CHARSETTYPE, RESTRICTTYPE, PolicyIo } from "../1-policy";
import { parseExtPolicy2RulesSet } from "../3-parser";
import { Rule, RulesExtra } from "../3-parser/1-parser-types";
import { stringsPolicy, stringsPolicy3 } from "./5-strings";
import { utils } from "../3-parser/utils";

/*
This file expect following resource IDs to be declared and defined:
    ==========================================================================
    IDS_PSW_POLICY_HEAD		"\nPassword policy settings are as follows:\n"
    IDS_PSW_POLICY_LENGTH	"Length must be between %d and %d characters.\n"
    IDS_PSW_POLICY_ACHSET	"Must contain a character from the set [%s].\n"
    IDS_PSW_POLICY_MINCHSET	"Must contain atleast %d character(s) from the set: %s.\n"
    IDS_PSW_POLICY_MAXCHSET	"Must contain only %d character(s) from the set [%s].\n"
    IDS_PSW_POLICY_MMCHSET	"Must contain atleast %d and atmost %d character(s) from the set: %s.\n"
    IDS_PSW_POLICY_REPEAT	"Must contain repeated occurance of:\n"
    ==========================================================================
*/

/* The new password does not meet criteria specified in the password policy settings.\n */
/* Password policy settings are as follows:\n
   (.) Length must be between %d and %d characters.\n
   (.) Must contain a character from the set [A-Z].\n
   (.) Must contain atleast 2 character(s) from the set [a-z].\n
   (.) Must contain atleast 1 and atmost 2 character(s) from the set [!@#$%^&*()_+=].\n
   (.) Must contain in (any/the) sequence and \n
   \t(.) Must contain atleast 2 characters from the set =>[a-z].\n
   \t(.) Must contain atleast 1 and atmost 3 characters from the set [0-9].\n
*/

export function getRuleEntriesExpl(rules: Rule[]): string {
    let rv = ''; //TODO: make rv as array of strings and join them at the end with proper indentation.

    for (const rule of rules) {
        if (rule.isGroup) {
            /* // TODO: Explain grouping (repeat/mix).
            let groupHead: string = prefix;
            if (rule.group.mix) {
                groupHead += L"Must contain characters in any sequence:\n";
            } else {
                groupHead += L"Must contain characters in the sequence:\n";
            }
            rv += groupHead;
            */

            rv += getRuleEntriesExpl(rule.group.rules);
        } else {
            const min = rule.chSet.range.min;
            const max = rule.chSet.range.max;
            const set = rule.chSet.chars;

            let chsetExplanation = '';

            if (min === -1 && max === -1) {
                chsetExplanation = stringsPolicy.achset(set);//ai:'Must contain any character.';
            } else if (max > 0 && min > 0) {
                if (max === min) {
                    if (max === 1) {
                        chsetExplanation = stringsPolicy.achset(set);//ai:'Must contain any character.';
                    } else {
                        chsetExplanation = stringsPolicy.maxchset(max, set);//ai:`Must contain only ${max} character(s).`;
                    }
                } else {
                    chsetExplanation = stringsPolicy.mmchset(min, max, set);//ai:`Must contain atleast ${min} and not more than ${max} character(s).`;
                }
            } else if (min > 0) {
                chsetExplanation = stringsPolicy.minchset(min, set);//ai:`Must contain atleast ${min} character(s).`;
            }

            rv += chsetExplanation;
        }
    }

    return rv;
}

export function getRuleSetExplanation(rulesExtra: RulesExtra, noDuplicates: boolean): string {
    let ruleLength = stringsPolicy.length(rulesExtra.pswLenRange.min, rulesExtra.pswLenRange.max);//ai:`Length must be between ${rulesSet_.m_pswlenSet.m_min} and ${rulesSet_.m_pswlenSet.m_max} characters.\n`;

    let rv = '\n' + ruleLength; // IDS_PSW_POLICY_HEAD	+ ruleLength;

    if (noDuplicates) {
        rv += stringsPolicy.norepeat();//ai:'Each password character must only be used one time.';
    }

    rv += getRuleEntriesExpl(rulesExtra.rules);

    return rv;
}

export function getPolicyExplanation(policy_: PolicyIo): string {
    let rv = '';

    if (policy_.useExt) {
        const parseAdvPolicyResult = parseExtPolicy2RulesSet(policy_);

        // Explanation is shown only for verification hence we allow duplication of characters within a 
        let noduplicate = false;
        rv = getRuleSetExplanation(parseAdvPolicyResult.rulesExtra, noduplicate);
    } else {
        let ruleLength = stringsPolicy.length(policy_.minLength, policy_.maxLength);//ai:`Length must be between ${policy_.minLength} and ${policy_.maxLength} characters.\n`;

        rv = '\n' + ruleLength; // IDS_PSW_POLICY_HEAD	+ ruleLength;

        //if (policy.noDuplicate) { rv += keyvalues_[IDS_PSW_POLICY_NOREPEAT]; }

        switch (policy_.simpleChSet) {
            case CHARSETTYPE.alphanumeric:
                rv += stringsPolicy.achset(utils.SET_AlphaLower);
                rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                rv += stringsPolicy.achset(utils.SET_Numeric);
                break;
            case CHARSETTYPE.alpha:
                rv += stringsPolicy.achset(utils.SET_AlphaLower);
                rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                break;
            case CHARSETTYPE.numeric:
                rv += stringsPolicy.achset(utils.SET_Numeric);
                break;
            case CHARSETTYPE.withspecial:
                rv += stringsPolicy.achset(utils.SET_AlphaLower);
                rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                rv += stringsPolicy.achset(utils.SET_Numeric);
                rv += stringsPolicy.achset(utils.SET_Special);
                break;
            case CHARSETTYPE.atleastonenumber:
                rv += stringsPolicy.minchset(1, utils.SET_Numeric);
                rv += stringsPolicy.achset(utils.SET_AlphaLower);
                rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                break;
            //default: Do nothing.
        }

        switch (policy_.constrains) {
            case RESTRICTTYPE.different_ap:
                rv += stringsPolicy3.diffAp;
                break;
            case RESTRICTTYPE.different_pp:
                rv += stringsPolicy3.diffPp;
                break;
            case RESTRICTTYPE.different_wp:
                rv += stringsPolicy3.diffWp;
                break;
            case RESTRICTTYPE.no_restrictions: // No explanation.
            //default: break;
        }
    }

    return rv;
}

