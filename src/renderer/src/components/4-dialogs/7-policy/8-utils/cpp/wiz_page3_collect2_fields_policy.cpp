// wiz_page3_collect2_fields_policy.cpp
//
#include "stdafx.h"
#include "..\resource.h"
#include "oti_manifest.h"
#include "wiz_context.h"
#include "wiz_controls_wizardtitle.h"
#include "ots_password_policy.h"

#include <wiz_api_internal.h>

//#include "wiz_page3_collect2_fields_policy_internal.h"
#include "ots_password_policy_ui.h"
#include "wiz_page3_collect2_fields_policy.h"

namespace page323
{
	using namespace oti_password_policy;
	class editor_t
	{
		controls_t controls;
	public:
		void on_init(HWND hwnd)
		{
			controls.on_init(hwnd);
		}

		void refresh()
		{
			controls.refresh();
		}

		void on_radiobutton(UINT id_)
		{
			switch (id_)
			{
				case IDC_RADIO_POLICY_B: 
				case IDC_RADIO_POLICY_C: 
				case IDC_USEPOLICY:
					refresh();
					break;
			}
		}

		void load(manifest::manifest_t& m_)
		{
			if (!m_.hascurrentform()) return;

			//TODO: do clean up better
			manifest::field_t* pf = m_.field_bypassword_fromparent(m_.currentform());
			manifest::field_t& f = pf ? *pf : manifest::field_t();

			controls.set_policy(f.policy);
		}

		void save_to_manifest(manifest::manifest_t& m_)
		{
			ATLASSERT(m_.hascurrentform()); if (!m_.hascurrentform()) return;

			password::policy_t pol = controls.get_policy();
			string_t sPolicy = pol.policyToString();

			manifest::field_t* pf = m_.field_bypassword_fromparent(m_.currentform());
			if (pf)
				(*pf).policy = sPolicy; else {ATLASSERT(0);}
		}

		bool verify_policy_and_warn()
		{
			wstring_t errmessage;
			point_t pt;
			bool br = controls.verifyPolicyParts(errmessage, pt);
			if (!br)
				wiz::showtooltip(rstring(IDS_CAPTION_WARNING), errmessage, pt.x, pt.y);
			return br;
		}
	};

	class collect2_fields_policy_page_t::ufo_t
	{
	public:
		wizcontrols::wizardtitle_t m_title;
		editor_t editor;

		void on_init(HWND hwnd)
		{
			editor.on_init(hwnd);
		}
	};

	////////////////////////////////////////////////////////////////////////////
	// collect2_fields_policy_page_t

	collect2_fields_policy_page_t::collect2_fields_policy_page_t()
	{
		ufo = new collect2_fields_policy_page_t::ufo_t(); if (!ufo) throw std::bad_alloc(); //"policy_page"
	}

	collect2_fields_policy_page_t::~collect2_fields_policy_page_t()
	{
		delete ufo;
	}

	LRESULT collect2_fields_policy_page_t::on_wizard(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		switch (uMsg)
		{
			case wiz::WM::IS_PAGE_VISIBLE:
				{
					return (ctx->wizardtype == WIZARDTYPE::pchange) && (ctx->wizardmode != WIZARDMODE::retrain);
					//return ctx->wizardtype == WIZARDTYPE::pchange;
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
					ctx->showwizardhelp(m_hWnd, HELPPAGE::policy);
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
		/*
		ufo->m_title = dlg.controls[IDC_TITLE];
		ufo->m_title.set_text( rstring(IDS_PWDPOLICY_CAPTION) );
		ufo->m_title.update_model();
		*/

		ufo->on_init(m_hWnd);
		return 1;
	}

	LRESULT collect2_fields_policy_page_t::on_radio_button(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
	{
		ufo->editor.on_radiobutton(wID);
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
		return ctx->wizardtype == WIZARDTYPE::pchange ? ufo->editor.verify_policy_and_warn() : true;
	}

} //namespace page323
