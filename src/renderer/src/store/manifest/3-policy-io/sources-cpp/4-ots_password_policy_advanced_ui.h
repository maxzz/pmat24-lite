// #include "ots_password_policy_advanced_ui.h"
//
#pragma once

#include "ots_password_policy.h"
#include "ots_password_policy_advanced.h"
#include "ots_password_policy_ui.h"
#include "ots_password_policy_explanation_ui.h"
#include "ots_password_policy_explanation_uires.h"

namespace oti_password_policy
{
	using namespace advancedpswpolicy;

	class error_message_t
	{
	public:
		static point_t get_errormsg_pos(HWND hwnd_)
		{
			rect_t r(hwnd_, INITRECT::parent);

			point_t pt;
			pt.x = r.left + r.width / 2;
			pt.y = r.top + r.height;

			return pt;
		}
	};

	namespace ui_utils
	{
		class bound2_t
		{
			ui::static_t label;
			ui::edit_t edit;
			ui::window_t scroll;
		public:
			void on_init(HWND hwnd, unsigned l_id, unsigned e_id)
			{
				ui::window_t dlg(hwnd);
				label = dlg.controls[l_id];
				edit  = dlg.controls[e_id];
			}

			void show(bool v_)
			{
				label.show = v_;
				edit.show = v_;
			}

			void enable(bool v_)
			{
				label.enabled = v_;
				edit.enabled = v_;
			}

			void set_label(const string_t& v_)
			{
				label.wtext = utf8(v_);
			}

			void set_value(int v_)
			{
				edit.wtext = wstrings::conv_int(v_);
			}

			int get_value() const
			{
				return wstrings::conv_int(edit.wtext);
			}

			bool get_valid()
			{
				return get_value() > 0;
			}

			point_t get_errormsg_pos()
			{
				rect_t r(edit, INITRECT::parent);
				point_t pt;
				pt.x = r.left + r.width / 2;
				pt.y = r.top + r.height;
				return pt;
			}
		};

		class complexity_test_t : public error_message_t // Class for Complexity test controls.
		{
			//void parsePattern(__in const password::policy_t& policy_, __out rulesSet_t& rv_rulesSet_)
			//{
			//	parseError parseerror;
			//	customRule::parseExtPolicy2RulesSet(policy_, rv_rulesSet_, parseerror);

			//} //parsePattern()

			ui::static_t m_label;
			ui::edit_t   m_edit_verify;
			ui::button_t m_button_verify;

			ui::edit_t   m_edit_generate;
			ui::button_t m_button_generate;
		public:
			void on_init(HWND hwnd, unsigned l_id, unsigned ev_id, unsigned bv_id, unsigned eg_id, unsigned bg_id)
			{
				ui::window_t dlg(hwnd);

				m_label = dlg.controls[l_id];
				
				m_edit_verify  = dlg.controls[ev_id];
				m_button_verify  = dlg.controls[bv_id];

				m_button_verify.enabled = !m_edit_verify.wtext.empty();
				
				m_edit_generate = dlg.controls[eg_id];
				m_button_generate = dlg.controls[bg_id];
			}

			void enable(bool v_)
			{
				m_label.enabled = v_;
				m_edit_verify.enabled = v_;
				m_button_verify.enabled = v_ && !m_edit_verify.wtext.empty();

				m_edit_generate.enabled = v_;
				m_button_generate.enabled = v_;
			}

