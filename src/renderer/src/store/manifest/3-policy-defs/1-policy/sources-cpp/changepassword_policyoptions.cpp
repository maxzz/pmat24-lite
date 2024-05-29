//changepassword_policyoptions.cpp
//
// #include "stdafx.h"

// #include "ots_password_policy_explanation_ui.h" // To provide policy explanation to UI.
#include "changepassword_policyoptions.h"
// #include <transform_json.h>
#include <ots_password_policy.h>

		/*
		"pswpolicy": {
			"mix": {
				"1": "Letters and numbers",
				"2": "Numbers only",
				"3": "Letters only",
				"4": "Letters and Numbers with special characters",
				"5": "Letters and Numbers with atleast one number"
			},
			"constraint": {
				"1": "none",
				"2": "Unique within Password Manager managed logons",
				"3": "Different than windows password",
				"4": "Different than current password"
			},
			"current": {
				"mix"     : "1"		//OR
				"custom"  : "xxx",
				"minlen"  : 8,
				"maxlen"  : 32,
				"constraint": "1",
				"generate": false,
				"hist": [list of password values]
				"wpsw": "windows user password"
			}
		}
		*/

		/////////////////////////////////////////////////////////////////////

#define JSON_OBJ_PSWPOLICY	"pswpolicy"
#define JSON_OBJ_MIX		"mix"
#define JSON_OBJ_CONSTRAINT	"constraint"
#define JSON_OBJ_CURRENT	"current"

#define JSON_VAL_MIX		"mix"
#define JSON_VAL_CUSTOM		"custom"
#define JSON_VAL_MINLEN		"minlen"
#define JSON_VAL_MAXLEN		"maxlen"
#define JSON_VAL_GENERATE	"generate"
#define JSON_VAL_CONSTRAINT "constraint"
#define JSON_VAL_HISTORY	"hist"
#define JSON_VAL_WINPSW		"wpsw"
/*
{
	"explain" : {
		"localized string1" : resource ID1,
		"localized string2" : resource ID2
	}
}
*/
#define JSON_OBJ_EXPLANATION "explain"

///
/*
{
	"result" : {
		"value": "generated password value in clear text",
		"strength": integer in range (0 - 255), (same as the one sent with getprofile.
		"isvalid": true | false, true => validation succeeded otherwise failed. Localized message to be shown to user "msg" if validation failed.
		"explain": "localized message."
	}
}
*/

#define JSON_OBJ_RESULT		"result"
#define JSON_VAL_VALUE		"value"
#define JSON_VAL_STRENGTH	"strength"
#define JSON_VAL_ISVALID	"isvalid"
#define JSON_VAL_POLICYEXP	"explain"

/////////////////////////////////////////////////////////////////////

namespace passwordpolicy
{
	/////////////////////////////////////////////////////////////////////////
	// misc functions

	bool isvalid_additionalconstraints(__in const password::RESTRICTTYPE constraints_, __in const wstrings_t& pswhistory_, __in const wstring_t& winpassword_, const wstring_t& currentpassword_)
	{
		switch (constraints_) {
		case password::RESTRICTTYPE::different_ap:
			for (wstrings_t::const_iterator it = pswhistory_.begin(); it != pswhistory_.end(); ++it) {
				const wstring_t& current_psw = *it;
				if (strings::equal(current_psw, currentpassword_))
					return false;
			}
			break;
		case password::RESTRICTTYPE::different_pp:
			if (!pswhistory_.empty()) {
				if (strings::equal(pswhistory_.front(), currentpassword_))	// First element is always the recent one.
					return false;
			}
			break;
		case password::RESTRICTTYPE::different_wp:
			if (strings::equal(winpassword_, currentpassword_))
				return false;
			break;
		case password::RESTRICTTYPE::no_restrictions:
		default:
			break;
		}
		return true;
	}

	/////////////////////////////////////////////////////////////////////////
	// result_t

	void result_t::result2jsonObj(__out Json::Value& rv_)
	{
		Json::Value& jsonObjResult = rv_[JSON_OBJ_RESULT];

		jsonObjResult[JSON_VAL_VALUE] = utf8(m_value);
		jsonObjResult[JSON_VAL_STRENGTH] = m_strength;
		jsonObjResult[JSON_VAL_ISVALID] = m_isvalid;
		jsonObjResult[JSON_VAL_POLICYEXP] = utf8(m_policy_desc);
	}

