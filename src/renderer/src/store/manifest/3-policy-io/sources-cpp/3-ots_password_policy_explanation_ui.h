// #include "ots_password_policy_explanation_ui.h"
//
#pragma once

#include "ots_password_policy_advanced.h"
#include "..\SharedResources\xresources_changepwd_policyexplanation.h"
#include "..\SharedResources\xresources_changepwd_policy.h"
#include "changepassword_policyoptions.h"

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

namespace password_policy_wexplanation
{
	using namespace advancedpswpolicy;

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

	} // getKeyValue()

	inline void getIndentLevel(__in int iLevel_, __inout wstring_t& rv_)
	{
		for (int count = 0; count < iLevel_; count++)
		{
			rv_ += L"  "; // Add 2 spaces instead of a tab to avoid long tabbed descriptive text.
		}//for
	} //getIndentLevel()

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

	inline void getRuleEntriesExpl(__in const keyvalues_t& keyvalues_, __in const ruleEntries_t& ruleEntries_, __inout wstring_t& rv_)
	{
		wstring_t res_policyACHSET   = getKeyValue(keyvalues_, IDS_PSW_POLICY_ACHSET);
		wstring_t res_policyMAXCHSET = getKeyValue(keyvalues_, IDS_PSW_POLICY_MAXCHSET);
		wstring_t res_policyMMCHSET  = getKeyValue(keyvalues_, IDS_PSW_POLICY_MMCHSET);
		wstring_t res_policyMINCHSET = getKeyValue(keyvalues_, IDS_PSW_POLICY_MINCHSET);

		for (ruleEntries_t::const_iterator it = ruleEntries_.begin(); it != ruleEntries_.end(); ++it)
		{
			const ruleEntry_t& ruleEntry = *it;

			if (ruleEntry.m_isgroup)
			{
				// TODO: Explain grouping (repeat/mix).
				/*
				wstring_t groupHead = prefix;
				if (ruleEntry.m_groupEntry.m_mix)
				{
					groupHead += L"Must contain characters in any sequence:\n";
				}
				else
				{
					groupHead += L"Must contain characters in the sequence:\n";
				}

				rv_explanation_ += groupHead;
				*/

				getRuleEntriesExpl(keyvalues_, ruleEntry.m_groupEntry.m_ruleEntries, rv_);
			}
			else
			{
				int min = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
				int max = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;

				wstring_t chsetExplanation;
				if (min == -1 && max == -1)
				{
					chsetExplanation = res_policyACHSET;
				}
				else if (max > 0 && min > 0)
				{
					if (max == min)
					{
						if (max == 1)
						{
							chsetExplanation = res_policyACHSET;
						}
						else
						{
							chsetExplanation = wformat(res_policyMAXCHSET.c_str(), max, L"%s");
						}
					}
					else
					{
						chsetExplanation = wformat(res_policyMMCHSET.c_str(), min, max, L"%s");
					}
				}
				else if (min > 0)
				{
					chsetExplanation = wformat(res_policyMINCHSET.c_str(), min, L"%s");
				}

				if (chsetExplanation.length())
					rv_ += wformat(chsetExplanation.c_str(), ruleEntry.m_chsetEntry.m_charset);
			}

		}//for

	} //getRuleEntriesExpl()

	inline void getRuleSetExplanation(__in const keyvalues_t& keyvalues_, __in const rulesSet_t& rulesSet_, __out wstring_t& rv_explanation_, __in bool noduplicates_)
	{
		wstring_t res_policyLENGTH   = getKeyValue(keyvalues_, IDS_PSW_POLICY_LENGTH);
		wstring_t res_policyHEAD     = getKeyValue(keyvalues_, IDS_PSW_POLICY_HEAD);
		wstring_t res_policyNOREPEAT = getKeyValue(keyvalues_, IDS_PSW_POLICY_NOREPEAT);

		wstring_t ruleLength = wformat(res_policyLENGTH.c_str(), rulesSet_.m_pswlenSet.m_min, rulesSet_.m_pswlenSet.m_max);

		rv_explanation_ = res_policyHEAD + ruleLength;

		if (noduplicates_)
		{
			rv_explanation_ += res_policyNOREPEAT;
		}

		getRuleEntriesExpl(keyvalues_, rulesSet_.m_ruleEntries, rv_explanation_);

	} // getRuleSetExplanation()

	inline wstring_t getPolicyExplanation(__in const keyvalues_t& keyvalues_, __in const password::policy_t& policy_)
	{
		// No explanation without localized text.
		if (keyvalues_.empty())
		{
			return L"";
		}

		// Additional restrictions. Password must be different from:
		wstring_t res_restrictWP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_WND);	// Different from Windows Password.
		wstring_t res_restrictAP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_ANY);	// Different from Windows Password.
		wstring_t res_restrictPP = getKeyValue(keyvalues_, IDS_PWDPOLICY_DIFF_PREVIOUS);	// Different from Previous Password.

		wstring_t rv;

		if (policy_.IsExtendedPolicy())
		{
			parseError parseerror;
			rulesSet_t rulesSet;

			customRule::parseExtPolicy2RulesSet(policy_, rulesSet, parseerror);

			// Explanation is shown only for verification hence we allow duplication
			// of characters within a password.
			bool noduplicate = false;
			getRuleSetExplanation(keyvalues_, rulesSet, rv, noduplicate);
		}
		else
		{
			wstring_t res_policyLENGTH   = getKeyValue(keyvalues_, IDS_PSW_POLICY_LENGTH);

			wstring_t ruleLength = wformat(res_policyLENGTH.c_str(), policy_.GetMinLength(), policy_.GetMaxLength());

			wstring_t res_policyHEAD     = getKeyValue(keyvalues_, IDS_PSW_POLICY_HEAD);
			wstring_t res_policyACHSET   = getKeyValue(keyvalues_, IDS_PSW_POLICY_ACHSET);
			wstring_t res_policyMINCHSET = getKeyValue(keyvalues_, IDS_PSW_POLICY_MINCHSET);

			rv = res_policyHEAD + ruleLength;

			//if (policy_.m_noduplicate)
			//{
			//	rv += keyvalues_[IDS_PSW_POLICY_NOREPEAT];
			//}

			switch (policy_.GetSimpleCharSet())
			{
				case password::CHARSETTYPE::alphanumeric:
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaLower));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaUpper));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_Numeric));
					break;
				case password::CHARSETTYPE::alpha:
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaLower));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaUpper));
					break;
				case password::CHARSETTYPE::numeric: 
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_Numeric));
					break;
				case password::CHARSETTYPE::withspecial: 
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaLower));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaUpper));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_Numeric));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_Special));
					break;
				case password::CHARSETTYPE::atleastonenumber:
					rv += wformat(res_policyMINCHSET.c_str(), 1, utf8(password::utils::SET_Numeric));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaLower));
					rv += wformat(res_policyACHSET.c_str(), utf8(password::utils::SET_AlphaUpper));
					break;
				//default:
					// Do nothing.
			}//switch

			switch (policy_.GetConstrains())
			{
				case password::RESTRICTTYPE::different_ap:
					rv += wformat(L"   %s", res_restrictAP);
					break;
				case password::RESTRICTTYPE::different_pp:
					rv += wformat(L"   %s", res_restrictPP);
					break;
				case password::RESTRICTTYPE::different_wp:
					rv += wformat(L"   %s", res_restrictWP);
					break;
				case password::RESTRICTTYPE::no_restrictions: // No explanation.
				default: 
					break;
			}
		}

		return rv;
	} //getPolicyExplanation()

	void policyExplanation2jsonObj(__in const password_policy_wexplanation::keyvalues_t& keyvalues_, __inout Json::Value& rv_);
	void jsonObj2policyExplanation(__in const Json::Value& v_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_);
	void jsonStr2KeyValuesNoThrow(__in const string_t& jsonStr_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_);
}//namespace password_policy_wexplanation