			bool verifypsw(__in password::policy_t& policy_, __inout wstring_t& rv_msgErr_, __out point_t& pt_)
			{
				// Initialize return values.

				pt_ = get_errormsg_pos(m_edit_verify);
				bool rv = false;

				wstring_t password = m_edit_verify.wtext;
				if (policy_.IsExtendedPolicy())
				{
					parseError parseerror;
					rulesSet_t rulesSet;
					customRule::parseExtPolicy2RulesSet(policy_, rulesSet, parseerror);

					wstring_t previousPassword; /* Previous password not applicable for PMAT verify screen */
					bool noduplicate = false; // For verification, we allow duplicate characters.
					rv = customRule::verifyPasswordAgainstRuleNoThrow(rulesSet, previousPassword, password, noduplicate);

					// Check bounds if generated.
					if (rv)
					{
						int minbound = policy_.GetMinLength();
						int maxbound = policy_.GetMaxLength();

						//minbound = maxbound = 0;

						//customRule::getBoundsRecursively(rulesSet.m_ruleEntries, minbound, maxbound);
						int pswlength = size2int(password.length());

						if (pswlength < minbound || pswlength > maxbound)
						{
							rv_msgErr_  = rstring(IDS_ERR_INVALID_RANGE);
							return false;
						}
					}
				}
				else
				{
					rv = password::verify_t()(policy_, utf8(password));
				}

				if (rv)
				{
					rv_msgErr_ = rstring(IDS_VALUE_VERIFIED);
					pt_ = get_errormsg_pos(m_button_verify);

					return true;
				}
				
				password_policy_wexplanation::keyvalues_t keyvalues;
				password_policy_wexplanation::loadUIResources(keyvalues);

				rv_msgErr_  = rstring(IDS_ERR_INVALID_PASSWORD);
				rv_msgErr_ += password_policy_wexplanation::getPolicyExplanation(keyvalues, policy_);
				return false;
			}

			bool generatepsw(__in const password::policy_t& policy_, __out wstring_t& password_, __out wstring_t& rv_msgErr_, __out point_t& pt_)
			{
				password_.clear();
				rv_msgErr_.clear();
				pt_.clear();

				if (policy_.IsExtendedPolicy())
				{
					parseError parseerror;
					rulesSet_t rulesSet;
					customRule::parseExtPolicy2RulesSet(policy_, rulesSet, parseerror);

					if (parseerror.m_errorType == parseerror.errNone)
					{
						bool noduplicate = true; // For generation, no duplicate characters in the password.
						wstring_t prevPassword;
						customRule::generatePasswordByRuleNoThrow(rulesSet, noduplicate, prevPassword, password_);
					}
				}
				else
				{
					password_ = utf8(password::generate_t()(policy_));
				}

				if (password_.empty())
				{
					rv_msgErr_  = rstring(IDS_ERR_INVALID_PATTERN);
					pt_         = get_errormsg_pos(m_button_generate);
					return false;
				}
			
				return true;
			}

			void set_password(__in const wstring_t& psw_)
			{
				m_edit_generate.wtext = psw_;
			}

		}; //class complexity_test_t

		class generation_t
		{
			ui::static_t m_label;
			ui::button_t m_button_u;
			ui::button_t m_button_g;
		public:
			void on_init(HWND hwnd, unsigned l_id, unsigned bu_id, unsigned bg_id)
			{
				ui::window_t dlg(hwnd);

				m_label = dlg.controls[l_id];
				
				m_button_u  = dlg.controls[bu_id];
				m_button_g  = dlg.controls[bg_id];
			}

			void enable(bool doEnable_)
			{
				m_label.enabled = doEnable_;
				m_button_u.enabled = doEnable_;
				m_button_g.enabled = doEnable_;
			}

			bool setup_ui(const password::policy_t& pol_)
			{
				m_button_u.checked = false;
				m_button_g.checked = false;

				if (pol_.IsEmptyPolicy() || pol_.IsPolicyToVerify())
					m_button_u.checked = true;
				else if (pol_.IsPolicyToGenerate())
					m_button_g.checked = true;
				else
					return false;

				return true;
			}

			password::POLICYTYPE calculate_policy_type(bool bUsePolicy_)
			{
				if (bUsePolicy_) {
					if ( m_button_u.checked )
						return password::POLICYTYPE::verify;
					else if ( m_button_g.checked )
						return password::POLICYTYPE::generate;
				}

				return password::POLICYTYPE::none;
			}

		}; //class generation_t

	}//namespace ui_utils

