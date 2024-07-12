// script_listeditor.cpp
//
#include "stdafx.h"
#include "xresource.h"
#include "script_listeditor.h"

#include <script_io.h>
#include <script_io_field.h>

#include <wtl_menubtn.h>
#include <atlctrlx.h> //for CBitmapButton

#include <atl_dialogsresize.h>
#include "script_property_ui_controls.h"
#include "script_property_editors.h"
#include <script_api_internal.h>

namespace scriptlist
{
	/////////////////////////////////////////////////////////////////////////

	class ufodata_t
	{
	public:
	}; //class ufodata_t

	/////////////////////////////////////////////////////////////////////////

	namespace scriptlineutils
	{
		inline int getimage(script_io::ACTION::type_t v_)
		{
			switch (v_)
			{
				case script_io::ACTION::keys : return 1; break;
				case script_io::ACTION::field: return 3; break;
				case script_io::ACTION::delay: return 4; break;
				case script_io::ACTION::pos  : return 0; break;
			}
			return 0;
		}

		inline unsigned int gettext(script_io::ACTION::type_t v_) //TODO: load string IDS_ED_DROPDOWNMENU
		{
			switch (v_)
			{
				case script_io::ACTION::keys : return IDS_LINETEXT_P_KEYSTROKE; break;
				case script_io::ACTION::field: return IDS_LINETEXT_P_FIELD; break;
				case script_io::ACTION::delay: return IDS_LINETEXT_P_DELAY; break;
				case script_io::ACTION::pos  : return IDS_LINETEXT_P_POS; break;
			}
			return 0;
		}

	} //namespace scriptlineutils

	namespace listeditor
	{
		/////////////////////////////////////////////////////////////////////

		class scriptline_t
		{
		public:
			script_io::ACTION::type_t type;
			wstring_t chunkdata;

			scriptline_t() : type(script_io::ACTION::undefined)
			{
			}

			int getimage() const
			{
				return scriptlineutils::getimage(type);
			}

			wstring_t getchunk_prefixtext() const
			{
				unsigned int id = scriptlineutils::gettext(type);
				return id ? script::rstring(id) : wstring_t();
			}

			wstring_t getchunk_sufixtext() const
			{
				wstring_t rv;

				switch (type)
				{
					case script_io::ACTION::keys:
						{
							script_io::linedata::keys_t item;
							item.set(chunkdata);
							VK::type_t vk = VKNAMES::cast(item.key);

							if (vk != VK::none)
							{
								//TODO: VK::none later will have modifiers
								wstring_t formatstr = script::rstring(IDS_LINETEXT_S_KEYSTROKE);

								rv = wstrprintf(formatstr.c_str(), script_io::vkdisplayname(vk));
							}
						}
						break;
					case script_io::ACTION::field:
						{
							script_io::linedata::field_t item;
							item.set(chunkdata);

							wstring_t formatstr = script::rstring(IDS_LINETEXT_S_FIELD);

							rv = wstrprintf(formatstr.c_str(), item.fcfield.disptext);
						}
						break;
					case script_io::ACTION::delay:
						{
							script_io::linedata::delay_t item;
							item.set(chunkdata);

							wstring_t formatstr = script::rstring(item.ms / 1000 <= 1 ? IDS_LINETEXT_S_DELAY : IDS_LINETEXT_S_DELAY_2);

							rv = wstrprintf(formatstr.c_str(), item.ms / 1000);
						}
						break;
					case script_io::ACTION::pos:
						{
							script_io::linedata::pos_t item;
							item.set(chunkdata);

							rv = wstrprintf(script::rstring(IDS_LINETEXT_S_POS).c_str(), item.x, item.y);
						}
						break;
				} //switch

				return rv;

			} //getchunk_sufixtext()

		}; //class scriptline_t

		class scriptlines_t :
			public std::list< scriptline_t >
		{
		public:
		}; //scriptlines_t

