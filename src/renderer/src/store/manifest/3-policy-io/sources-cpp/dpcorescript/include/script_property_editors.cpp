// script_property_editors.cpp
//
#include "stdafx.h"
#include "xresource.h"
#include <atl_dialogsresize.h>

#include <script_io.h>
#include <script_io_field.h>
#include "script_property_editors.h"
#include "script_property_ui_controls.h"
#include "script_property_binder_pos.h"
#include "script_property_binder_field.h"
#include <script_api_internal.h>

#include <atl_tracing.h>
#include <atl_tracing_wm.h>

namespace propeditors
{
	using namespace scriptui_test;

	// base interface for each page
	//
	class pagebase_t
	{
	public:
		HWND hwnd;
		sigslot::signal0<>* updatecurrentscriptline;

		pagebase_t(HWND hwnd_ = 0) : hwnd(hwnd_), updatecurrentscriptline(0)
		{
		}
		virtual void setdata(const wstring_t& v_) = 0;
		virtual bool getdata(wstring_t& v_) = 0;
	};
	typedef std::vector<pagebase_t*> pagebases_t;

	namespace editors
	{
		/////////////////////////////////////////////////////////////////////
		//
		// empty editor page
		//
		class editorpage_none_t :
			public CDialogImpl<editorpage_none_t>,
			public pagebase_t
		{
		public:
			enum { IDD = IDD_EDITOR_0_DEF };
			BEGIN_MSG_MAP(editorpage_none_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				return 1;
			}
			void setdata(const wstring_t& v_)
			{
			}
			bool getdata(wstring_t& v_)
			{
				return true;
			}
		};