	class adv_policycontrols_t : public error_message_t
	{
		void enable_restrictions(bool fEnable)
		{
			// Enable/disable 'Complexity controls'.

			m_button_complexity_s.enabled = fEnable;
			m_button_complexity_c.enabled = fEnable;
			m_composition.enable(fEnable && m_button_complexity_s.checked);

			m_edit_pattern.enabled = fEnable && m_button_complexity_c.checked;
			m_button_hint.enabled = m_edit_pattern.enabled;
			
			UINT uiState = m_button_complexity_c.GetState();
			if (is_bitset(uiState, BST_FOCUS))
			{
				::SetFocus(m_edit_pattern);
			}

		    m_min.enable(fEnable);
			m_max.enable(fEnable);
		    m_constrains.enable(fEnable);
			m_generation.enable(fEnable);

			// Enable/disable 'Test Complexity' controls.

			bool enableTest = fEnable && m_button_complexity_s.checked;

			if (m_button_complexity_c.checked)
			{
				enableTest = fEnable && !m_edit_pattern.wtext.empty();
			}

			m_complexity_test.enable(enableTest);

		} //enable_restrictions()

		ui::button_t m_button_policy;

		// Complexity controls.
		ui_utils::combo_t m_composition;				// Combo with predefined list.
		ui::edit_t        m_edit_pattern;				// Edit (pattern)
		ui::button_t      m_button_hint;                // Pattern hint button.

		ui::button_t      m_button_complexity_s;		// Predefined rule
		ui::button_t      m_button_complexity_c;		// Custom rule

		// Length.
		ui_utils::bound2_t m_min;						// Length min.
		ui_utils::bound2_t m_max;						// Length max.

		// Complexity test.
		ui_utils::complexity_test_t m_complexity_test;	// Complexity test.

		// History.
		ui_utils::combo_t m_constrains;					

		// Password generation.
		ui_utils::generation_t m_generation;			
	public:
		void on_init(HWND hwnd)
		{
			ui::window_t dlg(hwnd);
			
			m_button_policy = GetDlgItem(dlg, IDC_USEPOLICY);

			// Complexity controls.
			//
			m_button_complexity_s = dlg.controls[IDC_RADIO_COMPLEXITY_S];
			m_button_complexity_c = dlg.controls[IDC_RADIO_COMPLEXITY_C];

			m_composition.on_init(dlg, 0, IDC_COMBO_COMPOSITION);
			utils::mix_t(m_composition.combo).fillin();
			m_edit_pattern = dlg.controls[IDC_COMPLEXITY_EDIT_P];
			m_button_hint = dlg.controls[IDC_HINT];

			m_min.on_init(dlg, IDC_MIN_L, IDC_MIN);
			m_max.on_init(dlg, IDC_MAX_L, IDC_MAX);

			// Complexity controls (Test).
			//
			m_complexity_test.on_init(dlg,
				IDC_TESTCOMPLEXITY_L, IDC_TESTCOMPLEXITY_EDIT_V, 
				IDC_TESTCOMPLEXITY_BTN_V, IDC_TESTCOMPLEXITY_EDIT_G,
				IDC_TESTCOMPLEXITY_BTN_G);

			// History.
			//
			m_constrains.on_init(dlg, IDC_CONSTRAINTS_L, IDC_CONSTRAINTS);
			if (m_constrains.combo.IsWindow())
			{
				utils::constrains_t(m_constrains.combo).fillin();
			}

			// Generation.
			//
			m_generation.on_init(dlg, IDC_GENERATION_L, IDC_RADIO_POLICY_B, IDC_RADIO_POLICY_C);

		} //on_init()

		/////////////////////////////////////////////////////////////////////

