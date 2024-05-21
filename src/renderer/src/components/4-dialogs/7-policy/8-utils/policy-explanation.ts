import { advancedpswpolicy } from "./custom-rule/types";
import { stringsPolicy, stringsPolicy3 } from "./strings";
import { password } from "./types";
import { utils } from "./utils";

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

export namespace password_policy_wexplanation {
    // using namespace advancedpswpolicy;

    /** / no need
    // Key value pair of resource ID and localized text.
    //
    inline wstring_t getKeyValue(__in const keyvalues_t& keyvalues_, UINT key_)
    {
        keyvalues_t::const_iterator it = keyvalues_.find(key_);
        if (it == keyvalues_.end())
        {
            return L"";
        }

        return it->second;
    }
    /**/

    /** / no need
    inline void getIndentLevel(__in int iLevel_, __inout wstring_t& rv_)
    {
        for (int count = 0; count < iLevel_; count++)
        {
            rv_ += L"  "; // Add 2 spaces instead of a tab to avoid long tabbed descriptive text.
        }//for
    }
    /**/

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

    export function getRuleEntriesExpl(ruleEntries_: advancedpswpolicy.ruleEntries_t): string {
        let rv_ = ''; //TODO: make rv as array of strings and join them at the end with proper indentation.

        for (const ruleEntry of ruleEntries_) {
            if (ruleEntry.m_isgroup) {
                /* // TODO: Explain grouping (repeat/mix).
                wstring_t groupHead = prefix;
                if (ruleEntry.m_groupEntry.m_mix) {
                    groupHead += L"Must contain characters in any sequence:\n";
                } else {
                    groupHead += L"Must contain characters in the sequence:\n";
                }
                rv_explanation_ += groupHead;
                */

                rv_ += getRuleEntriesExpl(ruleEntry.m_groupEntry.m_ruleEntries);
            } else {
                const min = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
                const max = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;
                const set = ruleEntry.m_chsetEntry.m_charset;

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

                rv_ += chsetExplanation;
            }
        }

        return rv_;
    }

    export function getRuleSetExplanation(rulesSet_: advancedpswpolicy.rulesSet_t, noduplicates_: boolean): string {
        let rv_explanation_ = '';

        // // wstring_t res_policyLENGTH   = getKeyValue(keyvalues_, IDS_PSW_POLICY_LENGTH);
        // // wstring_t res_policyHEAD     = getKeyValue(keyvalues_, IDS_PSW_POLICY_HEAD);
        // // wstring_t res_policyNOREPEAT = getKeyValue(keyvalues_, IDS_PSW_POLICY_NOREPEAT);

        // wstring_t ruleLength = wformat(res_policyLENGTH.c_str(), rulesSet_.m_pswlenSet.m_min, rulesSet_.m_pswlenSet.m_max);

        let ruleLength = stringsPolicy.length(rulesSet_.m_pswlenSet.m_min, rulesSet_.m_pswlenSet.m_max);//ai:`Length must be between ${rulesSet_.m_pswlenSet.m_min} and ${rulesSet_.m_pswlenSet.m_max} characters.\n`;

        rv_explanation_ = '\n' + ruleLength; // IDS_PSW_POLICY_HEAD	+ ruleLength;

        if (noduplicates_) {
            rv_explanation_ += stringsPolicy.norepeat();//ai:'Each password character must only be used one time.';
        }

        rv_explanation_ += getRuleEntriesExpl(rulesSet_.m_ruleEntries);

        return rv_explanation_;
    }

    export function getPolicyExplanation(policy_: password.policy_t): string
    {
        // No explanation without localized text.
        // if (keyvalues_.empty())
        // {
        // 	return L"";
        // }
 
        // Additional restrictions. Password must be different from:
        // wstring_t res_restrictWP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_WND);	// Different from Windows Password.
        // wstring_t res_restrictAP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_ANY);	// Different from Windows Password.
        // wstring_t res_restrictPP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_PREVIOUS);	// Different from Previous Password.
 
        let rv = '';
 
        if (policy_.useExt) {
            //stringsPolicy3
            const parseAdvPolicyResult = advancedpswpolicy.parseExtPolicy2RulesSet(policy_);
 
            // Explanation is shown only for verification hence we allow duplication of characters within a password.
            let noduplicate = false;
            rv = getRuleSetExplanation(parseAdvPolicyResult.rules, noduplicate);
        }
        else
        {
            let ruleLength = stringsPolicy.length(policy_.minLength, policy_.maxLength);//ai:`Length must be between ${policy_.minLength} and ${policy_.maxLength} characters.\n`;
 
            // wstring_t res_policyHEAD     = getKeyValue(keyvalues_, IDS_PSW_POLICY_HEAD);

            // wstring_t res_policyACHSET   = getKeyValue(keyvalues_, IDS_PSW_POLICY_ACHSET);
            // wstring_t res_policyMINCHSET = getKeyValue(keyvalues_, IDS_PSW_POLICY_MINCHSET);
 
            rv = '\n' + ruleLength; // IDS_PSW_POLICY_HEAD	+ ruleLength;
 
            //if (policy_.m_noduplicate)
            //{
            //	rv += keyvalues_[IDS_PSW_POLICY_NOREPEAT];
            //}
 
            switch (policy_.simpleChSet)
            {
                case password.CHARSETTYPE.alphanumeric:
                    rv += stringsPolicy.achset(utils.SET_AlphaLower);
                    rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                    rv += stringsPolicy.achset(utils.SET_Numeric);
                    break;
                case password.CHARSETTYPE.alpha:
                    rv += stringsPolicy.achset(utils.SET_AlphaLower);
                    rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                    break;
                case password.CHARSETTYPE.numeric: 
                    rv += stringsPolicy.achset(utils.SET_Numeric);
                    break;
                case password.CHARSETTYPE.withspecial: 
                    rv += stringsPolicy.achset(utils.SET_AlphaLower);
                    rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                    rv += stringsPolicy.achset(utils.SET_Numeric);
                    rv += stringsPolicy.achset(utils.SET_Special);
                    break;
                case password.CHARSETTYPE.atleastonenumber:
                    rv += stringsPolicy.minchset(1, utils.SET_Numeric);
                    rv += stringsPolicy.achset(utils.SET_AlphaLower);
                    rv += stringsPolicy.achset(utils.SET_AlphaUpper);
                    break;
                //default:
                    // Do nothing.
            }
 
            switch (policy_.constrains) {
                case password.RESTRICTTYPE.different_ap:
                    // rv += wformat(L"   %s", res_restrictAP);
                    rv += stringsPolicy3.diffAp;
                    break;
                case password.RESTRICTTYPE.different_pp:
                    // rv += wformat(L"   %s", res_restrictPP);
                    rv += stringsPolicy3.diffPp;
                    break;
                case password.RESTRICTTYPE.different_wp:
                    // rv += wformat(L"   %s", res_restrictWP);
                    rv += stringsPolicy3.diffWp;
                    break;
                case password.RESTRICTTYPE.no_restrictions: // No explanation.
                // default: 
                //     break;
            }
        }
 
        return rv;
    }
 
    /** / not yet
    // void policyExplanation2jsonObj(__in const password_policy_wexplanation::keyvalues_t& keyvalues_, __inout Json::Value& rv_);
    // void jsonObj2policyExplanation(__in const Json::Value& v_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_);
    // void jsonStr2KeyValuesNoThrow(__in const string_t& jsonStr_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_);
    /**/

}