	/////////////////////////////////////////////////////////////////////////
	// optionsdata_t

	optionsdata_t::optionsdata_t(const password::policy_t& policy_) {   // equivalent of PasswordPolicy2optionsData
		m_currentrule.m_generate = policy_.IsPolicyToGenerate();

		if (policy_.IsExtendedPolicy()) {
			m_currentrule.m_iscustom = true;
			m_currentrule.m_customrule = utf8(policy_.GetExtendedPolicyStr());
		}

		m_currentrule.m_maxlength = policy_.GetMaxLength();
		m_currentrule.m_minlength = policy_.GetMinLength();
		m_currentrule.m_mix = strings::conv_int(policy_.GetSimpleCharSet());
		m_currentrule.m_restriction = strings::conv_int(policy_.GetConstrains());
	}

	optionsdata_t::optionsdata_t(const Json::Value& v_) { // equivalent of jsonObj2OptionsData
		if (v_.empty())
			return;

		const Json::Value& jsonPolicyOptions = v_[JSON_OBJ_PSWPOLICY];

		JsonObj2UIOptions(jsonPolicyOptions);       // Mix and Constraints object
		JsonObj2currentRule(jsonPolicyOptions[JSON_OBJ_CURRENT]);  // Current object
	}

	optionsdata_t::optionsdata_t(const wstring_t& policyStr_) { // equivalent of policyStr2optionsDataNoThrow
		Json::Value root;
		if (!jsonSTR2VALUE(utf8(policyStr_), root))
			return;

		const Json::Value& jsonPolicyOptions = root[JSON_OBJ_PSWPOLICY];
		if (root.empty())
			return;

		JsonObj2UIOptions(jsonPolicyOptions);       // Mix and Constraints object
		JsonObj2currentRule(jsonPolicyOptions[JSON_OBJ_CURRENT]);  // Current object
	}

	void optionsdata_t::JsonObj2UIOptions(__in const Json::Value& JsonObj_)
	{
		if (JsonObj_.empty())
			return;

		const Json::Value& jsonObj_mix = JsonObj_[JSON_OBJ_MIX];
		if (!jsonObj_mix.empty()) {
			const Json::Value::Members& members = jsonObj_mix.getMemberNames();
			for (Json::Value::Members::const_iterator it = members.begin(); it != members.end(); ++it) {
				const Json::Value& currentMember = *it;
				string_t value = currentMember.asString();

				Json::Value JsonKey = jsonObj_mix.get(value, Json::Value());

				m_mixoptions[utf8(value)] = JsonKey.asString();
			}
		}

		const Json::Value& jsonObj_constraint = JsonObj_[JSON_OBJ_CONSTRAINT];
		if (!jsonObj_constraint.empty()) {
			const Json::Value::Members& members = jsonObj_constraint.getMemberNames();
			for (Json::Value::Members::const_iterator it = members.begin(); it != members.end(); ++it) {
				const Json::Value& currentMember = *it;
				string_t value = currentMember.asString();
				Json::Value JsonKey = jsonObj_constraint.get(value, Json::Value());
				m_restrictions[utf8(value)] = JsonKey.asString();
			}
		}
	}

	void optionsdata_t::JsonObj2currentRule(const Json::Value& v_)
	{
		if (v_.empty())
			return;

		wstring_t customrule = utf8(v_[JSON_VAL_CUSTOM].asString());
		m_currentrule.m_iscustom = !customrule.empty();
		if (m_currentrule.m_iscustom)
			m_currentrule.m_customrule = customrule;

		string_t simplerule = strings::conv_int(v_[JSON_VAL_MIX].asUInt());
		if (!simplerule.empty())
			m_currentrule.m_mix = simplerule; //strings::conv_int(simplerule);

		m_currentrule.m_minlength = v_[JSON_VAL_MINLEN].asUInt();
		m_currentrule.m_maxlength = v_[JSON_VAL_MAXLEN].asUInt();

		m_currentrule.m_restriction = strings::conv_int(v_[JSON_VAL_CONSTRAINT].asUInt());
		m_currentrule.m_generate = v_[JSON_VAL_GENERATE].asBool();

		JSON2valuehistory(v_[JSON_VAL_HISTORY], m_currentrule.m_pswhistory);

		m_currentrule.m_winpassword = v_[JSON_VAL_WINPSW].asString();
	}