		/////////////////////////////////////////////////////////////////////
		//
		template <typename masterT>
		class ownerdrawapi_T :
			public CWindowImpl<ownerdrawapi_T<masterT>, CDragListBox>,
			public COwnerDraw<ownerdrawapi_T<masterT> >
		{
			LRESULT onselchanged(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
			{
				atltrace::scope_t scope("LEFT::LBN_SELCHANGE");

				master.doselchanged();
				return 0;
			}

			MASTER(masterT);
		public:
			CImageList imagelist;

			enum { ICON_SIZE = 16, BORDER = 2 };

			BEGIN_MSG_MAP(ownerdrawapi_T<masterT>)
				CHAIN_MSG_MAP_ALT(COwnerDraw<ownerdrawapi_T>, 1)
				REFLECTED_COMMAND_CODE_HANDLER(LBN_SELCHANGE, onselchanged)
			END_MSG_MAP()

			BOOL SubclassWindow(HWND hWnd)
			{
				const int ICONSIZE = 16;

				//imagelist.Create(IDB_IL_LISTEDITOR08, ICONSIZE, 0, RGB(0,255,0));
				//imagelist.Create(IDB_IL_LISTEDITOR24, ICONSIZE, 0, RGB(0,255,0));
				//imagelist.Create(IDB_IL_LISTEDITOR32, ICONSIZE, 0, RGB(0,255,0));
				imagelist.CreateFromImage(IDB_IL_LISTEDITOR32, ICONSIZE, 0, CLR_DEFAULT, IMAGE_BITMAP, LR_CREATEDIBSECTION);

				BOOL br = CWindowImpl<ownerdrawapi_T, CDragListBox>::SubclassWindow(hWnd);
				if (br)
				{
					ModifyStyle(LBS_SORT|LBS_HASSTRINGS, 0);
					SetItemHeight(0, ICON_SIZE + 2 * BORDER + 1);
				}

				return br;
			}

			void MeasureItem(LPMEASUREITEMSTRUCT pMS)
			{
				pMS->itemHeight = ICON_SIZE + 2 * BORDER + 1;
				pMS->itemWidth = rect_t(*this).right;
			}

			void DrawItem(LPDRAWITEMSTRUCT pDS)
			{
				if (pDS)
					master.dodrawitem(*pDS);
			}

			// to override
			void dodrawitem(DRAWITEMSTRUCT& ds)
			{
			}

			// to override
			void doselchanged()
			{
			}

		}; //class ownerdrawapi_T

		/////////////////////////////////////////////////////////////////////
		//
		template <typename masterT>
		class dragingapi_T :
			public ownerdrawapi_T<masterT>,
			public CDragListNotifyImpl< dragingapi_T<masterT> >
		{
			MASTER(masterT);

			int itembeingdragged;
		public:
			int prevselected;

			dragingapi_T() :
				prevselected(-1)
			{
			}

			BEGIN_MSG_MAP(dragingapi_T<masterT>)
				CHAIN_MSG_MAP(ownerdrawapi_T<masterT>)
				DEFAULT_REFLECTION_HANDLER()
			ALT_MSG_MAP(1)
				CHAIN_MSG_MAP(CDragListNotifyImpl<dragingapi_T<masterT> >)
			END_MSG_MAP()

			BOOL SubclassWindow(HWND hWnd)
			{
				BOOL br = ownerdrawapi_T<masterT>::SubclassWindow(hWnd);
				if (!br)
					return br;

				itembeingdragged = -1;
				MakeDragList();

				return TRUE;
			}

			void swapitemsdata(int a, int b)
			{
				DWORD_PTR da = GetItemData(a);
				DWORD_PTR db = GetItemData(b);
				SetItemData(a, db);
				SetItemData(b, da);
			}

			// Overrideables
			BOOL OnBeginDrag(int nCtlID, HWND hWndDragList, POINT ptCursor)
			{
				itembeingdragged = LBItemFromPt(ptCursor, TRUE);
				return itembeingdragged != -1;
			}

			void OnCancelDrag(int nCtlID, HWND hWndDragList, POINT ptCursor)
			{
				DrawInsert(-1), itembeingdragged = -1;
			}

			int OnDragging(int nCtlID, HWND hWndDragList, POINT ptCursor)
			{
				int i = LBItemFromPt(ptCursor, TRUE);

				DrawInsert(i);

				ATLTRACE("OnDragging() x=%d, y=%d, LBItemFromPt=%d\n", ptCursor.x, ptCursor.y, i);

				return DL_MOVECURSOR;
			}

			void OnDropped(int nCtlID, HWND hWndDragList, POINT ptCursor)
			{
				if (itembeingdragged == -1)
					return;

				DrawInsert(-1);

				int current = LBItemFromPt(ptCursor, TRUE);

				ATLTRACE("OnDropped() itembeingdragged=%d, current=%d\n", itembeingdragged, current);

				if (current != -1 && current != itembeingdragged)
				{
					if (itembeingdragged < current)
					{
						current--;
					}

					{
						DWORD_PTR da = GetItemData(itembeingdragged);
						DeleteString(itembeingdragged);
						InsertString(current, (wchar_t*)da);
						SetCurSel(current), prevselected = current, Invalidate(FALSE);

						master.update_buttons_and_propeditor();
					}

					ATLTRACE("OnDropped() new prevselected=%d\n", prevselected);
				}
			}

		}; //class dragingapi_T

		/////////////////////////////////////////////////////////////////////
		//TODO: allow drag over last item
		//TODO: dynamicaly update line during edit
		//TODO: draw separator line during dragging
		//TODO: draw icon during dragging
		//TODO: keyboard support for dragging, like Ctrl+Up, Ctrl+Down
		//TODO: default field names: IDS_DEFAULT_USERNAME, IDS_DEFAULT_PASSWORD, IDS_DEFAULT_EXTRAFIELD

		template <typename masterT>
		class drawing_t :
			public dragingapi_T<masterT>
		{
			enum { INDENT_X = 4 };
		public:
			scriptline_t& get_scriptline(int index) //for drawing and item changed
			{
				scriptline_t* p = (scriptline_t*)GetItemData(index);

				if (!p || int(p) == -1)
				{
					atltrace::error(wformat(L"invalid UI pointer at index = %d", index));

					ATLASSERT(FALSE);
					com::issue_outofmemory();
				}

				return *p;
			}

			void dodrawitem(DRAWITEMSTRUCT& ds) // overriden ownerdrawapi_T
			{
				// 1. fill background and selection
				//
				{
					COLORREF hiinactive = GetSysColor(COLOR_WINDOW) != GetSysColor(COLOR_BTNFACE) ? GetSysColor(COLOR_BTNFACE) : GetSysColor(COLOR_HIGHLIGHT);
					SetBkColor(ds.hDC, ds.itemState & ODS_SELECTED ? (ds.itemState & ODS_FOCUS ? GetSysColor(COLOR_HIGHLIGHT) : hiinactive) :GetSysColor(COLOR_WINDOW));
					ExtTextOut(ds.hDC, 0, 0, ETO_OPAQUE, &ds.rcItem, NULL, 0, NULL);
				}
				// 2. draw icon and text
				//
				if (int(ds.itemID) >= 0 && int(ds.itemID) < GetCount())
				{
					try {
						scriptline_t& scriptline = get_scriptline(ds.itemID);

						point_t currentpt = point_t(ds.rcItem.left + INDENT_X, ds.rcItem.top + BORDER);

						imagelist.Draw(ds.hDC, scriptline.getimage(), currentpt, ILD_NORMAL);
						currentpt.x += (ICON_SIZE + INDENT_X);

						sel::font_color_t font_color(ds.hDC, TRANSPARENT,
							(ds.itemState & (ODS_SELECTED|ODS_FOCUS)) == (ODS_SELECTED|ODS_FOCUS) ? GetSysColor(COLOR_HIGHLIGHTTEXT) : GetSysColor(COLOR_BTNTEXT));

						wstring_t ws = scriptline.getchunk_prefixtext();
						ws += L" ";
						ws += scriptline.getchunk_sufixtext();

						//atltrace::text(L"getchunk_sufixtext '%s' chunk '%s'", scriptline.getchunk_prefixtext(), scriptline.chunkdata);

						rect_t rtext = ds.rcItem;
						rtext.left = currentpt.x;
						const int heedtoget_y_center = 2;
						ExtTextOutW(ds.hDC, currentpt.x, currentpt.y+heedtoget_y_center, ETO_OPAQUE, rtext, ws.c_str(), ws.length(), NULL);
					}
					catch(...)
					{
						atltrace::error(wformat(L"dodrawitem() INVALID ACCESS ds.itemID = %d", ds.itemID));
					}
				}
				else
					atltrace::error(wformat(L"invalid ds.itemID = %d", ds.itemID));

				// 3. draw focus
				//
				if (ds.itemState & ODS_FOCUS)
				{
					DrawFocusRect(ds.hDC, &ds.rcItem);
				}

			} //dodrawitem()

		}; //class drawing_t

		/////////////////////////////////////////////////////////////////////
		//

		inline void printlinedata(const wstring_t& chunk_)
		{
			if (chunk_.empty())
			{
				atltrace::text(WCOLOR_GRAY L"    ''");
			}
			else
			{
				wstrings_t ss;
				strings::split(chunk_, wstring_t(L","), ss);

				for (wstrings_t::const_iterator it = ss.begin(); it != ss.end(); ++it)
				{
					atltrace::text(WCOLOR_GRAY L"    '%s'", *it);
				}
			}

		} //printlinedata()

		class scriptlistui_t :
			public drawing_t<scriptlistui_t>,
			public sigslot::has_slots<>
		{
			void update_propeditor()
			{
				atltrace::scope_t scope(__FUNCTION__);

				script_io::ACTION::type_t i = script_io::ACTION::undefined;
				wstring_t s;

				int current = GetCurSel(); //ATLTRACE("old prevselected=%d ", prevselected);
				
				scriptline_t* pscriptlineitem = 0;
				{
					if (current >= 0 && !scriptlines.empty())
					{
						pscriptlineitem = &get_scriptline(current);
					}
				}

				if (pscriptlineitem)
				{
					wstring_t currentdata;

					if (editorpage_manager.get_currentdata(currentdata))
					{
						if (prevselected >= 0 && prevselected != current)
						{
							ATLASSERT(prevselected < (int)scriptlines.size());

							scriptline_t& previtem = get_scriptline(prevselected);
							previtem.chunkdata = currentdata;
							//updateitem(prevselected); //OK but we don't need it here anymore, since wehandle events

							if (scope.active)
							{
								scope.text(WCOLOR_GRAY L" saved item n = %d data:", prevselected);
								printlinedata(currentdata);
							}
						}

						if (prevselected != current)
						{
							if (scope.active)
							{
								scope.text(WCOLOR_GRAY L"loaded item n = %d data:", current);
								printlinedata(pscriptlineitem->chunkdata);
							}

							editorpage_manager.set_current(pscriptlineitem->type, pscriptlineitem->chunkdata);
							prevselected = current;
						}
					}
				}
				else
				{
					editorpage_manager.set_current(script_io::ACTION::undefined, L"");
					prevselected = -1;
				}

				//ATLTRACE("new prevselected=%d\n", prevselected);

			} //update_propeditor()

			void redrawitem(int v_)
			{
				rect_t rect;
				if (GetItemRect(v_, rect) == LB_ERR)
					Invalidate(false); //to redraw previous item that might show info inline; TODO: find the way update one line only
				else
					InvalidateRect(rect, false);
			}

		public:
			scriptlines_t scriptlines;
			propeditors::editorpage_manager_t editorpage_manager;

			int add_scriptline(const script_io::ACTION::type_t& v_, const wstring_t& scriptdata_)
			{
				scriptline_t& newitem = *scriptlines.insert(scriptlines.end(), scriptline_t());
				newitem.type = v_;
				newitem.chunkdata = scriptdata_;
				int i = AddString((wchar_t*)&newitem); if (i < 0) scriptlines.pop_back(), i = -1;
				return i;
			}

			void new_scriptline(const script_io::ACTION::type_t& v_)
			{
				int i = add_scriptline(v_, wstring_t());
				if (i >= 0)
					SetCurSel(i);

				update_buttons_and_propeditor();
				onupdatecurrentitem();
			}

			void del_scriptline()
			{
				int i = GetCurSel();
				if (i < 0)
					return;
				ATLASSERT(i < (int)scriptlines.size());
				if (i >= (int)scriptlines.size())
					return;

				{
					scriptline_t* us = (scriptline_t*)GetItemData(i);

					for (scriptlines_t::iterator it = scriptlines.begin(); it != scriptlines.end(); ++it)
					{
						if (us == &(*it))
						{
							scriptlines.erase(it);
							break;
						}
					}
				}
				DeleteString(i);
				prevselected = -1;

				if (!scriptlines.empty())
					SetCurSel(i == scriptlines.size() ? i-1 : i);
				else
					SetFocus();

				update_buttons_and_propeditor();
			}

			void updown_button(bool up_) //called from button up/down click
			{
				int current = GetCurSel();
				if (current < 0 || scriptlines.empty())
					return;

				int i = up_ ? current-1 : current+1;

				if (i >= 0 && i < (int)scriptlines.size())
				{
					swapitemsdata(current, i), SetCurSel(i), prevselected = i, Invalidate(FALSE);
				}

				update_buttons_and_propeditor();
			}

			void update_buttons_and_propeditor()
			{
				ui::window_t dlg(GetParent());

				int cnt = GetCount();
				int current = GetCurSel();

				ui::window_t del = dlg.controls[IDC_BUTTON_DEL]; del.enabled = cnt > 0;
				ui::window_t btnup = dlg.controls[IDC_BUTTON_U]; btnup.enabled = cnt > 1 && current > 0;
				ui::window_t btndn = dlg.controls[IDC_BUTTON_D]; btndn.enabled = cnt > 1 && current < cnt-1;

				update_propeditor();
			}

			void onupdatecurrentitem() // Called on changes from current editor
			{
				int current = GetCurSel();
				if (current < 0 || scriptlines.empty())
					return;

				wstring_t currentdata;
				if (editorpage_manager.get_currentdata(currentdata))
				{
					get_scriptline(current).chunkdata = currentdata;
					redrawitem(current);
				}
			}

			void doselchanged() //called on current item changed into list of actions; overriden ownerdrawapi_T
			{
				//atltrace::scope_t scope("doselchanged"); // atltrace::text(L"SEL CHANGED");

				update_buttons_and_propeditor();
			}

			bool save_linedata(int i_)
			{
				atltrace::scope_t scope(__FUNCTION__);

				if (i_ >= 0 && i_ < GetCount())
				{
					wstring_t currentdata;
					if (editorpage_manager.get_currentdata(currentdata))
					{
						ATLASSERT(i_ < (int)scriptlines.size());

						scriptline_t& item = get_scriptline(i_);
						item.chunkdata = currentdata;

						if (scope.active)
						{
							scope.text(WCOLOR_GRAY L" saved item n=%d data:", i_);
							printlinedata(currentdata);
						}

						return true;
					}
				}
				return false;
			}

		}; //class scriptlistui_t

		/////////////////////////////////////////////////////////////////////
		//
		class slbinder_t :
			public sigslot::has_slots<>
		{
			void onloadfields(const script::manifestapi::fields_t& v_)
			{
				atltrace::scope_t scope("slbinder_t::onloadfields");

				// 1. convert manifestapi::fields_t to listbox lines
				//
				script_io::lines_t lines = script_io::prepareforeditor(v_);

				// 2. reset listbox content
				//
				slui.ResetContent();
				slui.scriptlines.clear();

				if (scope.active)
				{
					scope.text(ACOLOR_INFO "---- load");
					int i = 0;
					for (script_io::lines_t::const_iterator it = lines.begin(); it != lines.end(); ++it)
					{
						scope.text(WCOLOR_GRAY L"line %d '%s':", i++, script_io::lines_io::cast_action((*it).action));
						printlinedata((*it).line);
					}
					scope.text(ACOLOR_INFO "---- load done");
				}

				// 3. populate listbox with lines
				//
				for (script_io::lines_t::const_iterator it = lines.begin(); it != lines.end(); ++it)
				{
					slui.add_scriptline((*it).action, (*it).line);
				}

				// 4. set current selection to first item, if not exist yet then create it
				//
				if (!slui.scriptlines.empty())
				{
					slui.SetCurSel(0);

					scriptline_t* pscriptlineitem = &slui.get_scriptline(0);
					if (pscriptlineitem)
					{
						slui.editorpage_manager.init_current(pscriptlineitem->type);
					}
				}

				// 5. update buttons by current page
				//
				slui.update_buttons_and_propeditor();

			} //onloadfields()

			void onqueryfields()
			{
				atltrace::scope_t scope("slbinder_t::onqueryfields");

				// 1. validate current line
				//
				if (!slui.save_linedata(slui.GetCurSel()))
					return;

				// 2. Get real order of parts from list control
				//
				typedef std::vector<listeditor::scriptline_t*> orderedlistlines_t;
				orderedlistlines_t orderedlistlines;
				{
					int n = slui.GetCount();
					for (int i = 0; i < n; ++i)
					{
						scriptline_t* p = (scriptline_t*)slui.GetItemData(i);
						orderedlistlines.push_back(p);
					}
				}

				// 3. Convert editor data to io format
				//
				script_io::lines_t lines;
				for (orderedlistlines_t::const_iterator it = orderedlistlines.begin(); it != orderedlistlines.end(); ++it)
				{
					script_io::line_t ln;
					ln.action = (*it)->type;
					ln.line = (*it)->chunkdata;
					back_inserter(lines) = ln;
				}

				if (scope.active)
				{
					scope.text(ACOLOR_INFO "---- save");
					int i = 0;
					for (script_io::lines_t::const_iterator it = lines.begin(); it != lines.end(); ++it)
					{
						scope.text(WCOLOR_GRAY L"line %d '%s':", i++, script_io::lines_io::cast_action((*it).action));
						printlinedata((*it).line);
					}
					scope.text(ACOLOR_INFO "---- save done");
				}

				__raise (script::internal::fieldevents_t::instance()).queryfields_reply(script_io::preparefromeditor(lines));

			} //onqueryfields()

			void onisfieldsready(bool& v_)
			{
				atltrace::scope_t scope("slbinder_t::onisfieldsready");

				v_ = false;

				//1. check that at least one field present
				//
				bool has_fieldline = false;
				{
					for (listeditor::scriptlines_t::const_iterator it=slui.scriptlines.begin(); it!=slui.scriptlines.end(); ++it)
					{
						if ((*it).type != script_io::ACTION::field)
							continue;

						has_fieldline = true;
						break;
					}
				}
				if (!has_fieldline)
				{
					rect_t rc(slui);
					rc.left += rc.width / 2;
					rc.top += rc.height;

					rc = rc.clienttoscreen(slui);
					rc = rc.screentoclient(window_topparent(slui));

					script::showtooltip(script::rstring(IDS_ER_TITLE), script::rstring(IDS_ER_NOFIELDS), rc.left, rc.top);
				}

				//2. verify current
				//
				bool ok_tosave = slui.save_linedata(slui.GetCurSel());
				v_ = has_fieldline && ok_tosave;
				if (v_)
					script::hidetooltip();

			} //onisfieldsready()

		public:
			scriptlistui_t slui;

			slbinder_t()
			{
				script::internal::fieldevents_t::instance().loadfields.connect(this, &slbinder_t::onloadfields);
				script::internal::fieldevents_t::instance().queryfields.connect(this, &slbinder_t::onqueryfields);
				script::internal::fieldevents_t::instance().isfieldsready.connect(this, &slbinder_t::onisfieldsready);
			}

		}; //class slbinder_t

	} //namespace listeditor

