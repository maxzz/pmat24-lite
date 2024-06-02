//#include "ots_password_policy.h"
//
// #pragma once

// #include <wincrypt.h>
// #include <time.h>
// #include <locale>
// #include "transform_json.h"
// #include <random>
// #include "changepassword_policyoptions.h"

// namespace password
// {
	// enum POLICYTYPE {
	// 	none,
	// 	verify,				// TODO: describe
	// 	generate,			// TODO: describe
	// };

	// enum CHARSETTYPE {
	// 	alphanumeric,		// TODO: describe
	// 	alpha,				// TODO: describe
	// 	numeric,			// TODO: describe
	// 	withspecial,		// TODO: describe
	// 	atleastonenumber,	// TODO: describe
	// };

	// enum RESTRICTTYPE {
	// 	no_restrictions,    // Nothing specified.
	// 	different_wp,       // Different from window password.
	// 	different_ap,       // Different from any password.
	// 	different_pp,       // Different from previous password.
	// };

	// class policy_t {
	// public:

        /** / done
		policy_t() : 
            m_type(POLICYTYPE::none), 
            m_minLength(0), 
            m_maxLength(0), 
            m_simpleChSet(CHARSETTYPE::alphanumeric), 
            m_constrains(RESTRICTTYPE::no_restrictions), 
            m_useExt(false)
		{
		}
        /**/

        /** / done
		// Default policy constructor #### defaultpolicy ####
		policy_t(POLICYTYPE type_) : 
            m_type(type_), 
            m_minLength(0), 
            m_maxLength(0), 
            m_simpleChSet(CHARSETTYPE::alphanumeric), 
            m_constrains(RESTRICTTYPE::no_restrictions), 
            m_useExt(false)
        {
			m_simpleChSet = CHARSETTYPE::withspecial;
			m_constrains = RESTRICTTYPE::different_ap;

			switch (type_) {
				case POLICYTYPE::none:
					break;
				case POLICYTYPE::verify:
					m_minLength = 8;
					m_maxLength = 32;
					break;
				case POLICYTYPE::generate:
					m_minLength = 16;
					m_maxLength = 16;
					break;
			}
		}
        /**/

        /** / done
		// Constructor from #### policyFromString ####
		policy_t(__in const string_t& v_, POLICYTYPE type = POLICYTYPE::none) : policy_t(type) {
			string_t policySimple, policyExt;
			compatibility_split_policy(v_, policySimple, policyExt);

			policyFromStringSimple(policySimple);
			policyFromStringExtended(policyExt);
		}
        /**/

        /** / I don't know what this is for
		// Contructor from optionsdata_t #### optionsData2PasswordPolicy ####
		policy_t(__in const passwordpolicy::optionsdata_t& optionsdata_, __in password::POLICYTYPE policyType_) : policy_t(policyType_) {
			if (!optionsdata_.IsCurrentRuleBlank()) {
				if (optionsdata_.IsCurrentRuleCustom()) {
					m_useExt = optionsdata_.IsCurrentRuleCustom();
					m_policyExt = utf8(optionsdata_.GetCurrentRuleCustomRule());
				}
				else
					m_simpleChSet = static_cast<password::CHARSETTYPE>(strings::conv_int(optionsdata_.GetCurrentRuleMix()));

				m_minLength = optionsdata_.GetGetCurrentRuleMinLength();
				m_maxLength = optionsdata_.GetGetCurrentRuleMaxLength();
				m_constrains = static_cast<password::RESTRICTTYPE>(strings::conv_int(optionsdata_.GetGetCurrentRuleRestriction()));
			}
		}
        /**/

        /** / No need
		policy_t(
            POLICYTYPE type, 
            RESTRICTTYPE constrains, 
            CHARSETTYPE constrainSet, 
            UINT minLength, 
            UINT maxLength, 
            bool useExt = false, 
            const string_t& policyExt = ""
        ) : policy_t(type)
        {
			m_type = type;
			if (m_type != POLICYTYPE::none) {
				m_constrains = constrains;
				m_simpleChSet = constrainSet;
				m_minLength = minLength;
				m_maxLength = maxLength;
				m_useExt = useExt;
				if (m_useExt)
					m_policyExt = policyExt;
			}
		}
        /**/

        /** / No need
		policy_t(const policy_t& rhs) {
			m_type = rhs.m_type;
			m_constrains = rhs.m_constrains;
			m_simpleChSet = rhs.m_simpleChSet;
			m_minLength = rhs.m_minLength;
			m_maxLength = rhs.m_maxLength;
			m_useExt = rhs.m_useExt;
			m_policyExt = rhs.m_policyExt;
		}
        /**/

        /** / done
		policy_t& operator=(const policy_t& rhs) {
			if (this != &rhs) {
				m_type = rhs.m_type;
				m_constrains = rhs.m_constrains;
				m_simpleChSet = rhs.m_simpleChSet;
				m_minLength = rhs.m_minLength;
				m_maxLength = rhs.m_maxLength;
				m_useExt = rhs.m_useExt;
				m_policyExt = rhs.m_policyExt;
			}
			return *this;
		}
        /**/

        /** / done
		string_t policyToStringSimple() const {
			std::ostringstream os;

			switch (m_type) {
				case POLICYTYPE::none: return "";
				case POLICYTYPE::verify: os << "[p4]v:"; break;
				case POLICYTYPE::generate: os << "[p4]g:"; break;
			}//switch

			os << strings::conv_int(m_minLength) << ":" << strings::conv_int(m_maxLength) << ":" << charsetcast(m_simpleChSet) << ":" << conv_constrains_t(m_constrains);
			return os.str();
		}

		string_t policyToString() const {
			string_t rvSimple = policyToStringSimple();
			string_t rvExt = policyToStringExtended();

			string_t rv;
			compatibility_combine_policy(rv, rvSimple, rvExt);
			return rv;
		}
        /**/

        /** / done
		static void compatibility_split_policy(__in const string_t& policy_, __out string_t& policyOld_, __out string_t& policyExt_) {
			// 0. Split policy_ in policyOld_ and policyNew_ to save as manifest fields: 'policy' and 'policy2'.
			// This call is for manifest_io, and for policy string parsing.
			policyOld_.clear();
			policyExt_.clear();

			if (policy_.empty())
				return;

			strings_t container;
			strings::unpack_by_separator(policy_, string_t(POLICY_SEPARATOR), container);

			for (strings_t::const_iterator it = container.begin(); it != container.end(); ++it) {
				const string_t& currentPart = *it;

				if (stringlexeme(currentPart, 0, "[p4]")) {  // policy with 4 elements.
					policyOld_ = currentPart;
				}
				else if (stringlexeme(currentPart, 0, "[e1]")) { // policy extension version 1.
					policyExt_ = currentPart;
				}
			}
		}

		static void compatibility_combine_policy(__inout string_t& policy_, __in const string_t& policyOld_, __in const string_t& policyExt_) {
			// 0. Combine policyOld_ and policyNew_ policies into policy_ after manifest was loaded.
			// This call is for manifest_io only.

			if (!policyOld_.empty()) {
				if (policy_.empty())
					policy_ = policyOld_;
				else
					policy_ = policyOld_ + POLICY_SEPARATOR + policy_;
			}

			if (!policyExt_.empty()) {
				if (policy_.empty())
					policy_ = policyExt_;
				else
					policy_ = policy_ + POLICY_SEPARATOR + policyExt_;
			}
		}
        /**/

        /** / done
		bool IsValifPolicy() const {
			return 
				!((!m_useExt && m_type == password::POLICYTYPE::none) ||   // Simple without policy type - Invalid
				  (m_useExt && m_policyExt.empty()));                      // Extended without pattern text - Invalid
		}
        /**/
		
        /** / done
		POLICYTYPE GetPolicyType()      const { return m_type; }
		bool IsPolicyToGenerate()       const { return m_type == POLICYTYPE::generate; }
		bool IsPolicyToVerify()         const { return m_type == POLICYTYPE::verify; }
		bool IsEmptyPolicy()            const { return m_type == POLICYTYPE::none; }
		RESTRICTTYPE GetConstrains()    const { return m_constrains; }
		CHARSETTYPE GetSimpleCharSet()  const { return m_simpleChSet; }
		bool IsExtendedPolicy()         const { return m_useExt; }
		string_t GetExtendedPolicyStr() const { return m_policyExt; }
		UINT GetMinLength()             const { return m_minLength; }
		UINT GetMaxLength()             const { return m_maxLength; }
        /**/

        /** / done; for manifest_io, but I don't know what this is for
		static void compatibility_split_optionsFromPolicy(__inout string_t& customRuleOptions_, __inout string_t& policyText_) {
			// 0. Splits custom rule options from policy (if available).
			//
			// NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
			// until we split. So, we split the policy string and if it contains custom rule
			// then we split custom rule options from the policy string before combining policy back.

			if (policyText_.empty()) // 1. Check if we have any policy to split.
				return;

			password::policy_t policy(policyText_, POLICYTYPE::none); // 2. Check if policy string has custom rule.
			if (!policy.IsExtendedPolicy())
				return;

			updateCustomRulePolicyOptionsFromText(policy.m_policyExt, customRuleOptions_); // 3. Update custom rule options and custom rule policy text.
			policyText_ = policy.policyToString(); // 4. Combine policy text back without custom rule options in it.
		}

		static void compatibility_combine_optionsToPolicy(__in const string_t& customRuleOptions_, __inout string_t& policyStr_) {
			// 0. Combines custom rule options to policy (if applicable).
			//
			// NOTE: Unfortunately, we do not know whether policy has extended (custom) rule 
			// until we split. So, we split the policy string and if it contains custom rule
			// then we add custom rule options to the policy string then combine back.

			if (customRuleOptions_.empty()) // 1. Check if we have any custom rule options to combine.
				return;

			password::policy_t policy(policyStr_, POLICYTYPE::none);// 2. Check if policy string has custom rule.
			if (!policy.IsExtendedPolicy())
				return;

			setCustomRulePolicyOptionsToText(customRuleOptions_, policy.m_policyExt);
			policyStr_ = policy.policyToString();
		}
        /**/

        /** / done
	private:
		POLICYTYPE   m_type;        // This is for simple and complex policy.
		RESTRICTTYPE m_constrains;  // This is for simple and complex policy.

		CHARSETTYPE  m_simpleChSet;	// This is for simple policy only.

		UINT         m_minLength;   // This is for simple and complex policy.
		UINT         m_maxLength;   // This is for simple and complex policy.

		bool         m_useExt;       // Is extended policy in effective now?
		string_t     m_policyExt;    // Extended policy string.
		//string_t    m_polExtOptions;// Extended policy options string: Prevent successive repeat of same character, Prevent character in same position from recent password.

		static char* POLICY_SEPARATOR; // "EXtended POlicy". keep the length less then 8.
		static char* TOKEN_PREVENT_CHARACTERREPEAT;
		static char* TOKEN_PREVENT_CHARACTERPOSITION;
        /**/

        /** / done
		void  policyFromStringSimple(__in const string_t& v_) {
			if (v_.empty())
				return;

			strings_t ss;
			strings::split_abs(v_, string_t(":"), ss);

			if (ss.size() != 5)
				return;

			if (ss[0] == "[p4]v")
				m_type = POLICYTYPE::verify;
			else if (ss[0] == "[p4]g")
				m_type = POLICYTYPE::generate;
			else
				return;

			m_minLength = strings::conv_int(ss[1]);
			m_maxLength = strings::conv_int(ss[2]);
			m_simpleChSet = charsetcast(ss[3]);
			m_constrains = conv_constrains_t(ss[4]);
		}

		void policyFromStringExtended(__in const string_t& v_) {
			m_useExt = false;
			m_policyExt.clear();

			if (v_.empty() || v_.length() < 4)
				return;

			string_t v = v_;

			string_t policyPF = v.substr(0, 6);
			if (policyPF == "[e1]v:")
				m_type = POLICYTYPE::verify;
			else if (policyPF == "[e1]g:")
				m_type = POLICYTYPE::generate;
			else {
				m_type = POLICYTYPE::none;
				return;
			}

			v.replace(0, 6, "");

			m_useExt = true;
			m_policyExt = v;

			getExtendedParts(v, m_policyExt, m_minLength, m_maxLength);
		} // policyFromStringExtended()

		string_t policyToStringExtended() const {
			string_t rv;
			if (m_useExt) {
				switch (m_type) {
					case POLICYTYPE::none:
						return rv;
					case POLICYTYPE::verify:
						rv = "[e1]v:";
						break;
					case POLICYTYPE::generate:
						rv = "[e1]g:";
						break;
				}
			}
			rv += sformat("%s<%d,%d>", m_policyExt, m_minLength, m_maxLength);
			return rv;
		}
        /**/

        /** / done
		static CHARSETTYPE charsetcast(__in const string_t& v_) {
			CHARSETTYPE rv;
			if (v_.empty())
				rv = CHARSETTYPE::alphanumeric;
			else if (v_ == "alpha")
				rv = CHARSETTYPE::alpha;
			else if (v_ == "numeric")
				rv = CHARSETTYPE::numeric;
			else if (v_ == "withspecial")
				rv = CHARSETTYPE::withspecial;
			else if (v_ == "atleastonenumber")
				rv = CHARSETTYPE::atleastonenumber;
			else
				rv = CHARSETTYPE::alphanumeric;
			return rv;
		}

		static string_t charsetcast(__in const CHARSETTYPE v_) {
			string_t rv;
			switch (v_) {
				case CHARSETTYPE::alphanumeric:
				default: break;
				case CHARSETTYPE::alpha:            rv = "alpha"; break;
				case CHARSETTYPE::numeric:          rv = "numeric"; break;
				case CHARSETTYPE::withspecial:      rv = "withspecial"; break;
				case CHARSETTYPE::atleastonenumber: rv = "atleastonenumber"; break;
			}//switch
			return rv;
		}

		static RESTRICTTYPE conv_constrains_t(__in const string_t& v_) {
			RESTRICTTYPE rv;
			if (v_.empty()) rv = RESTRICTTYPE::no_restrictions;
			else if (v_ == "different_wp")
				rv = RESTRICTTYPE::different_wp;
			else if (v_ == "different_ap")
				rv = RESTRICTTYPE::different_ap;
			else if (v_ == "different_pp")
				rv = RESTRICTTYPE::different_pp; else rv = RESTRICTTYPE::no_restrictions;
			return rv;
		}

		static string_t conv_constrains_t(__in const RESTRICTTYPE v_) {
			string_t rv;
			switch (v_) {
				case RESTRICTTYPE::no_restrictions:
				default: break;
				case RESTRICTTYPE::different_wp: rv = "different_wp"; break;
				case RESTRICTTYPE::different_ap: rv = "different_ap"; break;
				case RESTRICTTYPE::different_pp: rv = "different_pp"; break;
			}//switch
			return rv;
		}
        /**/

        /** / done
		static void getExtendedParts(__in const string_t& v_, __out string_t& patternPart_, __inout UINT& minlength_, __inout UINT& maxlength_)
		{
			if (v_.empty())
				return;

			string_t::size_type beginpos = v_.rfind('<');
			if (beginpos == string_t::npos) {
				patternPart_ = v_;
				return;
			}

			string_t::size_type endpos = v_.find('>', beginpos);
			if (endpos == string_t::npos) {
				patternPart_ = v_;
				return;
			}

			string_t minmaxvalue = v_.substr(beginpos + 1, endpos - beginpos - 1);
			if (minmaxvalue.empty()) {
				patternPart_ = v_;
				return;
			}

			strings_t values;
			strings::split(minmaxvalue, string_t(1, ','), values);

			if (values.size() != 2) {
				patternPart_ = v_;
				return;
			}

			patternPart_ = v_;
			patternPart_.replace(beginpos, endpos - beginpos + 1, "");
			minlength_ = strings::conv_int(values[0]);
			maxlength_ = strings::conv_int(values[1]);
		}
        /**/

        /** / done; for manifest_io, but I don't know what this is for
		// Checks custom rule prepended tokens '~', '&' then 
		// places the information in JSON text within m_polExtOptions.
		// ~&<custom rule text>

		static void updateCustomRulePolicyOptionsFromText(__inout string_t& updCustomRuleText_, __inout string_t& updCustomRulePolicyOptions_) {
			if (updCustomRuleText_.length() < 2)
				return;

			string_t::size_type pos_preventcharrepeat = string_t::npos;
			string_t::size_type pos_preventcharposition = string_t::npos;

			string_t substr_customRule;
			if (updCustomRuleText_.length() > 2) {
				substr_customRule = updCustomRuleText_.substr(0, 2);

				bool istoken_charset =
					substr_customRule[0] == '[' || substr_customRule[0] == 'a' ||
					substr_customRule[0] == 'A' || substr_customRule[0] == 'd' ||
					substr_customRule[0] == 's';

				if (istoken_charset)
					substr_customRule.clear();
				else
				{
					pos_preventcharrepeat = substr_customRule.find(TOKEN_PREVENT_CHARACTERREPEAT);
					pos_preventcharposition = substr_customRule.find(TOKEN_PREVENT_CHARACTERPOSITION);
				}
			}

			bool preventcharrepeat = pos_preventcharrepeat != string_t::npos;
			bool preventcharposition = pos_preventcharposition != string_t::npos;

			Json::Value jsonRoot;
			jsonSTR2VALUE(updCustomRulePolicyOptions_, jsonRoot);

			jsonRoot["chgpolopts"]["norep"] = preventcharrepeat;
			jsonRoot["chgpolopts"]["chkppos"] = preventcharposition;

			jsonVALUE2STR(jsonRoot, updCustomRulePolicyOptions_);

			if (pos_preventcharrepeat != string_t::npos) {
				updCustomRuleText_.replace(pos_preventcharrepeat, 1, "");

				substr_customRule.replace(pos_preventcharrepeat, 1, "");
				pos_preventcharposition = substr_customRule.find(TOKEN_PREVENT_CHARACTERPOSITION);
			}

			if (pos_preventcharposition != string_t::npos)
				updCustomRuleText_.replace(substr_customRule.find(TOKEN_PREVENT_CHARACTERPOSITION), 1, "");
		}

		static void setCustomRulePolicyOptionsToText(__in const string_t& customRulePolicyOptions_, __inout string_t& customRuleText_) {
			if (customRulePolicyOptions_.empty())
				return;

			bool customruleopt_norep, customruleopt_chkpos;
			customruleopt_norep = customruleopt_chkpos = false;

			Json::Value jsonRoot;
			jsonSTR2VALUE(customRulePolicyOptions_, jsonRoot);
			Json::Value& jsonExtOptions = jsonRoot.get("chgpolopts", Json::Value());
			if (!jsonExtOptions.empty()) {
				customruleopt_norep = jsonExtOptions["norep"].asBool();
				customruleopt_chkpos = jsonExtOptions["chkppos"].asBool();
			}

			string_t::size_type pos_preventcharrepeat = string_t::npos;
			string_t::size_type pos_preventcharposition = string_t::npos;

			string_t substr_customRule;
			if (customRuleText_.length() > 2) {
				substr_customRule = customRuleText_.substr(0, 2);

				bool istoken_charset =
					substr_customRule[0] == '[' || substr_customRule[0] == 'a' ||
					substr_customRule[0] == 'A' || substr_customRule[0] == 'd' ||
					substr_customRule[0] == 's';

				if (istoken_charset)
					substr_customRule.clear();
				else {
					pos_preventcharrepeat = substr_customRule.find(TOKEN_PREVENT_CHARACTERREPEAT);
					pos_preventcharposition = substr_customRule.find(TOKEN_PREVENT_CHARACTERPOSITION);
				}
			}

			if (customruleopt_norep) { // Check 'Prevent two identical consecutive characters' option.
				if (pos_preventcharrepeat == string_t::npos)
					customRuleText_ = TOKEN_PREVENT_CHARACTERREPEAT + customRuleText_;
			}
			else { // Update text since option is false
				if (pos_preventcharrepeat != string_t::npos) {
					string_t::size_type pos = substr_customRule.find(TOKEN_PREVENT_CHARACTERREPEAT);

					customRuleText_.replace(pos, 1, "");
					substr_customRule.replace(pos, 1, "");
				}
			}

			if (customruleopt_chkpos) { // 'Prevent character in same position' option.
				if (pos_preventcharposition == string_t::npos)
					customRuleText_ = TOKEN_PREVENT_CHARACTERPOSITION + customRuleText_;
			}
			else { // Update text since option is false
				if (pos_preventcharposition != string_t::npos)
					customRuleText_.replace(substr_customRule.find(TOKEN_PREVENT_CHARACTERPOSITION), 1, "");
			}
		}
        /**/
