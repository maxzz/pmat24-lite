// #include "wiz_page3_collect2_fields_policy.h"
//
#pragma once

#include "atl_wizard.h"
#include "..\SharedResources\xresources_changepwd_policy.h"	// Common resources (string and UI controls) for change password dialog.

namespace page323
{
	class collect2_fields_policy_page_t :
		public ufoptr_t,
		public wiz_context::context_callback_t,
		public ui::window_T< CDialogImpl<collect2_fields_policy_page_t> >
	{
		void callback_manifest_created(); //wiz_context::context_callback_t
		void callback_save_to_manifest(); //wiz_context::context_callback_t
		bool query_page_valid();

		class ufo_t; ufo_t* ufo;
	public:
		wiz_context::wizard_context_t* ctx;

		collect2_fields_policy_page_t();
		~collect2_fields_policy_page_t();

		enum { IDD = IDD_WIZARD_COLLECT2_FIELDS_POLICY };

		BEGIN_MSG_MAP(collect2_fields_policy_page_t)
			MESSAGE_HANDLERS(on_wizard)
			MESSAGE_HANDLER(WM_MOUSEMOVE, on_mousemove)
			MESSAGE_HANDLER(WM_INITDIALOG, on_initdialog)
			COMMAND_HANDLER(IDC_RADIO_POLICY_B, BN_CLICKED, on_radio_button)
			COMMAND_HANDLER(IDC_RADIO_POLICY_C, BN_CLICKED, on_radio_button)
			COMMAND_HANDLER(IDC_USEPOLICY,		BN_CLICKED, on_radio_button)
			REFLECT_NOTIFICATIONS()
		END_MSG_MAP()

		LRESULT on_wizard(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled);
		LRESULT on_radio_button(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled);
	};

} //namespace page323