		/////////////////////////////////////////////////////////////////////
		//
		// editor for keystrokes page
		//
		class editorpage_keys_t :
			public CDialogImpl<editorpage_keys_t>,
			public pagebase_t,
			public sigslot::has_slots<>
		{
			class modifier_t
			{
				ui::button_t g;
				ui::button_t l;
				ui::button_t r;
			public:
				void init(const ui::window_t& dlg_, unsigned int g_, unsigned int l_, unsigned int r_)
				{
					g = dlg_.controls[g_];
					l = dlg_.controls[l_];
					r = dlg_.controls[r_];
				}
				void set(script_io::modifiers::modifier_t v_)
				{
					g.checked = v_.g;
					l.checked = v_.l;
					r.checked = v_.r;
				}
				script_io::modifiers::modifier_t get()
				{
					script_io::modifiers::modifier_t rv;
					rv.g = g.checked;
					rv.l = l.checked;
					rv.r = r.checked;
					return rv;
				}
				void updatebuttons()
				{
					bool gc = g.checked;
					bool lc = l.checked;
					bool rc = r.checked;

					g.enabled = !lc && !rc;
					l.enabled = !gc;
					r.enabled = !gc;

					if (!g.enabled) g.checked = false;
					if (!l.enabled) l.checked = false;
					if (!r.enabled) r.checked = false;
				}
			};
			class modifiers_t
			{
				modifier_t shift;
				modifier_t ctrl;
				modifier_t alt;
			public:
				void init(HWND hdlg_)
				{
					ATLASSERT(
						IDC_EDK_SHIFT2==IDC_EDK_SHIFT1+1 && IDC_EDK_SHIFT3==IDC_EDK_SHIFT2+1 && IDC_EDK_CTRL1==IDC_EDK_SHIFT3+1 && IDC_EDK_CTRL2==IDC_EDK_CTRL1+1 &&
						IDC_EDK_CTRL3 ==IDC_EDK_CTRL2 +1 && IDC_EDK_ALT1  ==IDC_EDK_CTRL3 +1 && IDC_EDK_ALT2 ==IDC_EDK_ALT1  +1 && IDC_EDK_ALT3 ==IDC_EDK_ALT2 +1);
					ui::window_t dlg(hdlg_);
					shift.init(dlg, IDC_EDK_SHIFT1, IDC_EDK_SHIFT2, IDC_EDK_SHIFT3);
					ctrl.init(dlg, IDC_EDK_CTRL1, IDC_EDK_CTRL2, IDC_EDK_CTRL3);
					alt.init(dlg, IDC_EDK_ALT1, IDC_EDK_ALT2, IDC_EDK_ALT3);
				}
				void set(script_io::modifiers::modifiers_t v_)
				{
					shift.set(v_.shift);
					ctrl.set(v_.ctrl);
					alt.set(v_.alt);
				}
				script_io::modifiers::modifiers_t get()
				{
					script_io::modifiers::modifiers_t rv;
					rv.shift = shift.get();
					rv.ctrl = ctrl.get();
					rv.alt = alt.get();
					return rv;
				}
				void updatebuttons(int i_=-1)
				{
					if (i_ == -1 || i_ == 0) shift.updatebuttons();
					if (i_ == -1 || i_ == 1) ctrl.updatebuttons();
					if (i_ == -1 || i_ == 2) alt.updatebuttons();
				}
			};
			scriptui_test::uikeys::keyscombo_t keyscombo;
			ui::edit_t repeat;
			modifiers_t modifiers;
		public:
			enum { IDD = IDD_EDITOR_1_KEYS };
			BEGIN_MSG_MAP(editorpage_keys_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				COMMAND_RANGE_CODE_HANDLER(IDC_EDK_SHIFT1, IDC_EDK_ALT3, BN_CLICKED, wm_click)
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				ui::window_t dlg(*this);
				keyscombo.SubclassWindow(dlg.controls[IDC_EDK_KEY]);
				keyscombo.itemselected_event.connect(this, &editorpage_keys_t::onitemselected_event);
				repeat = dlg.controls[IDC_EDK_REPEAT]; repeat.set_updownrange(1, 200);
				modifiers.init(*this);
				return 1;
			}
			LRESULT wm_click(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				modifiers.updatebuttons((wID - IDC_EDK_SHIFT1) / 3);
				return 0;
			}
			void setdata(const wstring_t& v_)
			{
				if (v_.empty())
				{
					//TODO: set default init
				}
				script_io::linedata::keys_t item;
				item.set(v_);

				keyscombo.setselecttag(item.key); //ATLTRACE("set tag = %S\n", item.key.c_str());
				repeat.wtext = wstrings::conv_int(item.repeat);
				modifiers.set(item.modifiers);
				modifiers.updatebuttons();
			}
			bool getdata(wstring_t& v_) //TODO: validate and if not return false
			{
				script_io::linedata::keys_t item;
				item.key = keyscombo.getselecttag(); //ATLTRACE("get tag = %S\n", item.key.c_str());
				item.repeat = wstrings::conv_int(repeat.wtext);
				item.modifiers = modifiers.get();
				v_ = item.get();
				return true;
			}
			void onitemselected_event(int v_)
			{
				if (updatecurrentscriptline)
					(*updatecurrentscriptline)();
			}
		};

