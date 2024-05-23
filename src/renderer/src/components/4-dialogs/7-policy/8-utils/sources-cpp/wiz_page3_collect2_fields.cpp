// wiz_page3_collect2_fields.cpp
//
#include "stdafx.h"
#include "..\resource.h"
#include "..\res\xresource_options.h"
#include "..\SharedResources\xresources_changepwd_policy.h"

#include "oti_manifest.h"
#include "wiz_context.h"
#include "wiz_controls_wizardtitle.h"
#include "wiz_editor_fields_admin.h"
#include <wiz_api_internal.h>

#include "wiz_page3_collect2_fields.h"
#include <BrandingApps.h>

namespace page320
{
	class collect2_fields_page_t::ufo_t
	{
	public:
		wizcontrols::wizardtitle_t m_title;
		wiz_fieldseditor::fieldseditor_t fieldseditor;
		wstring_t m_targetfolder;

		bool subclass(HWND hparent, HWND hwnd)
		{
			if (!fieldseditor.subclass(CWindow(hparent).GetDlgItem(IDC_LISTVIEW1)))
			{
				ATLASSERT(0); return false;
			}
			fieldseditor.set_notifier(hparent, collect2_fields_page_t::wm_fieldchanged);
			return true;
		}

		void load(manifest::manifest_t* m, const wstring_t referencenames)
		{
			fieldseditor.setfolder(m_targetfolder);
			fieldseditor.referencenames = referencenames;
			fieldseditor.load(m);
		}

		void save(manifest::manifest_t& m)
		{
			fieldseditor.fillin_to(m);
		}

		bool is_valid()
		{
			return fieldseditor.is_valid();
		}

		bool is_protectedfield_selectionvalid(manifest::manifest_t& m)
		{
			return fieldseditor.is_protectedfield_selectionvalid(m);
			
		}
	};

	/////////////////////////////////////////////////////////////////////////////
	// collect2_fields_page_t

	collect2_fields_page_t::collect2_fields_page_t()
	{
		ufo = new ufo_t(); if (!ufo) throw std::bad_alloc(); //"collectf2_page"
	}

	collect2_fields_page_t::~collect2_fields_page_t()
	{
		try {delete ufo;}catch(...){}
	}

	LRESULT collect2_fields_page_t::on_wizard(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		switch (uMsg)
		{
			case wiz::WM::IS_PAGE_VISIBLE:
				{
					return	(ctx->wizarddata == WIZARDDATA::recognized) &&
							(ctx->wizardmode != WIZARDMODE::retrain);
					//return ctx->wizarddata == WIZARDDATA::recognized;
				}
				break;
			case wiz::WM::ACTIVATEDBYWIZARD:
				{
					wiz::enable_btns(GetParent(), true, true);
					wiz::enable_finish_btn(GetParent(), true);
					wiz::show_finish_btn(GetParent(), ctx->wizardmode == WIZARDMODE::edit);
				}
				break;
			case wiz::WM::NEXTPREVCLICKED:
				{				
					bool nextprev = wParam ? true : false;

					if (nextprev && !query_page_valid())
						return 0;

					if (!nextprev)
						wiz::hidetooltip();

					UnhighlightField();
					wiz::moveto(GetParent(), nextprev);
				}
				break;
			case wiz::WM::FINISHCLICKED:
				{
					if (!query_page_valid())
						return 0;

					UnhighlightField();
					wiz::moveto_finish(GetParent());
					bHandled = FALSE;
				}
				break;
			case wiz::WM::SHOW_HELP:
				{
					ctx->showwizardhelp(m_hWnd, HELPPAGE::fieldsauto);
				}
				break;
			default:
				bHandled = FALSE;
		}
		return 0;
	}

	LRESULT collect2_fields_page_t::on_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		ctx->add_callback(this);
		ui::window_t dlg(m_hWnd);

		ufo->m_targetfolder = ctx->get_target_folder();