	////////////////////////////////////////////////////////////////////////////

	class arrowbutton_t :
		public CBitmapButton
	{
	public:
	}; //class arrowbutton_t

	////////////////////////////////////////////////////////////////////////////

	class scriptpane_t :
		public CDialogImpl<scriptpane_t>
	{
		class resizer_t :
			public resize::resizewnd_T<resizer_t>
		{
		public:
			int extra_ids;
			int extra_ncreated_ids;

			resizer_t() : extra_ids(0), extra_ncreated_ids(0)
			{
			}

			void rules() //to overwrite
			{
				addcontrol(IDC_SCRIPTLIST,	resize::BORDER, resize::BORDER, resize::BORDER, resize::BORDER);

				addcontrol(IDC_BUTTON_U,	resize::KEEPSIZE, resize::BORDER, resize::BORDER, resize::KEEPSIZE);
				addcontrol(IDC_BUTTON_D,	resize::KEEPSIZE, resize::BORDER, resize::BORDER, resize::KEEPSIZE);
				addcontrol(IDC_BUTTON_ADD,	resize::BORDER, resize::KEEPSIZE, resize::KEEPSIZE, resize::BORDER);
				addcontrol(IDC_BUTTON_DEL,	resize::BORDER, resize::KEEPSIZE, resize::KEEPSIZE, resize::BORDER);

				for (int i = 0; i < extra_ncreated_ids; i++)
				{
					addcontrol(extra_ids + i, resize::KEEPSIZE, resize::BORDER, resize::BORDER, resize::KEEPSIZE);
				}

			  //addcontrol(IDC_ACTIONPROP_FRAME, resize::KEEPSIZE, resize::BORDER, resize::BORDER, resize::KEEPSIZE);
			}

		}; //class resizer_t
		resizer_t resizer;

		ufodata_t& ufodata;
		menubutton_t menubutton;

		arrowbutton_t arrowbutton_u;
		arrowbutton_t arrowbutton_d;
	public:
		listeditor::slbinder_t slbinder;

		scriptpane_t(ufodata_t& ufodata_) : ufodata(ufodata_)
		{
		}

		enum { IDD = IDD_CONTROL_SCRIPTLIST };

		BEGIN_MSG_MAP(scriptpane_t)
			MESSAGE_HANDLER(WM_INITDIALOG, wm_initdialog)
			MESSAGE_HANDLER(WM_MOUSEMOVE, wm_mousemove)
			COMMAND_RANGE_HANDLER(IDM_ADD_KEYS, IDM_ADD_POS, on_add)
			COMMAND_ID_HANDLER(IDC_BUTTON_DEL, on_del)
			COMMAND_ID_HANDLER(IDC_BUTTON_U, on_updown)
			COMMAND_ID_HANDLER(IDC_BUTTON_D, on_updown)
			CHAIN_MSG_MAP_ALT_MEMBER(slbinder.slui, 1)
			CHAIN_MSG_MAP_MEMBER(resizer)
			REFLECT_NOTIFICATIONS()
		END_MSG_MAP()

		LRESULT wm_initdialog(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
		{
			atltrace::scope_t scope("LEFT::initdialog");

			ui::window_t dlg(*this);
			menubutton = dlg.controls[IDC_BUTTON_ADD];
			menubutton.SetMenuID(IDR_MENU_ADD);

			//scope.text("creating UI");

			slbinder.slui.SubclassWindow(dlg.controls[IDC_SCRIPTLIST]);
			slbinder.slui.update_buttons_and_propeditor();

//			arrowbutton_u.SubclassWindow(dlg.controls[IDC_BUTTON_U]); arrowbutton_u.m_ImageList.Create(IDB_BTN_ARROWS, 11, 0, RGB(255,255,255)); arrowbutton_u.SetImages(0);
//			arrowbutton_d.SubclassWindow(dlg.controls[IDC_BUTTON_D]); arrowbutton_d.m_ImageList.Create(IDB_BTN_ARROWS, 11, 0, RGB(255,255,255)); arrowbutton_d.SetImages(1);

			DWORD dw = /*BMPBTN_SHAREIMAGELISTS |*/ BMPBTN_AUTO3D_SINGLE | BMPBTN_AUTOSIZE | BMPBTN_HOVER;
//			arrowbutton_u.SetBitmapButtonExtendedStyle(dw);
//			arrowbutton_d.SetBitmapButtonExtendedStyle(dw);

			//scope.text("creating UI manager");

			resizer.extra_ids = IDC_ACTIONPROP_FRAME;
			slbinder.slui.editorpage_manager.create(dlg.controls[IDC_ACTIONPROP_FRAME], resizer.extra_ncreated_ids);
			slbinder.slui.editorpage_manager.updatecurrentscriptline.connect(&slbinder.slui, &listeditor::scriptlistui_t::onupdatecurrentitem);

			resizer.definedrules(*this);

			//temp here for debug
			/*
			BOOL bHandled2 = 0;
			on_add(0, IDM_ADD_KEYS, 0, bHandled2);
			on_add(0, IDM_ADD_POS, 0, bHandled2);
			on_add(0, IDM_ADD_FIELD, 0, bHandled2);
			*/
			slbinder.slui.SetFocus();

			scope.text("creating UI done");
			return 0;
			//
			ATLASSERT(IDM_ADD_FIELD==IDM_ADD_KEYS+1 && IDM_ADD_DELAY==IDM_ADD_FIELD+1 && IDM_ADD_POS==IDM_ADD_DELAY+1);

			//TODO: and then validate the initialization
			return TRUE;

		} //wm_initdialog()

		LRESULT wm_mousemove(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled) 
		{
			script::autohidetooltip(*this, lParam); bHandled = FALSE; return 0;
		}

		LRESULT on_add(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
		{
			script_io::ACTION::type_t newtype = script_io::ACTION::undefined;

			switch (wID)
			{
				case IDM_ADD_KEYS : newtype = script_io::ACTION::keys; break;
				case IDM_ADD_FIELD: newtype = script_io::ACTION::field; break;
				case IDM_ADD_DELAY: newtype = script_io::ACTION::delay; break;
				case IDM_ADD_POS  : newtype = script_io::ACTION::pos; break;
			}

			if (newtype != script_io::ACTION::undefined)
			{
				slbinder.slui.new_scriptline(newtype);
				dialogs::focus_controlnext(slbinder.slui);
			}

			return 0;
		}

		LRESULT on_del(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
		{
			slbinder.slui.del_scriptline();
			return 0;
		}

		LRESULT on_updown(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled)
		{
			slbinder.slui.updown_button(wID == IDC_BUTTON_U);
			return 0;
		}

	}; //class scriptpane_t

	/////////////////////////////////////////////////////////////////////////
	// editor_t interface implementation

	class ufo_t
	{
	public:
		ufodata_t ufodata;
		scriptpane_t scriptpane;

		ufo_t() : scriptpane(ufodata)
		{
		}

	}; //class ufo_t

	editor_t::editor_t() : ufo(0)
	{
		ufo = new ufo_t();
		if (!ufo)
			com::issue_outofmemory();
	}

	editor_t::~editor_t()
	{
		delete ufo;
	}

	bool editor_t::create(HWND hparent_, const rect_t& v_, unsigned id_)
	{
		if (!ufo->scriptpane.Create(hparent_))
			return false;

		ufo->scriptpane.ShowWindow(SW_SHOWNA);
		ufo->scriptpane.SetWindowPos(0, v_, SWP_NOZORDER|SWP_NOACTIVATE);
		SetWindowLong(ufo->scriptpane, GWL_ID, id_);

		return true;
	}

} //namespace scriptlist