	void optionsdata_t::JSON2valuehistory(__in const Json::Value& jsonValueHistory_, __out wstrings_t& rv_values_)
	{
		rv_values_.clear();

		for (Json::Value::const_iterator it = jsonValueHistory_.begin(); it != jsonValueHistory_.end(); ++it)
		{
			string_t currentvalue = (*it).asString();

			rv_values_.push_back(utf8(currentvalue));
		}
	}

	void optionsdata_t::optionsData2jsonObj(Json::Value& rv_)
	{
		Json::Value& jsonObj_Policy = rv_[JSON_OBJ_PSWPOLICY];

		// Simple Object
		UIOptions2JsonObj(jsonObj_Policy);

		// Current Object
		Json::Value& jsonCurrentRule = jsonObj_Policy[JSON_OBJ_CURRENT];
		currentRule2JsonObj(jsonCurrentRule);
	}

	void optionsdata_t::UIOptions2JsonObj(__inout Json::Value& jsonObj_)
	{
		if (!m_mixoptions.empty()) {
			Json::Value& jsonObj_mix = jsonObj_[JSON_OBJ_MIX];
			for (uioptions_t::const_iterator it = m_mixoptions.begin(); it != m_mixoptions.end(); ++it) {
				const wstring_t& key = (*it).first;
				const string_t& value = (*it).second;

				jsonObj_mix[value] = utf8(key);
			}
		}

		if (!m_restrictions.empty()) {
			Json::Value& jsonObj_Constraints = jsonObj_[JSON_OBJ_CONSTRAINT];
			for (uioptions_t::const_iterator it = m_restrictions.begin(); it != m_restrictions.end(); ++it) {
				const wstring_t& key = (*it).first;
				const string_t& value = (*it).second;

				jsonObj_Constraints[value] = utf8(key);
			}
		}
	}

	void optionsdata_t::currentRule2JsonObj(__out Json::Value& rv_)
	{
		rv_.clear();

		if (m_currentrule.isblank())
			return;

		if (m_currentrule.m_iscustom)
			rv_[JSON_VAL_CUSTOM] = utf8(m_currentrule.m_customrule);

		if (!m_currentrule.m_mix.empty())
			rv_[JSON_VAL_MIX] = strings::conv_int(m_currentrule.m_mix);

		rv_[JSON_VAL_MINLEN] = m_currentrule.m_minlength;
		rv_[JSON_VAL_MAXLEN] = m_currentrule.m_maxlength;

		if (!m_currentrule.m_restriction.empty())
			rv_[JSON_VAL_CONSTRAINT] = strings::conv_int(m_currentrule.m_restriction);

		rv_[JSON_VAL_GENERATE] = m_currentrule.m_generate;

		if (!m_currentrule.m_pswhistory.empty())
			valuehistory2JSON(rv_[JSON_VAL_HISTORY]);

		if (!m_currentrule.m_winpassword.empty())
			rv_[JSON_VAL_WINPSW] = m_currentrule.m_winpassword;
	}

	void optionsdata_t::valuehistory2JSON(__out Json::Value& rv_) {
		for (wstrings_t::const_iterator it = m_currentrule.m_pswhistory.begin(); it != m_currentrule.m_pswhistory.end(); ++it) {
			const wstring_t& currentvalue = *it;
			rv_.append(utf8(currentvalue));
		}
	}