		ufo->m_title = dlg.controls[IDC_TITLE];
		ufo->m_title.set(rstring(ctx->wizardtype == WIZARDTYPE::signon ? IDS_PAGE_FIELDS_TITLE : IDS_PAGE_FIELDS_PC_TITLE));

		ui::window_t info(dlg.controls[IDC_WIZCOLLECT_INFO]);
		info.wtext = rstring(ctx->wizardtype == WIZARDTYPE::signon ? IDS_WIZCOLLECT_INFO_S : IDS_WIZCOLLECT_INFO_P);

		HICON hIcon = CBrandingApps::LoadTrainingToolPageEditIcon();
		SendMessage(dlg.controls[IDC_STATIC], STM_SETICON, (WPARAM)hIcon,0);

		ufo->subclass(m_hWnd, dlg.controls[IDC_LISTVIEW1]);
		return 1;
	}

	LRESULT collect2_fields_page_t::on_fieldchanged(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
	{
		atltrace::scope_t scope(__FUNCTION__);
		scope.text(L"m_hWnd=0x%X", m_hWnd);

		// TODO: If there is only one field then highlight will happens only once. resolve this later. F5 as hotkey in grid ?

		HRESULT hr = S_OK;

		try {
			long accid = (long)wParam;

			if (accid == -1)
			{
				wiz::showfeedback(false);
			}
			else
			{
				wiz::showfeedback(ctx->targetwindow.m_main, ctx->get_accid_rect(accid));
				m_bFieldHighlighted = true;
				scope.text("Highlighted");
			}
		}
		catch(_com_error& e_)
		{
			hr = e_.Error();
		}
		catch(...)
		{
			hr = E_UNEXPECTED;
		}
		atltrace::error("collect2_fields_page_t::on_fieldchanged", hr);

		return 1;
	}

	void collect2_fields_page_t::callback_manifest_created()
	{
		if (ctx->wizarddata == WIZARDDATA::recognized)
		{
			ufo->load(&ctx->ctxmanifest, ctx->referencenames);
		}
	}

	void collect2_fields_page_t::callback_save_to_manifest()
	{
		if (ctx->wizarddata == WIZARDDATA::recognized)
		{
			ufo->save(ctx->ctxmanifest);
		}
	}

	bool collect2_fields_page_t::query_page_valid()
	{
		if (ctx->wizarddata != WIZARDDATA::recognized)
		{
			return true;
		}

		bool br = true;
 
		br = ufo->is_protectedfield_selectionvalid(ctx->ctxmanifest);
		if (!br)
		{
			rect_t r(GetDlgItem(IDC_LISTVIEW1), INITRECT::parent);
			wiz::showtooltip(rstring(IDS_WARNING), rstring(IDS_WINDREF_CHANGEPASSWORD), r.right, r.top + 50);
			return br;
		}

		br = ufo->is_valid();
		if (!br)
		{
			rect_t r(GetDlgItem(IDC_LISTVIEW1), INITRECT::parent);

			wiz::showtooltip(rstring(IDS_WARNING), rstring(IDS_PAGE_FIELDS_WARNING), r.left+15, r.top+15);
		}

		return br;
	}

	void collect2_fields_page_t::UnhighlightField() {
		atltrace::scope_t scope(__FUNCTION__);
		if (m_bFieldHighlighted) {
			ctx->get_accid_rect(-1);
			m_bFieldHighlighted = false;
			scope.text("Unhighlighted");
		}
	}

	LRESULT collect2_fields_page_t::on_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled) 
	{
		wiz::autohidetooltip(*this, lParam);

		bHandled = FALSE;
		return 0;
	}

	LRESULT collect2_fields_page_t::OnDestroy(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled) {
		atltrace::scope_t scope(__FUNCTION__);
		UnhighlightField();
		bHandled = FALSE;
		return 0;
	}


}; //namespace page320