		/////////////////////////////////////////////////////////////////////
		//
		// editor for position page
		//
		class editorpage_pos_t :
			public CDialogImpl<editorpage_pos_t>,
			public pagebase_t
		{
			uipos::binder_t binder;
		public:
			enum { IDD = IDD_EDITOR_2_POS };
			BEGIN_MSG_MAP(editorpage_pos_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				ui::window_t dlg(*this);
				binder.x = dlg.controls[IDC_EDP_X]; binder.x.set_updownrange(-3000, 3000);
				binder.y = dlg.controls[IDC_EDP_Y]; binder.y.set_updownrange(-3000, 3000);
				binder.drag = dlg.controls[IDC_EDP_ICON_FRAME];
				binder.dlgunits = dlg.controls[IDC_EDP_RECALC];
				return 1;
			}
			void setdata(const wstring_t& v_)
			{
				if (v_.empty())
				{
					//TODO: set default init
				}
				script_io::linedata::pos_t item;
				item.set(v_);
				binder.x.wtext = wstrings::conv_int(item.x);
				binder.y.wtext = wstrings::conv_int(item.y);
				binder.dlgunits.checked = item.dlgunits;
			}
			bool getdata(wstring_t& v_) //TODO: validate and if not return false
			{
				script_io::linedata::pos_t item;
				item.x = wstrings::conv_int(binder.x.wtext);
				item.y = wstrings::conv_int(binder.y.wtext);
				item.dlgunits = binder.dlgunits.checked;
				v_ = item.get();
				return true;
			}
			void setCaptionText(const wstring_t& v_)
			{
				if (!v_.empty())
				{
					ui::window_t dlg(*this);
					ui::window_t frame_wnd = dlg.controls[IDC_ACTIONPROP_FRAME];
					frame_wnd.put_wtext(v_);
				}
			}

		};

		/////////////////////////////////////////////////////////////////////
		//
		// editor for field page
		//
		class editorpage_field_t :
			public CDialogImpl<editorpage_field_t>,
			public pagebase_t
		{
			uifieldeditor::binder_t binder;

			BEGIN_MSG_MAP(editorpage_field_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				COMMAND_CODE_HANDLER(EN_CHANGE, handler_en_change)
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()
			enum { IDD = IDD_EDITOR_3_FIELD };

			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				binder.init(*this);
				return 1;
			}
			LRESULT handler_en_change(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				atltrace::scope_t scope("editorpage_field_t::EN_CHANGE");

				// If change comes from IDC_EDF_LABEL control only
				//
				if (wID == IDC_EDF_LABEL)
				{
					// If we have handler
					if (updatecurrentscriptline)
					{
						atltrace::text(ACOLOR_BLUE "call updatecurrentscriptline()");
						(*updatecurrentscriptline)();
					}
				}

				bHandled = FALSE;
				return 1;
			}
		public:
			void setdata(const wstring_t& v_)
			{
				if (v_.empty())
				{
					//TODO: set default init
				}
				script_io::linedata::field_t item;
				item.set(v_);

				atltrace::text(ACOLOR_LIME "script::field_t::setdata");

				binder.set_field_to_editor(item.fcfield);
			}
			bool getdata(wstring_t& v_) //TODO: validate and if not return false
			{
				script_io::linedata::field_t item;

				atltrace::text(ACOLOR_LIME "script::field_t::getdata");

				item.fcfield = binder.get_field_from_editor();

				v_ = item.get();
				return true;
			}
		};

		/////////////////////////////////////////////////////////////////////
		//
		// editor for delay opeator page
		//
		class editorpage_delay_t :
			public CDialogImpl<editorpage_delay_t>,
			public pagebase_t
		{
			ui::edit_t delay;

			inline wstring_t conv_dbl(double v) {char buf[_CVTBUFSIZE]; return strcast(_gcvt(v, 10, buf));}
			inline double conv_dbl(const wstring_t& v) {if (v.empty()) return 0.; std::wistringstream is(v); double i = 0.; is >> i; return i;}
		public:
			enum { IDD = IDD_EDITOR_4_DELAY };
			BEGIN_MSG_MAP(editorpage_delay_t)
				MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
				REFLECT_NOTIFICATIONS()
			END_MSG_MAP()
			LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
			{
				ui::window_t dlg(*this);
				delay = dlg.controls[IDC_EDD_DELAY];
				delay.set_updownrange(1, 1000);
				return 1;
			}
			void setdata(const wstring_t& v_)
			{
				if (v_.empty())
				{
					delay.wtext = L"1";
					return;
				}
				script_io::linedata::delay_t item;
				item.set(v_);
				delay.wtext = wstrings::conv_int(item.ms / 1000);
			}
			bool getdata(wstring_t& v_) //TODO: validate and if not return false
			{
				//TODO: 5 OK bu later
				//wstring_t tests = conv_dbl(3.122);
				//double testd = conv_dbl(tests);

				script_io::linedata::delay_t item;
				wstring_t ms = delay.wtext;
				if (ms.find('.') != ms.npos)
				{
					//double msd = conv_dbl(ms); //TODO: 5 OK bu later
				}
				else
					item.ms = wstrings::conv_int(ms) * 1000;
				v_ = item.get();
				return true;
			}
		};
	} //namespace editors