	void optionsdata_t::generatePassword(__out wstring_t& rv_password_)
	{
		rv_password_.clear();

		password::policy_t pswpolicy(*this, password::POLICYTYPE::generate);

		bool isvalid_constrains = true;

		if (pswpolicy.IsExtendedPolicy()) {
			advancedpswpolicy::parseError parseerror;
			advancedpswpolicy::rulesSet_t rulesSet;
			customRule::parseExtPolicy2RulesSet(pswpolicy, rulesSet, parseerror);

			wstring_t previousPassword = m_currentrule.m_pswhistory.empty() ? L"" : m_currentrule.m_pswhistory.front(); // First value among history is always the current one.

			bool noduplicate = false; // For verification, we allow duplicate characters.
			customRule::generatePasswordByRuleNoThrow(rulesSet, noduplicate, previousPassword, rv_password_);

			isvalid_constrains = isvalid_additionalconstraints(pswpolicy.GetConstrains(), m_currentrule.m_pswhistory, utf8(m_currentrule.m_winpassword), rv_password_);
		}
		else {
			do {
				TRY_TM() {
					rv_password_ = utf8(password::generate_t()(pswpolicy));
				}
				CATCH_TM("generate")

				isvalid_constrains = isvalid_additionalconstraints(pswpolicy.GetConstrains(), m_currentrule.m_pswhistory, utf8(m_currentrule.m_winpassword), rv_password_);
			} while (!isvalid_constrains);
		}
	}

	void optionsdata_t::verifyPassword(__in const password_policy_wexplanation::keyvalues_t& keyvalues_, __inout passwordpolicy::result_t& result_)
	{
		result_.m_isvalid = true;

		password::policy_t pswpolicy(*this, password::POLICYTYPE::verify);

		if (pswpolicy.IsExtendedPolicy()) {
			advancedpswpolicy::parseError parseerror;
			advancedpswpolicy::rulesSet_t rulesSet;
			customRule::parseExtPolicy2RulesSet(pswpolicy, rulesSet, parseerror);

			result_.m_isvalid = parseerror.m_errorType == parseerror.errNone;

			// First value among history is always the current one.
			//
			wstring_t previousPassword = m_currentrule.m_pswhistory.empty() ? L"" : m_currentrule.m_pswhistory.front();

			bool noduplicate = false; // For verification, we allow duplicate characters.
			result_.m_isvalid = customRule::verifyPasswordAgainstRuleNoThrow(rulesSet, previousPassword, result_.m_value, noduplicate);
		}
		else {
			result_.m_isvalid = password::verify_t()(pswpolicy, utf8(result_.m_value));
		}

		if (result_.m_isvalid)
			result_.m_isvalid = passwordpolicy::isvalid_additionalconstraints(pswpolicy.GetConstrains(), m_currentrule.m_pswhistory, utf8(m_currentrule.m_winpassword), result_.m_value);

		if (!result_.m_isvalid)
			result_.m_policy_desc = password_policy_wexplanation::getPolicyExplanation(keyvalues_, pswpolicy);
	}

}//namespace passwordpolicy

namespace password_policy_wexplanation {
	void jsonObj2policyExplanation(__in const Json::Value& v_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_)
	{
		rv_keyvalues_.clear();

		const Json::Value& root = v_[JSON_OBJ_EXPLANATION];
		if (root.empty())
		{
			return;
		}

		password_policy_wexplanation::keyvalues_t rv;
		Json::Value::Members members = root.getMemberNames();

		for (Json::Value::Members::const_iterator it = members.begin(); it != members.end(); ++it)
		{
			const Json::Value& currentMember = *it;

			string_t key = currentMember.asString();
			Json::Value value = root.get(key, Json::Value());

			rv_keyvalues_[value.asUInt()] = utf8(key);

		} // for

	} // policyExplanation2JsonObj()

	void jsonStr2KeyValuesNoThrow(__in const string_t& jsonStr_, __out password_policy_wexplanation::keyvalues_t& rv_keyvalues_)
	{
		rv_keyvalues_.clear();

		// 1. Parse string.

		Json::Value root;
		bool rootHasData = jsonSTR2VALUE(jsonStr_, root);
		if (!rootHasData)
		{
			return;
		}

		// 2.

		password_policy_wexplanation::jsonObj2policyExplanation(root, rv_keyvalues_);

	} //jsonStr2KeyValuesNoThrow()

	void policyExplanation2jsonObj(__in const password_policy_wexplanation::keyvalues_t& keyvalues_, __inout Json::Value& rv_)
	{
		Json::Value& root = rv_[JSON_OBJ_EXPLANATION];

		for (password_policy_wexplanation::keyvalues_t::const_iterator it = keyvalues_.begin(); it != keyvalues_.end(); ++it)
		{
			const UINT& key = (*it).first;
			const wstring_t& value = (*it).second;

			root[utf8(value)] = Json::UInt(key);
		}//for.keyvalues_

	}//policyExplanation2jsonObj()
}