//	}; //class policy_t

        /** / I don't know what this is for
__declspec(selectany) char* policy_t::POLICY_SEPARATOR = "#expo#"; // "EXtended POlicy". keep the length less then 8.
__declspec(selectany) char* policy_t::TOKEN_PREVENT_CHARACTERREPEAT = "~";
__declspec(selectany) char* policy_t::TOKEN_PREVENT_CHARACTERPOSITION = "&";
        /**/

	// namespace utils
	// {

        /** / done
		const string_t SET_AlphaLower("abcdefghikjlmnopqrstuvwxyz");
		const string_t SET_AlphaUpper("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
		const string_t SET_AlphaBoth("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz");
		const string_t SET_Numeric("0123456789");
		const string_t SET_Special("!\"#$%&'()*+,-./:;<=>?[\\]^_`{|}~@");
		const string_t SET_AlphaNumeric = SET_AlphaBoth + SET_Numeric;
		const string_t SET_AlphaNumericSpecial = SET_AlphaNumeric + SET_Special;
        /**/

        /** / done
		inline size_t getRandomInRange(size_t min_, size_t max_) throw(...)
		{
			// 0. Generate a number in range min and max.

			if (min_ > max_)
			{
				throw std::runtime_error("inv.r.bounds");
			}

			// TODO: Random device is slow and expensive to create so
			// we should avoid calling multiple times.
			std::random_device rd;
			std::mt19937 mt(rd()); // mersenne twister engine.

			std::uniform_int_distribution<size_t>dist(min_, max_);
			size_t rv = dist(mt);

			//size_t rv = min_ + getRandom(max_ - min_);
			return rv;
		}
        /**/

        /** / done
		template <typename stringT>
		void genSubSet(__in const stringT& buildFromChars_, __in const stringT& excludeChars_, __in size_t pswLength_, __inout stringT& rv_psw_) throw(...)
		{
			if (pswLength_ <= 0)
			{
				throw std::runtime_error("inv.arg.length");
			}

			stringT combinedSubset;

			for (stringT::const_iterator it = buildFromChars_.begin(); it != buildFromChars_.end(); ++it)
			{
				const stringT::traits_type::char_type& currentChar = *it;

				if (excludeChars_.find_first_of(currentChar) == stringT::npos)
				{
					combinedSubset += currentChar;
				}

			}//for

			if (combinedSubset.empty())
			{
				throw std::runtime_error("empty.comb.set");
			}

			HCRYPTPROV hCryptProv = NULL;

			if (!CryptAcquireContext(&hCryptProv, NULL, NULL, PROV_RSA_FULL, CRYPT_VERIFYCONTEXT))
			{
				com::_com_test_error(HRESULT_FROM_WIN32(GetLastError()));
			}

			bytebuffer_t szBuffer(pswLength_ + 1);
			szBuffer.securezeromemory();

			bool isGenerated = CryptGenRandom(hCryptProv, (DWORD)pswLength_, szBuffer.v) == TRUE;
			if (isGenerated)
			{
				size_t subSetLen = combinedSubset.length();
				for (size_t i = 0; i < pswLength_; i++)
				{
					rv_psw_ += combinedSubset[szBuffer.v[i] % subSetLen];
				}
			}

			szBuffer.securezeromemory();

			CryptReleaseContext(hCryptProv, 0);

		}
        /**/

        /** / done
		inline string_t genAlphaNumeric(__in size_t pswLength_)
		{
			//return genPswBySet(SET_AlphaNumeric, pswLength_);

			//string_t alphaL; genPswBySet(SET_AlphaLower, pswLength_, alphaL);
			//string_t alphaU; genPswBySet(SET_AlphaUpper, pswLength_, alphaU);
			//string_t numeric; genPswBySet(SET_Numeric, pswLength_, numeric);

			const string_t excludeCharsNone;
			string_t alphaL; genSubSet(SET_AlphaLower, excludeCharsNone, pswLength_, alphaL);
			string_t alphaU; genSubSet(SET_AlphaUpper, excludeCharsNone, pswLength_, alphaU);
			string_t numeric; genSubSet(SET_Numeric, excludeCharsNone, pswLength_, numeric);

			string_t rv_psw;

			// Do until we have password containing all character sets to be used.
			// NOTE: If length <= 2 then we cannot ensure so we ensure: lower/upper + numeric.
			string_t newSubSet(alphaL + alphaU + numeric);

			bool doAgain = true;
			do {

				rv_psw.clear();
				//genPswBySet(newSubSet, pswLength_, rv_psw);

				genSubSet(newSubSet, string_t(), pswLength_, rv_psw);

				// Check whether we should iterate again to generate an 
				// acceptable mix of value.
				if (pswLength_ > 2)
				{
					// Should have all mix: numeric, lower and upper alphabet.
					doAgain = rv_psw.find_first_of(utils::SET_Numeric) == -1 ||
						      rv_psw.find_first_of(utils::SET_AlphaLower) == -1 ||
							  rv_psw.find_first_of(utils::SET_AlphaUpper) == -1;
				}
				else
				if (pswLength_ == 2)
				{
					// Should have atleast: numeric and lower/upper alphabet.
					doAgain = rv_psw.find_first_of(utils::SET_Numeric) == -1 ||
						      (rv_psw.find_first_of(utils::SET_AlphaLower) == -1 &&
						       rv_psw.find_first_of(utils::SET_AlphaUpper) == -1 );
				}
				else
				{
					// Should have atleast: numeric or lower or upper alphabet.
					doAgain = rv_psw.find_first_of(utils::SET_Numeric) == -1 &&
						      rv_psw.find_first_of(utils::SET_AlphaLower) == -1 &&
							  rv_psw.find_first_of(utils::SET_AlphaUpper) == -1;
				}

			} while (doAgain);

			return rv_psw;
		} //genAlphaNumeric()
        /**/

        /** / done
		inline string_t genAlpha(__in size_t pswLength_)
		{
			string_t rv_psw;
			//genPswBySet(SET_AlphaBoth, pswLength_, rv_psw);

			genSubSet(SET_AlphaBoth, string_t(), pswLength_, rv_psw);
			return rv_psw;
		}

		inline string_t genNumeric(__in size_t pswLength_)
		{
			string_t rv_psw;
			//genPswBySet(SET_Numeric, pswLength_, rv_psw);

			genSubSet(SET_Numeric, string_t(), pswLength_, rv_psw);
			return rv_psw;
		}

		inline string_t genSpecial(__in size_t pswLength_)
		{
			string_t rv_psw;
			//genPswBySet(SET_Special, pswLength_, rv_psw); // changed this from SET_AlphaNumericSpecial to SET_Special - mw 11/22/2004 6:24:10 PM

			genSubSet(SET_Special, string_t(), pswLength_, rv_psw);

			return rv_psw;
		}
        /**/

        /** / done
		template<typename stringT>
		inline void randomizeCharsInString(__inout stringT& v_)
		{
			// 0. Randomize password string within its length.

			size_t strLen = v_.length();
			if (strLen <= 0)
			{
				return;
			}

			HCRYPTPROV hCryptProv = NULL;
			TRY_TM()
			{
				if (!CryptAcquireContext(&hCryptProv, NULL, NULL, PROV_RSA_FULL, CRYPT_VERIFYCONTEXT))
				{
					com::_com_test_error(HRESULT_FROM_WIN32(GetLastError()));
				}

				bytebuffer_t szBuffer(strLen + 1);
				szBuffer.securezeromemory();

				bool isGenerated = CryptGenRandom(hCryptProv, (DWORD)strLen, szBuffer.v) == TRUE;
				if (isGenerated)
				{
					size_t i = 0;

					for (stringT::iterator it = v_.begin(); it != v_.end(); ++it)
					{
						size_t index = szBuffer.v[i++] % strLen;

						stringT::traits_type::char_type& current = *it;

						stringT::traits_type::char_type chTemp = v_[index];
						v_[index] = current;
						current = chTemp;
					}
				}

				szBuffer.securezeromemory();
			}
			CATCH_TM("randChInStr")

			CryptReleaseContext(hCryptProv, 0);

		} //randomizeCharsInString()
        /**/

        /** / done
		inline string_t genAlphaNumSpecial(__in size_t pswLength_)
		{
			// 0. The goal is to generate password containing alpha, number and special.
			// Characters from each set should exist. Otherwise, atleast 1 from each set 
			// should exist (i.e. alpha, numeric and symbol).
			
			// 1. Determine length of each character set to generate.
			//
			// To ensure we have atleast: 1 upper, 1 lower and 1 number.
			size_t specialLen = (pswLength_ > 3) ? getRandomInRange(1, pswLength_ - 3) : 1;			
			size_t alphaNumericLen = pswLength_ - specialLen;

			// 2. Generate characters by upper boundary.
			string_t rv_psw;
			if (alphaNumericLen > 0)
			{
				rv_psw += genAlphaNumeric(alphaNumericLen);
			}

			if (specialLen > 0)
			{
				rv_psw += genSpecial(specialLen);
			}
			
			// 3. Randomize characters in place.
			randomizeCharsInString(rv_psw);

			// genPswBySet(SET_AlphaNumericSpecial, pswLength_, rv_psw);
			return rv_psw;
		}
        /**/

		/////////////////////////////////////////////////////////////////////

        /** / done
		inline bool hasAdjacentDigits(__in const string_t& psw_)
		{
			// 0. To validate whether the password has any adjacentdigits. Used for verification purpose.

			bool isPrevDigit = false;
			for (string_t::const_iterator it = psw_.begin(); it != psw_.end(); ++it)
			{
				const char& currentChar = *it;

				bool isCurrDigit = isdigit(currentChar) != 0;
				if (isCurrDigit && isPrevDigit)
				{
					return true;
				}

				isPrevDigit = isCurrDigit;
			}//for

			return false;
		}
        /**/

        /** / done
		template <typename stringT>
		inline bool hasDuplicateChars(__in const stringT& psw_)
		{
			// 0. To validate whether password has any duplicate characters: letters or digits or symbols.

			typedef std::map<stringT::traits_type::char_type, bool> charCount_t;
			charCount_t charCount;

			for (stringT::const_iterator it = psw_.begin(); it != psw_.end(); ++it)
			{
				const stringT::traits_type::char_type& currentChar = *it;

				charCount_t::iterator itCount = charCount.find(currentChar);
				if (itCount != charCount.end())
				{
					return true;
				}

				charCount[currentChar] = true;
			}//for
			
			return false;
		}
        /**/

		/////////////////////////////////////////////////////////////////////

        /** / done
		inline string_t removeDuplicateChars(__in const string_t& psw_)
		{
			// 0. To idenitfy and replace any duplicate character with its corresponding unused set.
			// i.e. Any duplicate of letter will be replaced with its corresponding unused set of letters.
			// Similary digits and symbols will be replaced with its corresponding unused 
			// set of digits and symbols respectively.

			// 0. Fiter out duplication of characters and generate new one from the same character type set.

			string_t rv_psw = psw_;

			// 1. Set include character set i.e. Alpha upper/lower or digit or special.

			string_t includeSet;

			if (rv_psw.find_first_of(utils::SET_AlphaLower) != string_t::npos)
			{
				includeSet += utils::SET_AlphaLower;
			}

			if (rv_psw.find_first_of(utils::SET_AlphaUpper) != string_t::npos)
			{
				includeSet += utils::SET_AlphaUpper;
			}

			if (rv_psw.find_first_of(utils::SET_Numeric) != string_t::npos)
			{
				includeSet += utils::SET_Numeric;
			}

			if (rv_psw.find_first_of(utils::SET_Special) != string_t::npos)
			{
				includeSet += utils::SET_Special;
			}

			// 2. Cache all characters and their indexes.

			typedef std::vector<int> indexes_t;
			typedef std::map<char, indexes_t> charIndexes_t;
			charIndexes_t charIndexes;

			string_t excludeSet;
			int curIndex = 0;

			for (string_t::const_iterator it = rv_psw.begin(); it != rv_psw.end(); ++it, curIndex++)
			{
				const char& currentChar = *it;

				excludeSet += currentChar; // Add the current one to excluded set. It may contain duplicates but it does not matter.

				charIndexes[currentChar].push_back(curIndex);

				string_t::size_type pos = includeSet.find(currentChar);
				if (pos != string_t::npos)
				{
					includeSet.replace(pos, 1, "");
				}

			}//for

			// 2. Identify characters with duplicates and re-generate new character of the same type excluding 
			// previously used characters of the same type.

			for (charIndexes_t::iterator it = charIndexes.begin(); it != charIndexes.end(); ++it)
			{
				const char& currentChar = (*it).first;
				indexes_t& currentIndexes = (*it).second;

				// 2.1 More than 1 index mean we have duplicates.

				if (currentIndexes.size() == 1)
				{
					continue;
				}

				// 2.3 Generate new character for each occurence of character excluding the generated one.
				// NOTE: Skip the first entry as it is the first occurence.

				for (indexes_t::iterator itIdx = currentIndexes.begin()+1; itIdx != currentIndexes.end(); ++itIdx)
				{
					int& currentIndex = *itIdx;

					string_t value;
					utils::genSubSet(includeSet, excludeSet, 1, value);
					char currentChar = value[0];

					rv_psw[currentIndex] = currentChar;

					excludeSet += currentChar; // Add current character to exclude range.
				}//for

			}//for


			return rv_psw;
		} //removeDuplicateChars()
        /**/