		bool checkPattern(__in const password::policy_t& policy_, __out wstring_t& rv_msg_, __out point_t& pt_, __out bool& showtooltip_)
		{
			pt_.clear();
			showtooltip_ = true;

			if (!policy_.IsExtendedPolicy())
				return true;

			// 1. Parse pattern.
			rulesSet_t rulesSet;
			parseError parseerror;
			customRule::parseExtPolicy2RulesSet(policy_, rulesSet, parseerror);

			switch (parseerror.m_errorType)
			{
				case parseerror.errUnexpected:			/* Any unexpected error that is thrown as a general exception. */
				case parseerror.errUnexpShorthand:		/* "unexpected shorthand" */
				case parseerror.errUnexpChar:			/* "unexpected char" character that is defined in m_expected member. */
				case parseerror.errExpChar:				/* "expected" character that is defined in m_expected member. */
				case parseerror.errExpCharALessB:		/* "expected set range n <= m" */
				case parseerror.errExpMoreText:			/* "no more text" */
				case parseerror.errExpNum:				/* "expected number" */
				case parseerror.errInvRange:			/* "imvalid range", i.e. min > max */
				case parseerror.errExpDigit:			/* "expected digit" */
				case parseerror.errExp4Digits:			/* "expected 4 hex digits" */
				case parseerror.errUnexpChSetClose:		/* "unexpected '[' before ']'", i.e. close without open. */
				case parseerror.errChSetEmpty:			/* "unexpected empty charset" */
				case parseerror.errExpLowBoundCh:		/* "expected lower boundary char before '-'" */
				case parseerror.errUnexpDoubleSet:		/* "unexpected double '--'". Use escape character i.e. "\-" */
				case parseerror.errMoreThen1024:		/* "expected less then 1024 per charset" */
					{
						// TODO: Use parseerror.m_errorPos to highlight the error.
						showtooltip_ = true;
						rv_msg_ = rstring(IDS_ERR_INVALID_PATTERN);
						pt_ = get_errormsg_pos(m_edit_pattern);
						return false;
					}

				case parseerror.errNone:			  /* No errors as a default value. */
				default: /* Proceed to next validation */ break;
			}

			if (policy_.IsPolicyToGenerate())
			{
				// 2. Check whether all rules have bounds within acceptable min, max range.

				bool minValid, maxValid;
				minValid = maxValid = false;
				customRule::checkRulesBoundsForGenerate(rulesSet, minValid, maxValid);

				// 3. Check if bound are valid in pattern.

				if (!minValid)
				{
					rv_msg_ = rstring(IDS_INVALID_PATTERN_MINLEN);
					pt_ = m_min.get_errormsg_pos();

					return false;
				}

				if (!maxValid)
				{
					rv_msg_ = rstring(IDS_INVALID_PATTERN_MAXLEN);
					pt_ = m_max.get_errormsg_pos();

					return false;
				}
			}

			return true;
		}

		bool verifypassword(__out wstring_t& rv_msgErr_, __out point_t& pt_, __out bool& showtooltip_)
		{
			rv_msgErr_.clear();
			pt_.clear();

			password::policy_t policy = get_policy();

			if (!verifyPolicyParts(policy, rv_msgErr_, pt_))
				return false;
		
			bool rv = m_complexity_test.verifypsw(policy, rv_msgErr_, pt_);
			return rv;
		}

		bool generatepassword(__out wstring_t& rv_msgErr_, __out point_t& pt_, __out bool& showtooltip_)
		{
			rv_msgErr_.clear();
			pt_.clear();

			// Clear existing password.
			m_complexity_test.set_password(L"");

			// Get policy and validate pattern.
			//
			password::policy_t policy = get_policy();
			//policy.type = password::POLICYTYPE::generate; // TODO SM: Uncomment and decide what to do with it

			bool isverified = verifyPolicyParts(policy, rv_msgErr_, pt_);
			if (!isverified)
			{
				return false;
			}

			wstring_t password;
			if (!m_complexity_test.generatepsw(policy, password, rv_msgErr_, pt_))
			{
				return false;
			}

			m_complexity_test.set_password(password);
			return true;
		}

		point_t get_rightmost_pos(HWND hwnd_)
		{
			rect_t r(hwnd_, INITRECT::parent);

			point_t pt;
			pt.x = r.right;
			pt.y = r.top + r.height / 2;

			return pt;
		}