	class location_manager_t::ufo_t
	{
	public:
		editors::editorpage_pos_t pane_pos;
	};

	location_manager_t::location_manager_t() : ufo(0)
	{
		ufo = new location_manager_t::ufo_t();
		if (!ufo)
			com::issue_outofmemory();
	}
	
	location_manager_t::~location_manager_t()
	{
		delete ufo;
	}

	bool location_manager_t::create(HWND hparent_,const rect_t& v_,const wstring_t& title_ )
	{
		HWND hwnd  = ufo->pane_pos.Create(hparent_);
		ufo->pane_pos.setCaptionText(title_);

		ui::window_t wnd = hwnd;
		wnd.ShowWindow(SW_SHOW);
		wnd.SetWindowPos(0, v_, SWP_NOZORDER|SWP_NOACTIVATE);
		return true;
	}

	bool location_manager_t::get_currentpos(point_t& pt_) //return false if editor cannot pass verification on current data
	{
		script_io::linedata::pos_t item;
		wstring_t rv;
		bool bRet = ufo->pane_pos.getdata(rv);
		item.set(rv);
		pt_.x = item.x;
		pt_.y = item.y;
		return bRet;
	}

	void location_manager_t::set_current(const point_t& pt_)
	{
		script_io::linedata::pos_t item;
		item.x = pt_.x;
		item.y = pt_.y;
		item.dlgunits = false;
		wstring_t data = item.get();
		ufo->pane_pos.setdata(data);
	}

	
	class editorpage_manager_t::ufo_t
	{
		void initeditor(pagebase_t& newpagebase_, HWND hwnd_, const rect_t& v_, unsigned id_, int& ncreated_ids_)
		{
			newpagebase_.hwnd = hwnd_;
			newpagebase_.updatecurrentscriptline = updatecurrentscriptline;

			ui::window_t wnd = hwnd_;
			wnd.ShowWindow(SW_HIDE);
			wnd.SetWindowPos(0, v_, SWP_NOZORDER|SWP_NOACTIVATE);
			SetWindowLong(wnd, GWL_ID, id_ + ncreated_ids_++);

			pagebases.push_back(&newpagebase_);
		}
		static size_t cast_action2page(script_io::ACTION::type_t type_)
		{
			size_t rv = 0;
			switch (type_)
			{
				case script_io::ACTION::undefined : rv = 0; break;
				case script_io::ACTION::keys : rv = 1; break;
				case script_io::ACTION::pos  : rv = 2; break;
				case script_io::ACTION::field: rv = 3; break;
				case script_io::ACTION::delay: rv = 4; break;
				case script_io::ACTION::last : rv = 5; break;
			}
			return rv;
		}
		editors::editorpage_none_t pane_none;
		editors::editorpage_keys_t pane_keys;
		editors::editorpage_pos_t pane_pos;
		editors::editorpage_field_t pane_field;
		editors::editorpage_delay_t pane_delay;
	public:
		script_io::ACTION::type_t current;
		pagebases_t pagebases;
		sigslot::signal0<>* updatecurrentscriptline;

