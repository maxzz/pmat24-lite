// wiz_page3_collect2_fields_policy_dlg.cpp
//
#include "stdafx.h"
#include "..\resource.h"
#include "vtl_property_ctrl_grid.h"
#include "vtl_cpp_propertygrid.h"
#include "wiz_context.h"
#include "wiz_page3_collect2_fields_policy_dlg.h"
#include "oti_manifest.h"
#include "wiz_controls_wizardtitle.h"
#include "ots_password_policy.h"
#include "wiz_context.h"

#include <wiz_api_internal.h>

//#include "wiz_page3_collect2_fields_policy_internal.h"
#include "ots_password_policy_ui.h"
#include "ots_password_policy_advanced_ui.h"
#include "wiz_tooltip.h"

#include <BrandingApps.h>
#include <dp_muisupportonxp.h>
namespace page324
{
	//using namespace page323;
	using namespace oti_password_policy;

	namespace dialogeditor
	{
		class dlg_t : public CDialogImpl<dlg_t>
		{
			const wiz_context::wizard_context_t* m_pCtx;
			string_t                             m_policyString;
		public:
			enum { IDD = IDD_WIZARD_COLLECT2_FIELDS_POLICY_DLG };

			BEGIN_MSG_MAP(dlg_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				COMMAND_HANDLER(IDC_RADIO_POLICY_B, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_RADIO_POLICY_C, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_USEPOLICY,      BN_CLICKED, on_radiobutton)
				COMMAND_ID_HANDLER(IDOK, on_okcancel)
				COMMAND_ID_HANDLER(IDCANCEL, on_okcancel)
				MESSAGE_HANDLER(WM_SYSCOMMAND, OnSysCommand);
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()

			dlg_t(const wiz_context::wizard_context_t* pCtx, const string_t& policyString) : m_pCtx(pCtx), m_policyString(policyString),  CDialogImpl<dlg_t>()
			{
			}

			bool verify_policy_and_warn()
			{
				wstring_t errmessage;
				point_t pt;
				bool br = controls.verifyPolicyParts(errmessage, pt);
				if (!br)
					messagebox(*this, errmessage, rstring(IDS_CAPTION_WARNING));

				return br;
			}

			string_t GetPolicyString() const {
				return m_policyString;
			}

			controls_t controls;
		public:
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
                //To access the resource/module instance appropriately.
                //For MUI support on XP.
                //The following case will ensure the icons are loaded from the appropriate resource module
                //on a OS that does not support MUI (such as Windows XP).
				muisupport::seticons(m_hWnd, IDI_DLLMAIN32);
				CenterWindow(GetParent());

				controls.on_init(*this);
				controls.refresh();

				controls.set_policy(m_policyString);
				
				ui::window_t dlg(*this);
				HICON hIcon = CBrandingApps::LoadTrainingToolPageEditIcon();
				SendMessage(dlg.controls[IDC_STATIC_PIC],STM_SETICON, (WPARAM)hIcon,0);


				return TRUE;
			}

			LRESULT on_radiobutton(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				switch (wID)
				{
					case IDC_RADIO_POLICY_B: 
					case IDC_RADIO_POLICY_C: 
					case IDC_USEPOLICY:
						controls.refresh();
						break;
				}
				return 0;
			}

			LRESULT on_okcancel(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				if (wID == IDOK)
				{
					if (!verify_policy_and_warn())
						return 0;
					password::policy_t pol = controls.get_policy();
					m_policyString = pol.policyToString();
				}
				EndDialog(wID);
				return 0;
			}

			LRESULT OnSysCommand(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				if (wParam == SC_CONTEXTHELP)
				{
					ATLASSERT(m_pCtx);
					m_pCtx->showwizardhelp(m_hWnd, HELPPAGE::policydlg2);
				}
				else
					bHandled = FALSE;

				return 0;
			}
		};

		inline bool execute(string_t& policystring_, const wiz_context::wizard_context_t* pCtx)
		{
			dlg_t dlg(pCtx, policystring_);

			bool ok = dlg.DoModal() == IDOK;
			if (ok)
				policystring_ = dlg.GetPolicyString();

			return ok;
		}