//	} //namespace utils

	/////////////////////////////////////////////////////////////////////////

    /** / done
	class verify_t {
		//TODO: We need to generate explanation to user why policy verification failed. Later.
	public:
		bool operator()(__in const policy_t& policy_, __in const string_t& psw_) {
			atltrace::scope_t scope("verPol");
			
			if (psw_.length() < policy_.GetMinLength() || psw_.length() > policy_.GetMaxLength()) {
				atltrace::error("inv.pol.length");
				return false;
			}

			// Never check duplication of characters during password verification.
			//if (policy_.m_noduplicate && utils::hasDuplicateChars(psw_))
			//{
			//	atltrace::error("Password with duplicate chars.");
			//	return false;
			//}

			switch (policy_.GetSimpleCharSet()) {
				case CHARSETTYPE::alphanumeric:
					if (psw_.find_first_not_of(utils::SET_AlphaNumeric) != -1) { // 1. We should validate whether the input string contains any characters other than alpha and numberic.
						atltrace::error("utils::SET_AlphaNumeric");
						return false;
					}

					if (psw_.find_first_of(utils::SET_AlphaBoth) == -1) { // 2. Should also validate whether the input string has both: alpha and numeric characters.
						atltrace::error("no letter in the password");
						return false;
					}

					if (psw_.find_first_of(utils::SET_Numeric) == -1) {
						atltrace::error("no number in the password");
						return false;
					}

					//if (utils::hasAdjacentDigits(psw_)) {
					//	atltrace::error("Password with adjacent digits.");
					//	return false;
					//}
					break;
				case CHARSETTYPE::alpha:
					if (psw_.find_first_not_of(utils::SET_AlphaBoth) != -1) {
						atltrace::error("alpha/utils::SET_AlphaBoth");
						return false;
					}
					break;
				case CHARSETTYPE::numeric:
					if (psw_.find_first_not_of(utils::SET_Numeric) != -1) {
						atltrace::error("numeric/utils::SET_Numeric");
						return false;
					}
					break;
				case CHARSETTYPE::withspecial:
					if (psw_.find_first_not_of(utils::SET_AlphaNumericSpecial) != -1) {
						atltrace::error("withspecial/utils::SET_AlphaNumericSpecial");
						return false;
					}

					if (psw_.find_first_of(utils::SET_Special) == -1) {
						atltrace::error("no spec character in the password");
						return false;
					}
					break;
				case CHARSETTYPE::atleastonenumber:
					if (psw_.find_first_not_of(utils::SET_AlphaNumeric) != -1) {
						atltrace::error("atleastonenumber/utils::SET_AlphaNumeric");
						return false;
					}

					if (psw_.find_first_of(utils::SET_AlphaBoth) == -1) {
						atltrace::error("no letter in the password");
						return false;
					}

					if (psw_.find_first_of(utils::SET_Numeric) == -1) {
						atltrace::error("no digit in the password");
						return false;
					}
					break;
				default:
					atltrace::error(wformat(L"Inv.pol.mix=%d", (int)policy_.GetSimpleCharSet()));
			}

			scope.text("ok");
			return true;
		}

	}; //class verify_t
    /**/

    /** / done
	class generate_t
	{
	public:
		string_t operator()(__in const policy_t& policy_) {
			//srand(GetTickCount());
			//int pwdlen = static_cast<int>((policy_.maxlength - policy_.minlength + 1) * rand() / (RAND_MAX + 1) + policy_.minlength);

			// Check whether min is lower than max.
			if (policy_.GetMinLength() > policy_.GetMaxLength())
				return "";

			//utils::reinitRandom();
			size_t finalPswLength = utils::getRandomInRange(policy_.GetMinLength(), policy_.GetMaxLength());

			string_t rv_psw;
			// We skip duplicate check if the password length is more than the character set length.
			// To avoid exception when there are no unique characters within a set.
			bool skipDuplicates = false;

			switch (policy_.GetSimpleCharSet()) {
				case CHARSETTYPE::alphanumeric:
					rv_psw = utils::genAlphaNumeric(finalPswLength); // Initially, generate alpha numeric string.
					//rv_psw = utils::removeAdjacentDigits(rv_psw); //// Next, resolve adjacent digits.
					skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
					break;
				case CHARSETTYPE::alpha:
					rv_psw = utils::genAlpha(finalPswLength);
					skipDuplicates = finalPswLength > utils::SET_AlphaBoth.length();
					break;
				case CHARSETTYPE::numeric:
					rv_psw = utils::genNumeric(finalPswLength);
					skipDuplicates = finalPswLength > utils::SET_Numeric.length();
					break;
				case CHARSETTYPE::withspecial:
					rv_psw = utils::genAlphaNumSpecial(finalPswLength);
					skipDuplicates = finalPswLength > utils::SET_AlphaNumericSpecial.length();
					break;
				case CHARSETTYPE::atleastonenumber:
					rv_psw = utils::genAlphaNumeric(finalPswLength); // generate N alphanumeric characters

					if (finalPswLength == 1) // If the password length is 1 then we should ignore above generated value and use the below one.
						rv_psw = utils::genNumeric(1); //generate 1 numeric character

					//string_t num = utils::genNumeric(1); //generate 1 numeric character
					//char currentChar = num[0];

					//// AndreyB: see a note above.
					//rv_psw.insert(utils::getRandom(rv_psw.length() + 1), 1, currentChar); //insert it to the random place
					skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
					break;
				default:
					atltrace::error(wformat(L"generate: Inv.pol.mix=%d", (int)policy_.GetSimpleCharSet()));
					rv_psw = utils::genAlphaNumeric(finalPswLength);
					skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
			}

			if (!skipDuplicates) // Next, always remove duplicate characters.
				rv_psw = utils::removeDuplicateChars(rv_psw);

			return rv_psw;
		} //operator()(const policy_t& policy_)

	}; //class generate_t
    /**/

//}//namespace password
