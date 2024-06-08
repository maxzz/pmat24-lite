import { Poli } from "pm-manifest";
import { parseExtPolicy2RulesSet } from "../../3-parser";
import { Rule, RulesAndMeta } from "../../3-parser/1-parser-types";
import { stringsPolicy, stringsPolicy3 } from "./5-strings";
import { genUtils } from "../9-gen-utils";

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

export function getCustomRuleExplanation(rules: Rule[], final: string[]): void {
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

            getCustomRuleExplanation(rule.group.rules, final);
        } else {
            const min = rule.chSet.range.min;
            const max = rule.chSet.range.max;
            const set = rule.chSet.chars;

            let rv = '';

            if (min === -1 && max === -1) {
                rv = stringsPolicy.chSet(set);//ai:'Must contain any character.';
            } else if (max > 0 && min > 0) {
                if (max === min) {
                    if (max === 1) {
                        rv = stringsPolicy.chSet(set);//ai:'Must contain any character.';
                    } else {
                        rv = stringsPolicy.chSetMax(max, set);//ai:`Must contain only ${max} character(s).`;
                    }
                } else {
                    rv = stringsPolicy.chSetMinMax(min, max, set);//ai:`Must contain atleast ${min} and not more than ${max} character(s).`;
                }
            } else if (min > 0) {
                rv = stringsPolicy.chSetMin(min, set);//ai:`Must contain atleast ${min} character(s).`;
            }

            final.push(rv);
        }
    }
}

function getCustomRuleAndLenExplanation(rulesAndMeta: RulesAndMeta, noDuplicates: boolean, final: string[]): void {
    let ruleLength = stringsPolicy.chSetLen(rulesAndMeta.pswLenRange.min, rulesAndMeta.pswLenRange.max);//ai:`Length must be between ${rulesSet_.m_pswlenSet.m_min} and ${rulesSet_.m_pswlenSet.m_max} characters.\n`;
    final.push('\n' + ruleLength); // IDS_PSW_POLICY_HEAD	+ ruleLength;

    if (noDuplicates) {
        final.push(stringsPolicy.noRepeat());//ai:'Each password character must only be used one time.';
    }

    getCustomRuleExplanation(rulesAndMeta.rules, final);
}

export function getPolicyExplanation(policy: Poli.Policy, final: string[]): void {

    if (policy.custom) {
        const parseAdvPolicyResult = parseExtPolicy2RulesSet(policy);

        // Explanation is shown only for verification hence we allow duplication of characters within a 
        let noduplicate = false;
        getCustomRuleAndLenExplanation(parseAdvPolicyResult.rulesAndMeta, noduplicate, final);
    } else {
        let ruleLength = stringsPolicy.chSetLen(policy.minLen, policy.maxLen);//ai:`Length must be between ${policy_.minLength} and ${policy_.maxLength} characters.\n`;
        final.push('\n' + ruleLength); // IDS_PSW_POLICY_HEAD	+ ruleLength;

        //if (policy.noDuplicate) { rv += keyvalues_[IDS_PSW_POLICY_NOREPEAT]; }

        let rv = '';

        switch (policy.constrainSet) {
            case Poli.ConstrainSet.alphanumeric:
                rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
                rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
                rv = stringsPolicy.chSet(genUtils.SET_Numeric);
                break;
            case Poli.ConstrainSet.alpha:
                rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
                rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
                break;
            case Poli.ConstrainSet.numeric:
                rv = stringsPolicy.chSet(genUtils.SET_Numeric);
                break;
            case Poli.ConstrainSet.withspecial:
                rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
                rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
                rv = stringsPolicy.chSet(genUtils.SET_Numeric);
                rv = stringsPolicy.chSet(genUtils.SET_Special);
                break;
            case Poli.ConstrainSet.atleastonenumber:
                rv = stringsPolicy.chSetMin(1, genUtils.SET_Numeric);
                rv = stringsPolicy.chSet(genUtils.SET_AlphaLower);
                rv = stringsPolicy.chSet(genUtils.SET_AlphaUpper);
                break;
            //default: Do nothing.
        }
        final.push(rv);

        switch (policy.constrainPsw) {
            case Poli.ConstrainPsw.diffAp:
                rv = stringsPolicy3.diffAp;
                break;
            case Poli.ConstrainPsw.diffPp:
                rv = stringsPolicy3.diffPp;
                break;
            case Poli.ConstrainPsw.diffWp:
                rv = stringsPolicy3.diffWp;
                break;
            case Poli.ConstrainPsw.none: // No explanation.
            //default: break;
        }
        final.push(rv);
    }
}