		namespace localutils {
		inline void show_tooltip_at(__in HWND& hwnd_, __in wiz_controls::tooltip_t& tooltipCtrl_,__in const wstring_t& text_,__in const wstring_t& title_,__in const point_t& pt_, UINT_PTR tttype_ = TTI_INFO)
		{
			tooltipCtrl_.set_text(title_, text_);

			if (tooltipCtrl_.create(hwnd_))
			{
				tooltipCtrl_.show( pt_.x, pt_.y, tttype_);
			}

		} // show_tooltip_at()
		} // namespace localutils

		// Advanced policy dialog
		//
		class advanced_dlg_t : public CDialogImpl<advanced_dlg_t>
		{
			const wiz_context::wizard_context_t* m_pCtx;
			string_t                             m_policyString;

		public:
			enum { IDD = IDD_WIZARD_COLLECT2_FIELDS_ADVANCED_POLICY_DLG };

			BEGIN_MSG_MAP(advanced_dlg_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				MESSAGE_HANDLER(WM_MOUSEMOVE, on_mousemove)

				COMMAND_HANDLER(IDC_RADIO_POLICY_B, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_RADIO_POLICY_C, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_USEPOLICY,      BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_RADIO_COMPLEXITY_S, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_RADIO_COMPLEXITY_C, BN_CLICKED, on_radiobutton)
				COMMAND_HANDLER(IDC_TESTCOMPLEXITY_BTN_V,   BN_CLICKED, on_button_testcompl)
				COMMAND_HANDLER(IDC_TESTCOMPLEXITY_BTN_G,   BN_CLICKED, on_button_testcompl)
				COMMAND_HANDLER(IDC_HINT,				    BN_CLICKED, on_button_patternhint)
				COMMAND_HANDLER(IDC_COMPLEXITY_EDIT_P,      EN_CHANGE,  on_radiobutton)
				COMMAND_HANDLER(IDC_TESTCOMPLEXITY_EDIT_V,  EN_CHANGE,  on_radiobutton)
				COMMAND_ID_HANDLER(IDOK, on_okcancel)
				COMMAND_ID_HANDLER(IDCANCEL, on_okcancel)
				MESSAGE_HANDLER(WM_SYSCOMMAND, OnSysCommand);
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()

			advanced_dlg_t(const wiz_context::wizard_context_t* pCtx, const string_t& policyString) : m_pCtx(pCtx), m_policyString(policyString), CDialogImpl<advanced_dlg_t>()
			{
			}

			bool verify_policy_and_warn()
			{
				password::policy_t pol = controls.get_policy();
				wstring_t errmessage;
				point_t pt;
				bool br = controls.verifyPolicyParts(pol, errmessage, pt);
				if (!br) {
					localutils::show_tooltip_at(m_hWnd, m_tooltip, errmessage, rstring(IDS_ERR_CAPTION), pt, TTI_ERROR);
				}
				return br;
			}

			string_t GetPolicyString() const {
				return m_policyString;
			}

			adv_policycontrols_t controls;

			// Tooltip window.
			wiz_controls::tooltip_t  m_tooltip;
			wiz_controls::tooltip_t  m_edit_tooltip;
		public:
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				//To access the resource/module instance appropriately.
				//For MUI support on XP.
				//The following case will ensure the icons are loaded from the appropriate resource module
				//on a OS that does not support MUI (such as Windows XP).
				muisupport::seticons(m_hWnd, IDI_DLLMAIN32);
				CenterWindow(GetParent());

				controls.on_init(*this);
				controls.refresh();

				controls.set_policy(m_policyString);

				ui::window_t dlg(*this);
				HICON hIcon = CBrandingApps::LoadTrainingToolPageEditIcon();
				SendMessage(dlg.controls[IDC_STATIC_PIC],STM_SETICON, (WPARAM)hIcon,0);

				return TRUE;
			}

			LRESULT on_radiobutton(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				switch (wID)
				{
					case IDC_USEPOLICY:
					case IDC_RADIO_COMPLEXITY_C:
					case IDC_RADIO_COMPLEXITY_S:
					case IDC_TESTCOMPLEXITY_EDIT_V:
					case IDC_COMPLEXITY_EDIT_P:
						controls.refresh();
						break;
				}
				return 0;
			}