		ufo_t() : current(script_io::ACTION::undefined), updatecurrentscriptline(0)
		{
		}
		bool createpages(HWND placeholdertoremove_, int& ncreated_ids_)
		{
			ncreated_ids_ = 0;

			if (!placeholdertoremove_)
				return false;

			ui::window_t placeholder = placeholdertoremove_;

			HWND hprevwnd = placeholder.GetWindow(GW_HWNDPREV);
			HWND hparent = placeholder.GetParent();

			rect_t rc = rect_t(placeholder, INITRECT::parent);
			unsigned id = GetWindowLong(placeholder, GWL_ID);

			initeditor(pane_none,  pane_none.Create(hparent),  rc, id, ncreated_ids_);
			initeditor(pane_keys,  pane_keys.Create(hparent),  rc, id, ncreated_ids_);
			initeditor(pane_pos,   pane_pos.Create(hparent),   rc, id, ncreated_ids_);
			initeditor(pane_field, pane_field.Create(hparent), rc, id, ncreated_ids_);
			initeditor(pane_delay, pane_delay.Create(hparent), rc, id, ncreated_ids_);

			if (pagebases.size() != cast_action2page(script_io::ACTION::last))
				return false;

			for (pagebases_t::reverse_iterator it = pagebases.rbegin(); it != pagebases.rend(); ++it)
			{
				SetWindowPos((*it)->hwnd, hprevwnd, 0,0,0,0, SWP_NOMOVE|SWP_NOSIZE|SWP_NOACTIVATE);
			}

			showpage(script_io::ACTION::undefined);

			placeholder.DestroyWindow();
			return true;
		}
		void showpage(script_io::ACTION::type_t type_)
		{
			if (pagebases.empty())
				return;

			pagebase_t* oldbase = pagebases[cast_action2page(current)];
			pagebase_t* newbase = pagebases[cast_action2page(type_)];
			oldbase->updatecurrentscriptline = 0;

			ui::window_t(oldbase->hwnd).ShowWindow(SW_HIDE);
			ui::window_t(newbase->hwnd).ShowWindow(SW_SHOWNA);

			newbase->updatecurrentscriptline = updatecurrentscriptline;
			current = type_;
		}
		bool get_currentdata(wstring_t& v_)
		{
			if (pagebases.empty())
				return true;
			
			//if (current == script_io::ACTION::undefined) return false;

			bool br = false;

			pagebase_t* pcurrentbase = pagebases[cast_action2page(current)];
			if (pcurrentbase)
			{
				br = pcurrentbase->getdata(v_);
			}

			return br;
		}
		void set_currentdata(script_io::ACTION::type_t type_, const wstring_t& v_)
		{
			script_io::ACTION::type_t oldtype = current; // this is done for bug 357 for first click. the field name is not displayed coz  onupdatecurrentitem is called before current value changes
			current = type_;

			if (!pagebases.empty())
				(*pagebases[cast_action2page(type_)]).setdata(v_);

			current = oldtype;//restore value. Cannot set current = type_ here will prevent change of page
		}
	};

	/////////////////////////////////////////////////////////////////////////
	// editorpage_manager_t interface implementation

	editorpage_manager_t::editorpage_manager_t() : ufo(0)
	{
		ufo = new editorpage_manager_t::ufo_t();
		if (!ufo)
			com::issue_outofmemory();
		ufo->updatecurrentscriptline = &updatecurrentscriptline;
	}
	editorpage_manager_t::~editorpage_manager_t()
	{
		delete ufo;
	}
	bool editorpage_manager_t::create(HWND placeholdertoremove_, int& ncreated_ids_)
	{
		return ufo->createpages(placeholdertoremove_, ncreated_ids_);
	}
	void editorpage_manager_t::init_current(script_io::ACTION::type_t type_)
	{
		if (ufo->current != type_)
			ufo->showpage(type_);
	}
	void editorpage_manager_t::set_current(script_io::ACTION::type_t type_, const wstring_t& data_)
	{
		ufo->set_currentdata(type_, data_);

		if (ufo->current != type_)
			ufo->showpage(type_);
	}
	bool editorpage_manager_t::get_currentdata(wstring_t& v_)
	{
		return ufo->get_currentdata(v_);
	}
} //namespace propeditors