		void gettooltip_patternhelp(__out HWND& hwndControl_,__out wstring_t& tooltip_, __out point_t& pt_)
		{
			hwndControl_ = m_edit_pattern;
			tooltip_ = rstring(IDS_TOOLTIP_PHELP);
			pt_ = get_rightmost_pos(hwndControl_);

		}

		bool verifyPolicyParts(__in const password::policy_t& policy_, wstring_t& errmessage_, point_t& pt_)
		{
			atltrace::scope_t scope(__FUNCTION__);

			bool br = true;
			if (policy_.IsPolicyToVerify()) {
				scope.text("p-ver");

				if (!m_min.get_valid()) {
					br = false;
					pt_ = m_min.get_errormsg_pos();
					errmessage_ = rstring(IDS_ERR_INVALID_VALUE);
				}
				else if (!m_max.get_valid()) {
					br = false;
					pt_ = m_max.get_errormsg_pos();
					errmessage_ = rstring(IDS_ERR_INVALID_VALUE);
				}
				else if (policy_.GetMinLength() > policy_.GetMaxLength()) {
					br = false;
					pt_ = m_min.get_errormsg_pos();
					errmessage_ = rstring(IDS_ERR_INVALID_RANGE);
				}
			}
			else if (policy_.IsPolicyToGenerate()) {
				scope.text("p-gen");

				if (!m_min.get_valid()) {
					br = false;
					pt_ = m_min.get_errormsg_pos();
					errmessage_ = rstring(IDS_ERR_INVALID_VALUE);
				}
				if (m_min.get_value() > m_max.get_value()) {
					br = false;
					pt_ = m_min.get_errormsg_pos();
					errmessage_ = rstring(IDS_ERR_INVALID_RANGE);
				}
			}

			if (br) {
				bool showtooltip = true;
				br = checkPattern(policy_, errmessage_, pt_, showtooltip);
			}
			return br;
		}

		/////////////////////////////////////////////////////////////////////

		password::policy_t get_policy()
		{
			auto policyType = m_generation.calculate_policy_type(m_button_policy.checked);

			password::policy_t pol(
				policyType,
				m_constrains.combo.IsWindow() ? utils::constrains_t(m_constrains.combo) : password::RESTRICTTYPE::no_restrictions,
				utils::mix_t(m_composition.combo),
				m_min.get_value(),
				m_max.get_value(),
				m_button_complexity_c.checked,
				utf8(m_edit_pattern.wtext)
			);

			return pol;
		}

		void set_policy(const string_t& policy_)
		{
			password::policy_t pol(policy_, password::POLICYTYPE::verify);
			bool rv = m_generation.setup_ui(pol);
			if (!rv)
				return;

			switch (pol.GetSimpleCharSet()) {
				case password::CHARSETTYPE::alphanumeric:
				case password::CHARSETTYPE::alpha:
				case password::CHARSETTYPE::numeric:
				case password::CHARSETTYPE::withspecial:
				case password::CHARSETTYPE::atleastonenumber:
					m_button_complexity_s.checked = !pol.IsExtendedPolicy();
					break;
			}
			
			m_button_complexity_c.checked = pol.IsExtendedPolicy();
			
			m_edit_pattern.wtext =  utf8(pol.GetExtendedPolicyStr());

			m_min.set_value(pol.GetMinLength());
			m_max.set_value(pol.GetMaxLength());

			utils::mix_t(m_composition.combo) = pol.GetSimpleCharSet();
			utils::constrains_t(m_constrains.combo) = pol.GetConstrains();

			m_button_policy.checked = !pol.IsEmptyPolicy();
			enable_restrictions(!pol.IsEmptyPolicy());
		}

		void refresh()
		{
			bool use_policy = m_button_policy.checked;

			enable_restrictions(use_policy);
		}

	}; //class adv_policycontrols_t

}//namespace oti_password_advancedpolicy