			LRESULT on_button_testcompl(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				bool issuccess = false;

				wstring_t tooltiptext;
				point_t pt;
				bool showtooltip = true;

				switch (wID)
				{
				case IDC_TESTCOMPLEXITY_BTN_V:
					issuccess = controls.verifypassword(tooltiptext, pt, showtooltip);
					break;
				case IDC_TESTCOMPLEXITY_BTN_G:
					wstring_t password;
					issuccess = controls.generatepassword(tooltiptext, pt, showtooltip);
					break;
				}

				if (showtooltip)
				{
					// Show tooltip.
					//
					wstring_t caption = rstring(issuccess ? IDS_CAPTION_INFO : IDS_ERR_CAPTION);

					localutils::show_tooltip_at(m_hWnd, m_tooltip, tooltiptext, caption, pt, issuccess ? TTI_INFO : TTI_ERROR);
				}

				return 0;
			}

			LRESULT on_button_patternhint(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				HWND hwndControl = 0;
				wstring_t tooltip;
				point_t pt;

				controls.gettooltip_patternhelp(hwndControl, tooltip, pt);

				localutils::show_tooltip_at(m_hWnd, m_edit_tooltip, tooltip, rstring(IDS_CAPTION_INFO), pt, TTI_INFO);
				return 0;
			}

			LRESULT on_okcancel(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				if (wID == IDOK)
				{
					if (!verify_policy_and_warn())
					{
						return 0;
					}

					password::policy_t pol = controls.get_policy();
					m_policyString = pol.policyToString();
				}

				EndDialog(wID);
				return 0;
			}

			LRESULT OnSysCommand(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				if (wParam == SC_CONTEXTHELP)
				{
					ATLASSERT(m_pCtx);
					m_pCtx->showwizardhelp(m_hWnd, HELPPAGE::policydlg2);
				}
				else
					bHandled = FALSE;

				return 0;
			}

			LRESULT on_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled) 
			{
				m_tooltip.autohide(*this, lParam);
				m_edit_tooltip.autohide(*this, lParam);
				return 0;
			}
		};

