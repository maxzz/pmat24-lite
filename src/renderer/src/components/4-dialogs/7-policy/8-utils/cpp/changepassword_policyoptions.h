//#include "changepassword_policyoptions.h"
//
#pragma once

//#include "ots_password_policy.h"
// #include <json/json.h>

namespace password {
	class policy_t;
}

namespace password_policy_wexplanation {
	typedef std::map<UINT, wstring_t> keyvalues_t;
}

namespace passwordpolicy
{
	typedef std::map<wstring_t, string_t, strings::lesswstring_t> uioptions_t;

	/////////////////////////////////////////////////////////////////////////
	// result_t

	class result_t {
	public:
		wstring_t  m_value;
		Json::UInt m_strength;
		bool       m_isvalid;
		wstring_t  m_policy_desc;

		result_t(const wstring_t& value) : m_value(value), m_isvalid(true), m_strength(0) {}

		void result2jsonObj(__out Json::Value& rv_);
	};

	/////////////////////////////////////////////////////////////////////////
	// optionsdata_t

	class optionsdata_t {
	public:
		optionsdata_t(const uioptions_t& mix, const uioptions_t& restrictions) : m_mixoptions(mix), m_restrictions(restrictions) {}
		optionsdata_t(const password::policy_t& policy_);  // equivalent of PasswordPolicy2optionsData
		optionsdata_t(const wstring_t& policyStr_);        // equivalent of policyStr2optionsDataNoThrow
		optionsdata_t(const Json::Value& v_);              // equivalent of jsonObj2OptionsData

		uioptions_t   m_mixoptions;   // key, value => resource string, string form of password::CHARSETTYPE
		uioptions_t   m_restrictions; // key, value => resource string, string form of  RESTRICTTYPE

		void optionsData2jsonObj(Json::Value& rv_);
		void generatePassword(__out wstring_t& rv_password_);
		void verifyPassword(__in const password_policy_wexplanation::keyvalues_t& keyvalues_, __inout passwordpolicy::result_t& result_);

		bool      IsCurrentRuleBlank()           const { return m_currentrule.isblank(); }
		bool      IsCurrentRuleCustom()          const { return m_currentrule.m_iscustom; }
		wstring_t GetCurrentRuleCustomRule()     const { return m_currentrule.m_customrule; }
		string_t  GetCurrentRuleMix()            const { return m_currentrule.m_mix; }
		UINT      GetGetCurrentRuleMinLength()   const { return m_currentrule.m_minlength; }
		UINT      GetGetCurrentRuleMaxLength()   const { return m_currentrule.m_maxlength; }
		string_t  GetGetCurrentRuleRestriction() const { return m_currentrule.m_restriction;}
		bool      GetGetCurrentRuleIsGenerate() const { return m_currentrule.m_generate; }

		void      SetCurrentRuleWinPassword(const string_t& winPassword) {m_currentrule.m_winpassword = winPassword; }
		void      SetCurrentRulePasswordHistory(const wstrings_t& pswhistory) { m_currentrule.m_pswhistory = pswhistory; }

	private:
		void JsonObj2UIOptions(__in const Json::Value& JsonObj_);
		void JsonObj2currentRule(const Json::Value& v_);

		static void JSON2valuehistory(__in const Json::Value& jsonValueHistory_, __out wstrings_t& rv_values_);
		void UIOptions2JsonObj(__out Json::Value& rv_);
		void currentRule2JsonObj(Json::Value& rv_);
		void valuehistory2JSON(__out Json::Value& rv_);

		class currentrule_t {
		public:
			string_t     m_mix;            // Current mix option.
			string_t     m_restriction;    // Current Password constraint restriction option.
			Json::UInt	 m_minlength;      // Minimum length
			Json::UInt   m_maxlength;      // Maximum length
			bool         m_generate : 1;     // Generate or Verify password.
			bool         m_iscustom : 1;     // Is current rule: Custom or Simple?
			wstring_t    m_customrule;     // Custom rule.
			wstrings_t   m_pswhistory;     // Password history to validate against.
			string_t     m_winpassword;    // Windows password to validate against.

			currentrule_t() : m_minlength(0), m_maxlength(0), m_generate(false), m_iscustom(false) {}
			bool isblank() const {
				return m_mix.empty() && m_customrule.empty(); // We cannot have a current rule without either simple or custom rule set. If none of them are set then the rule is not set.
			}
		};

		currentrule_t m_currentrule;
	};

}//namespace passwordpolicy
