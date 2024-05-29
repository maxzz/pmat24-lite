// #include "wiz_page3_collect2_fields.h"
//
#pragma once

#include "atl_wizard.h"

namespace page320
{
	class collect2_fields_page_t :
		public ufoptr_t,
		public wiz_context::context_callback_t,
		public ui::window_T< CDialogImpl<collect2_fields_page_t> >
	{
		void callback_manifest_created(); //wiz_context::context_callback_t
		void callback_save_to_manifest(); //wiz_context::context_callback_t
		bool query_page_valid();
		
		bool m_bFieldHighlighted = false;
		void UnhighlightField();

		class ufo_t; ufo_t* ufo;
	public:
		wiz_context::wizard_context_t* ctx;
		collect2_fields_page_t();
		~collect2_fields_page_t();

		enum { IDD = IDD_WIZARD_COLLECT2_FIELDS, wm_fieldchanged=WM_USER+405 };
		BEGIN_MSG_MAP(collect2_fields_page_t)
			MESSAGE_HANDLERS(on_wizard)
			MESSAGE_HANDLER(WM_MOUSEMOVE, on_mousemove)
			MESSAGE_HANDLER(WM_INITDIALOG, on_initdialog)
			MESSAGE_HANDLER(wm_fieldchanged, on_fieldchanged)
			MESSAGE_HANDLER(WM_DESTROY, OnDestroy)
			REFLECT_NOTIFICATIONS()
		END_MSG_MAP()

		LRESULT on_wizard(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_fieldchanged(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT OnDestroy(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
	};

} //namespace page320