		inline bool execute_advanced(string_t& policystring_, const wiz_context::wizard_context_t* pCtx)
		{
			advanced_dlg_t dlg(pCtx, policystring_);

			bool ok = dlg.DoModal() == IDOK;
			if (ok)
				policystring_ = dlg.GetPolicyString();

			return ok;
		}

	} //namespace dialogeditor

	namespace localutils
	{
		inline wstring_t getpolicytext(password::policy_t& policy_)
		{
			UINT resid = 0;
			if (policy_.IsEmptyPolicy())
				resid = IDS_WIZ_POLICY_NONEED;
			else if (policy_.IsPolicyToVerify())
				resid = IDS_WIZ_POLICY_VER;
			else if (policy_.IsPolicyToGenerate())
				resid = IDS_WIZ_POLICY_GEN;

			if (!resid)
				return wstring_t();

			wstring_t rv = L"<" + rstring(resid) + L">";
			return rv;
		}
	} //namespace localutils

	namespace lineutils
	{
		class line_t
		{
		public:
			manifest::field_t signonfield;
			wstring_t buttontext;

			void operator=(const manifest::field_t& r)
			{
				signonfield = r;
				password::policy_t policy(signonfield.policy);
				buttontext = localutils::getpolicytext(policy);
			}

			operator manifest::field_t()
			{
				return signonfield;
			}
		};

		typedef std::list<line_t> lines_t;

		inline line_t* getline(lines_t& lines_, int index_)
		{
			for (lines_t::iterator it=lines_.begin(); it!=lines_.end(); ++it)
			{
				if (std::distance(lines_.begin(), it) == index_)
					return &(*it);
			}
			return 0;
		}

		namespace column
		{
			typedef enum {signonlabel, policy} type_t;
		}

		inline void insert_columns(HWND hlistview_)
		{
			ui::listview_t listview(hlistview_);
			listview.insertcolumn(1, rstring(IDS_POLICYPAGE_FIELD),  LVCFMT_LEFT, 130, 0); //L"Logon field"
			listview.insertcolumn(2, rstring(IDS_POLICYPAGE_POLICY), LVCFMT_LEFT, 226, 0); //L"Field policy"
		}

		void insert_line(propertygrid::insert_helper_t& helper_, int rownumber_, line_t& v_)
		{
			helper_.insert2_label(rownumber_, column::signonlabel, utf8(v_.signonfield.displayname), v_.signonfield.ids.accid);
			helper_.insert2_button(rownumber_, column::policy, &v_.buttontext, rownumber_);
		}
	} //namespace lineutils

	class editor_t : public propertygrid::editor_impl_t, public ufoptr_t
	{
		LRESULT on_itembrowse(int idCtrl, LPNMHDR pnmh, BOOL& bHandled)
		{
			NMPROPERTYITEM* pnpi = (NMPROPERTYITEM*)pnmh; if (!pnpi || !pnpi->prop) {ATLASSERT(0); return 0;}
			cell_t* pi = (cell_t*)pnpi->prop->get_itemdata(); if (!pi) {ATLASSERT(0); return 0;}
			long rownumber_ = pi->notifyid;
			lineutils::line_t* pline = lineutils::getline(lines, rownumber_); if (!pline) {ATLASSERT(0); return 0;}

			//if (dialogeditor::execute(pline->signonfield.policy, m_pCtx))
			if (dialogeditor::execute_advanced(pline->signonfield.policy, m_pCtx))
			{
				password::policy_t policy(pline->signonfield.policy);
				pline->buttontext = localutils::getpolicytext(policy);
				set_cell_value(rownumber_, lineutils::column::policy, _variant_t(pline->buttontext.c_str()));
			}

			//set_cell_value(rownumber_, lineutils::column::policy, _variant_t(wformat(L"OK %d", rownumber_).c_str()));
			/*
			HPROPERTY prop = GetSubItem(rownumber_, lineutils::column::policy);
			pi->change(prop);
			//_InvalidateItem(rownumber_, lineutils::column::policy);
			//UpdateWindow();
			*/
			return 0;
		}

		BEGIN_MSG_MAP(editor_t)
			REFLECTED_NOTIFY_CODE_HANDLER(PIN_BROWSE, on_itembrowse)
			CHAIN_MSG_MAP(propertygrid::editor_impl_t)
		END_MSG_MAP()

		lineutils::lines_t      lines;
		manifest::fields_t      signonfields;
		const wiz_context::wizard_context_t* m_pCtx;
	public:
		editor_t() : m_pCtx(NULL)
		{
		}

		void init(const wiz_context::wizard_context_t* pCtx)
		{
			lineutils::insert_columns(*this);
			set_global_ctrl_resource(IDB_VTL_16, IDB_VTL_32); //cellimages.set_shareicon_list(0, 0);
			loadcontrolimages(IDB_VTL_32, IDB_VTL_16);
			m_pCtx = pCtx;
		}

		bool has_selection()
		{
			for (lineutils::lines_t::iterator it=lines.begin(); it!=lines.end(); ++it)
				if ((*it).signonfield.useit)
					return true;
			return lines.empty();
		}

		void load(manifest::manifest_t& m_)
		{
			clear(); lines.clear(); signonfields.clear(); if (!m_.hascurrentform()) return; // this manifest is recreated, so real call wll be later

			if (m_.currentform().fcontext.parent == manifest::FORMNAME::noname) {ATLASSERT(0); return;} //this page was designed for pchange only
			manifest::form_t& form_ = m_.forms[m_.currentform().fcontext.parent];

			// 1.out of signon form collect all fields except text labels and buttons
			{
				for (manifest::fields_t::iterator it=form_.fields.begin(); it!=form_.fields.end(); ++it)
				{
					if ((*it).type != manifest::FIELDTYPE::edit || !(*it).password) continue;
					signonfields.push_back(*it);
					lineutils::line_t& lnr = *lines.insert(lines.end(), lineutils::line_t());
					lnr = *it;
					//lnr.buttontext = sformat("test %d", lines.size());
				}
			}
			// 2.insert ui controls to grid, and update width of columns
			{
				propertygrid::insert_helper_t helper(*this);
				for (lineutils::lines_t::iterator it=lines.begin(); it!=lines.end(); ++it)
				{
					lineutils::insert_line(helper, count, *it);
				}
				propertygrid::arrange_width(m_ctrlHeader, 50);
			}
		}

		void save_to_manifest(manifest::manifest_t& m_)
		{
			ATLASSERT(m_.hascurrentform() && m_.currentform().fcontext.parent!=manifest::FORMNAME::noname);
			if (!m_.hascurrentform() || m_.currentform().fcontext.parent==manifest::FORMNAME::noname) return;
			manifest::form_t& form_ = m_.forms[m_.currentform().fcontext.parent];

			for (lineutils::lines_t::iterator it=lines.begin(); it!=lines.end(); ++it)
			{
				manifest::field_t* pf = form_.fields[(*it).signonfield.ids.memid.id];
				if (pf) *pf = *it; else {ATLASSERT(0);}
			}
		}

		bool query_valid()
		{
			return true;
		}
	};

	class ufo_t
	{
	public:
		wizcontrols::wizardtitle_t m_title;
		editor_t editor;

		void on_init(HWND hwnd_, const wiz_context::wizard_context_t* pCtx)
		{
			editor.SubclassWindow(ui::window_t(hwnd_).controls[IDC_LISTVIEW1]);
			editor.init(pCtx);
		}
	};

	////////////////////////////////////////////////////////////////////////////
	// collect2_fields_policy_page_t

	collect2_fields_policy_page_t::collect2_fields_policy_page_t()
	{
		ufo = new ufo_t(); if (!ufo) throw std::bad_alloc(); //"policy_page"
	}

	collect2_fields_policy_page_t::~collect2_fields_policy_page_t()
	{
		try {delete ufo;}catch(...){}
	}

	LRESULT collect2_fields_policy_page_t::on_wizard(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		switch (uMsg)
		{
		case wiz::WM::IS_PAGE_VISIBLE:
				{
					return (ctx->wizardtype == WIZARDTYPE::pchange) && (ctx->wizardmode != WIZARDMODE::retrain);
					//return ctx->wizardtype == WIZARDTYPE::pchange; //return ctx->is_ pchange;
				}
				break;
			case wiz::WM::ACTIVATEDBYWIZARD:
				{
					wiz::enable_btns(GetParent(), true, true);
					wiz::show_finish_btn(GetParent(), false);
					wiz::show_finish_btn(GetParent(), ctx->wizardmode == WIZARDMODE::edit);
				}
				break;
			case wiz::WM::NEXTPREVCLICKED: 
				{
					if (!query_page_valid())
						return 0;

					bool nextprev = wParam ? true : false;
					wiz::moveto(GetParent(), nextprev);
				} 
				break;
			case wiz::WM::FINISHCLICKED:
				{
					if (!query_page_valid())
						return 0;

					wiz::moveto_finish(GetParent());
					bHandled = FALSE;
				}
				break;
			case wiz::WM::SHOW_HELP:
				{
					ctx->showwizardhelp(m_hWnd, HELPPAGE::policydlg);
				}
				break;
			default: bHandled = FALSE;
		}
		return 0;
	}

	LRESULT collect2_fields_policy_page_t::on_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		//ufo->visible = ctx->wizardtype == wizardtype::pchange; if (!ufo->visible) return 1; //ufo->visible = ctx->is_ pchange; if (!ufo->visible) return 1;
		ctx->add_callback(this);
		ui::window_t dlg(m_hWnd);

		ufo->m_title = dlg.controls[IDC_TITLE];
		ufo->m_title.set(rstring(IDS_PWDPOLICY_CAPTION));

		HICON hIcon = CBrandingApps::LoadTrainingToolPageEditIcon();
		SendMessage(dlg.controls[IDC_STATIC], STM_SETICON, (WPARAM)hIcon,0);

		ufo->on_init(m_hWnd, ctx);
		return 1;
	}

	LRESULT collect2_fields_policy_page_t::on_radio_button(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
	{
	  //ufo->editor.on_radiobutton(wID);
		return 0;
	}

	LRESULT collect2_fields_policy_page_t::on_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled) 
	{
		wiz::autohidetooltip(*this, lParam); bHandled = FALSE; return 0;
	}

	void collect2_fields_policy_page_t::callback_manifest_created()
	{
		if (ctx->wizardtype == WIZARDTYPE::pchange)
		{
			ufo->editor.load(ctx->ctxmanifest);
		}
	}

	void collect2_fields_policy_page_t::callback_save_to_manifest()
	{
		if (ctx->wizardtype == WIZARDTYPE::pchange)
		{
			ufo->editor.save_to_manifest(ctx->ctxmanifest);
		}
	}

	bool collect2_fields_policy_page_t::query_page_valid()
	{
		if (ctx->wizardtype == WIZARDTYPE::pchange)
		{
			return ufo->editor.query_valid();
		}

		return true;
	}

} //namespace page324
