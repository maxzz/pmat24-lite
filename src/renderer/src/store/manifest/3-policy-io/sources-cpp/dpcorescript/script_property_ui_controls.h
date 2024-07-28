// #include "script_property_ui_controls.h"
//
#pragma once

#include <ui_combo.h>
#include <script_api.h>
#include <script_io.h>
#include <atl_tracing.h>

#include <script_api_internal.h>
#include "script_tooltip.h"
#include "script_ui_controls.h"

#include "debugcategories_engine.h"
#include "atl_sendinput++.h"
#include "xres/xresource_vkeynames.h"

namespace script_io
{
	using namespace script;

	inline wstring_t vkdisplayname(VK::type_t vk_)
	{
		if ((vk_ >= VK::z_0 && vk_ <= VK::z_9) || (vk_ >= VK::z_a && vk_ <= VK::z_z))
		{
			return wstring_t(1, wchar_t(vk_));
		}
		else
		{
			wstring_t ws = VKNAMES::cast(vk_);
			if (ws.length() == 4 && ws[0] == 'y' && ws[1] == '_')
			{
				return wstrprintf(L"0x%2hX", (short unsigned int)vk_); //unassigned keys by ms
			}
			else
			{
				wstring_t res = rstring(VKNAMES_BASE + vk_); return res.empty() ? ws : res;
			}
		}
	}

	namespace impl
	{
		class key_t
		{
		public:
			VK::type_t vk;
			wstring_t tag;
			wstring_t disptext;
			bool begingroup:1;
			bool highlight:1;
			key_t() : vk(VK::none), begingroup(false), highlight(false)
			{
			}
		};

		class keys_t : public std::vector<key_t>
		{
			void init()
			{
				struct kn_t
				{
					VK::type_t vk;
					bool begingroup;
				};

				const kn_t values[] =
				{
					{VK::tab,     true},
					{VK::return2, false},
					{VK::escape,  false},
					{VK::left,    true},
					{VK::right,   false},
					{VK::up,      false},
					{VK::down,    false},
					{VK::prior,   true},
					{VK::next,    false},
					{VK::home,    false},
					{VK::end,     false},
					{VK::insert,  true},
					{VK::delete2, false},
					{VK::back,    true},
					{VK::space,   false},
					{VK::none,    true},
					{VK::f1,      true},
					{VK::f2,      false},
					{VK::f3,      false},
					{VK::f4,      false},
					{VK::f5,      false},
					{VK::f6,      false},
					{VK::f7,      false},
					{VK::f8,      false},
					{VK::f9,      false},
					{VK::f10,     false},
					{VK::f11,     false},
					{VK::f12,     false},
				};

				for (const kn_t* pkn = values; pkn != values + sizeof_array(values); ++pkn)
				{
					key_t& item = *insert(end(), key_t());

					item.vk = pkn->vk;
					item.tag = VKNAMES::cast(item.vk);
					item.disptext = vkdisplayname(item.vk);
					item.begingroup = pkn->begingroup;
				}

				updatehighlight();
			}

			void updatehighlight()
			{
				bool highlight = true;
				for (iterator it=begin(); it!=end(); ++it)
				{
					if ((*it).begingroup)
						highlight = !highlight;
					(*it).highlight = highlight;
				}
			}

		public:
			keys_t()
			{
				init();
			}

			int findtag(const wstring_t& tag_) const
			{
				for (const_iterator it=begin(); it!=end(); ++it)
				{
					if ((*it).tag == tag_)
					{
						return std::distance(begin(), it);
					}
				}
				return -1;
			}

		};

	} //namespace impl
} //namespace script_io

namespace scriptui_test
{
	namespace uikeys
	{
		class keyscombo_t : public CWindowImpl<keyscombo_t, WTL::CComboBox>, public WTL::COwnerDraw<keyscombo_t>
		{
			enum { ICON_SIZE = 16, BORDER = 2 };

			BEGIN_MSG_MAP(keyscombo_t)
				CHAIN_MSG_MAP_ALT(WTL::COwnerDraw<keyscombo_t>, 1)
				REFLECTED_COMMAND_CODE_HANDLER(CBN_SELENDOK, wn_selendok)
				DEFAULT_REFLECTION_HANDLER()
			END_MSG_MAP()
			LRESULT wn_selendok(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled) {doselendok(); return 0;}

			void doselendok()
			{
				int currentselected = GetCurSel();
				if (currentselected < 0) return;
				itemselected_event(currentselected);
			}
			/*
			void MeasureItem(LPMEASUREITEMSTRUCT pMS)
			{
				pMS->itemHeight = ICON_SIZE + 2 * BORDER + 1;
				pMS->itemWidth = rect_t(*this).right;
			}
			*/
			void DrawItem(LPDRAWITEMSTRUCT pDS) {if (pDS) dodrawitem(*pDS);}
			void dodrawitem(DRAWITEMSTRUCT& ds) //to override
			{
				// fill background and selection
				{
					COLORREF hiinactive = GetSysColor(COLOR_WINDOW) != GetSysColor(COLOR_BTNFACE) ? GetSysColor(COLOR_BTNFACE) : GetSysColor(COLOR_HIGHLIGHT);
					SetBkColor(ds.hDC, 
						ds.itemState & ODS_SELECTED ? (ds.itemState & ODS_FOCUS ? GetSysColor(COLOR_HIGHLIGHT) : hiinactive) : GetSysColor(COLOR_WINDOW)
					);
					ExtTextOut(ds.hDC, 0, 0, ETO_OPAQUE, &ds.rcItem, NULL, 0, NULL);
				}
/*
				ATLTRACE("draw l=%-2d, t=%-3d, r=%-2d, b=%-3d, id=%2d, type [%s], action [%-14s], state [%s]",
					ds.rcItem.left, ds.rcItem.top, ds.rcItem.right, ds.rcItem.bottom, ds.itemID,
					debug::ownerdraw::type(ds.CtlType).c_str(),
					debug::ownerdraw::action(ds.itemAction).c_str(),
					debug::ownerdraw::state(ds.itemState).c_str()
					);
*/
				// draw icon and text
				if (ds.itemID >= 0 && ds.itemID < (unsigned)GetCount())
				{
					script_io::impl::key_t& item = keys[ds.itemID];

					if ((ds.itemState & ODS_COMBOBOXEDIT) == 0 && (ds.itemState & ODS_FOCUS) == 0)
					{
//						ATLTRACE(" done\n");
						rect_t rcc = ds.rcItem;
						//rcc.right = rcc.left + 10;
						COLORREF hiinactive = item.highlight ? colors_test::BrightenColor(GetSysColor(COLOR_BTNFACE), 500) : GetSysColor(COLOR_WINDOW);
						COLORREF old = SetBkColor(ds.hDC, hiinactive);
						ExtTextOut(ds.hDC, 0, 0, ETO_OPAQUE, &ds.rcItem, NULL, 0, NULL);
						//SetBkColor(ds.hDC, old);
					}
					else
					{
//						ATLTRACE(" none\n");
					}

					enum { INDENT_X = 4 };

					point_t current = point_t(ds.rcItem.left + INDENT_X, ds.rcItem.top/* + BORDER*/);

					//imagelist.Draw(ds.hDC, item.getimage(), current, ILD_NORMAL);
					//current.x += (ICON_SIZE + INDENT_X);

					sel::font_color_t font_color(ds.hDC, TRANSPARENT,
						(ds.itemState & (ODS_SELECTED|ODS_FOCUS)) == (ODS_SELECTED|ODS_FOCUS) ? GetSysColor(COLOR_HIGHLIGHTTEXT) : GetSysColor(COLOR_BTNTEXT));

					wstring_t ws = item.disptext;
					rect_t rtext = ds.rcItem;
					rtext.left = current.x;
					const int heedtoget_y_center = 1;
					ExtTextOutW(ds.hDC, current.x, current.y + heedtoget_y_center, ETO_OPAQUE, rtext, ws.c_str(), ws.length(), NULL);
				}

				// draw focus
				if (ds.itemState & ODS_FOCUS)
				{
					rect_t r = ds.rcItem;
					//r.InflateRect(-2, -2);
					DrawFocusRect(ds.hDC, r);
				}
			}
			script_io::impl::keys_t keys;
		public:
			BOOL SubclassWindow(HWND hWnd)
			{
				BOOL br = CWindowImpl<keyscombo_t, WTL::CComboBox>::SubclassWindow(hWnd);
				if (br)
				{
					ModifyStyle(LBS_SORT|LBS_HASSTRINGS, 0);

					int i = ui::combo::calcitemheight(m_hWnd);
					SetItemHeight(-1, i);
					SetItemHeight(0, i);

					init();
				}
				return br;
			}
			void init()
			{
				for (script_io::impl::keys_t::const_iterator it=keys.begin(); it!=keys.end(); ++it)
				{
					int i = AddString((*it).disptext.c_str());
					SetItemData(i, DWORD_PTR((const script_io::impl::key_t*)&(*it)));
				}
				SetCurSel(0);
			}
			void setselecttag(const wstring_t& tag_)
			{
				int i = keys.findtag(tag_); if (i < 0) i = 0;
				SetCurSel(i);
			}
			wstring_t getselecttag() const
			{
				wstring_t rv;
				int i = GetCurSel();
				if (i >= 0 && i < GetCount())
					rv = keys[i].tag;
				else
					rv = keys[0].tag;
				return rv;
			}
			sigslot::signal1<int> itemselected_event;
		};
	} //namespace uikeys

	namespace dragging
	{
		namespace common
		{
			template <typename masterT>

			#if (_MSC_VER == 1310) //VS 7.1

			class targetlace_T : public CWindowImpl<targetlace_T>, public ui::common::dragging_T<masterT>

			#else if (_MSC_VER == 1400) //VS 8.0

			class targetlace_T : public CWindowImpl<targetlace_T<masterT> >, public ui::common::dragging_T<masterT>

			#endif
			{
				MASTER(masterT);
				BEGIN_MSG_MAP(targetlace_T)
					MESSAGE_HANDLER(WM_PAINT, wm_paint)
					CHAIN_MSG_MAP(ui::common::dragging_T<masterT>)
				END_MSG_MAP()
				LRESULT wm_paint(UINT uMsg, WPARAM wParam, LPARAM lParam, BOOL& bHandled)
				{
					if (!master.do_paint())
						bHandled = FALSE;
					return 0;
				}
				BOOL SubclassWindow(HWND hwnd_)
				{
					BOOL br = CWindowImpl<targetlace_T>::SubclassWindow(hwnd_);
					return br && master.init();
				}
			public:
				bool init() {return true;}					//to override
				bool do_paint() {return false;}				//to override
			};
		} //namespace common

		class targetlace_t : public common::targetlace_T<targetlace_t>
		{
			static bool drawcross(const point_t& pt_)
			{
				enum {arrowsizex = 26, arrowsizey = 26};
				HDC hdc = ::GetDC(0); if (!hdc) return false;
				HPEN hpen = CreatePen(PS_SOLID, 2, RGB(0,255,255));
				int oldrop = ::SetROP2(hdc, R2_XORPEN);
				HGDIOBJ oldpen = ::SelectObject(hdc, hpen);
					::MoveToEx(hdc, pt_.x - arrowsizex, pt_.y, NULL); ::LineTo(hdc, pt_.x + arrowsizex, pt_.y);
					::MoveToEx(hdc, pt_.x, pt_.y - arrowsizey, NULL); ::LineTo(hdc, pt_.x, pt_.y + arrowsizey);
				::SelectObject(hdc, oldpen);
				::SetROP2(hdc, oldrop);
				::ReleaseDC(0, hdc);
				if (hpen) DeleteObject(hpen);
				return true;
			}
			CImageList imagelist;
		public:
			bool init()
			{
				BOOL b = imagelist.Create(IDB_TARGETICON, 32, 0, RGB(0,128,128));
				return b != 0;
			}
			bool do_paint()
			{
				sel::paintdc_t dc(m_hWnd);
				gdi::fillrect(dc, rect_t(m_hWnd), GetSysColor(COLOR_BTNFACE));
				imagelist.Draw(dc, tracking.tracking ? 1 : 0, point_t(0,0), ILD_NORMAL);
				return true;
			}
			void do_lbuttondown(const point_t& pt_)
			{
				Invalidate(FALSE), UpdateWindow();
				imagelist.BeginDrag(2, 16, 16);
				imagelist.DragEnter(GetDesktopWindow(), pt_);
				drawcross(pt_);
				dragstart();
			}
			void do_lbuttonup(const point_t& pt_)
			{
				drawcross(pt_ == point_t(-1,-1) ? pointmove : pt_);
				imagelist.EndDrag();
				imagelist.DragLeave(GetDesktopWindow());
				Invalidate(FALSE);
				dragend(pt_);
			}
			void do_mousedrag(const point_t& prevmove_, const point_t& pt_)
			{
				drawcross(prevmove_);
				imagelist.DragMove(pt_);
				drawcross(pt_);
				dragover(pt_);
			}
			targetlace_t& operator=(HWND hwnd_)
			{
				SubclassWindow(hwnd_);
				return *this;
			}
			sigslot::signal0<> dragstart;
			sigslot::signal1<const point_t&> dragover;
			sigslot::signal1<const point_t&> dragend;
		};
	} //namespace dragging

	namespace ownerdrawcombo
	{
		class dispitem_t
		{
		public:
			wstring_t tag;
			dwordptr_t dataptr;
			wstring_t disptext;
			bool begingroup:1;
			bool highlight:1;
			bool isbutton:1;
			dispitem_t() : dataptr(0), begingroup(false), highlight(false), isbutton(false)
			{
			}
		};
		class dispitems_t : public std::vector<dispitem_t>
		{
		public:
			void updatehighlight()
			{
				bool highlight = true;
				for (iterator it=begin(); it!=end(); ++it)
				{
					if ((*it).begingroup)
						highlight = !highlight;
					(*it).highlight = highlight;
				}
			}
			void adddisplaynames(const wstring_t& v_)
			{
			}
			dispitem_t& add_name(const wstring_t& disptext_, bool begingroup_=false)
			{
				dispitem_t& item = *insert(end(), dispitem_t());
				item.disptext = disptext_;
				item.begingroup = begingroup_;
				return item;
			}
		};
		class combo_t : public ui::window_T< CWindowImpl<combo_t, WTL::CComboBox> >, public WTL::COwnerDraw<combo_t>
		{
			BEGIN_MSG_MAP(combo_t)
				CHAIN_MSG_MAP_ALT(WTL::COwnerDraw<combo_t>, 1)
				REFLECTED_COMMAND_CODE_HANDLER(CBN_SELENDOK, wn_selendok)
				DEFAULT_REFLECTION_HANDLER()
			END_MSG_MAP()
			LRESULT wn_selendok(WORD wNotifyCode, WORD wID, HWND hWndCtl, BOOL& bHandled) {doselendok(); return 0;}
			void MeasureItem(MEASUREITEMSTRUCT* pMS) {if (pMS) domeasureitem(*pMS);}
			void DrawItem(LPDRAWITEMSTRUCT pDS) {if (pDS) dodrawitem(*pDS);}

			void doselendok()
			{
				int currentselected = GetCurSel(); //ATLTRACE("on selected ok %d\n", currentselected);
				if (currentselected < 0) return;
				if (ui::combo::iseditdropdown_ownerdraw(*this))
					ui::combo::setedittext(*this, dispitems[currentselected].disptext);
				itemselected_event(currentselected);
			}
			void domeasureitem(MEASUREITEMSTRUCT& ms)
			{
				static int temp_h = ui::combo::calcitemheight(*this);
				/*
				if (ms.itemID == 3)
					pMS->itemHeight = 5;
				else
				*/
				ms.itemHeight = temp_h;
				ms.itemWidth = rect_t(*this).right;
			}
			void dodrawitem(DRAWITEMSTRUCT& ds) //to override
			{
				/** /
				ATLTRACE("draw [%-5ls] t=%-3d id=%2d CtlType: %s itemAction: %-14s itemState: %s selected=%d\n",
					dispitems.empty() ? L"??" : dispitems[0].disptext.c_str(),
					ds.rcItem.top, ds.itemID,
					debug::ownerdraw::type(ds.CtlType).c_str(),
					debug::ownerdraw::action(ds.itemAction).c_str(),
					debug::ownerdraw::state(ds.itemState).c_str(),
					GetCurSel()
					);
				/**/
				wstring_t disptext;
				dispitem_t* pitem = 0;

				if (ds.itemID >= 0 && ds.itemID < (unsigned)GetCount()) //OK for now but will not work if text is empty
				{
					pitem = &dispitems[ds.itemID];
					disptext = pitem->disptext;
				}

				HBRUSH hbr = ui::GetControlBrush(*this, ds.hDC, (ds.itemState & ODS_DISABLED) ? WM_CTLCOLORSTATIC : WM_CTLCOLOREDIT);
				HGDIOBJ hbrSave = SelectObject(ds.hDC, hbr);

				PatBlt(ds.hDC, ds.rcItem.left, ds.rcItem.top, ds.rcItem.right - ds.rcItem.left, ds.rcItem.bottom - ds.rcItem.top, PATCOPY);

				SetBkMode(ds.hDC, OPAQUE);
				if ((ds.itemState & ODS_FOCUS) ||										//for owner draw fixed
				   ((ds.itemAction & ODA_SELECT) && (ds.itemState & ODS_SELECTED))		//for owner draw variable
					)
				{
					FillRect(ds.hDC, &ds.rcItem, SYSHBR(HIGHLIGHT));

					SetBkColor(ds.hDC, SYSRGB(HIGHLIGHT));
					SetTextColor(ds.hDC, SYSRGB(HIGHLIGHTTEXT));
				}
				else
				if (ds.itemState & ODS_DISABLED)
				{
					if (GetBkColor(ds.hDC) != (COLORREF)SYSRGB(GRAYTEXT))
						SetTextColor(ds.hDC, SYSRGB(GRAYTEXT));
				}
				else
				if (pitem && pitem->highlight && !(ds.itemState & ODS_COMBOBOXEDIT))
					SetBkColor(ds.hDC, colors_test::BrightenColor(GetSysColor(COLOR_BTNFACE), 500));

				dodrawitem_text(ds, disptext);

				SelectObject(ds.hDC, hbrSave);
			}
			void dodrawitem_text(DRAWITEMSTRUCT& ds, const wstring_t& disptext_)
			{
				if (!disptext_.empty())
				{
					enum { INDENT_X = 4, BORDER = 2, ICON_SIZE = 16 };
					point_t current = point_t(ds.rcItem.left + INDENT_X, ds.rcItem.top/* + BORDER*/);
					//imagelist.Draw(ds.hDC, item.getimage(), current, ILD_NORMAL);
					//current.x += (ICON_SIZE + INDENT_X);

					rect_t rtext = ds.rcItem;
					rtext.left = current.x;
					const int heedtoget_y_center = 1;
					ExtTextOutW(ds.hDC, current.x, current.y + heedtoget_y_center, ETO_OPAQUE, rtext, disptext_.c_str(), disptext_.length(), NULL);

					// draw focus
					if ((ds.itemState & ODS_FOCUS) != 0 || (ds.itemAction == ODA_SELECT && ds.itemState == ODS_SELECTED))
						DrawFocusRect(ds.hDC, &ds.rcItem);
				}
			}
		public:
			dispitems_t dispitems;
			BOOL SubclassWindow(HWND hWnd)
			{
				BOOL br = CWindowImpl<combo_t, WTL::CComboBox>::SubclassWindow(hWnd);
				if (br)
				{
					int i = ui::combo::calcitemheight(*this);
					SetItemHeight(-1, i), SetItemHeight(0, i); //-1 for edit control; 0 for the rest items if not a variable
				}
				return br;
			}
			void load_fromdispitems_to_ui()
			{
				dispitems.updatehighlight();
				for (dispitems_t::const_iterator it=dispitems.begin(); it!=dispitems.end(); ++it)
				{
					addstring((*it).disptext, DWORD_PTR((const dispitem_t*)&(*it)));
				}
				//SetCurSel(0);
			}
			void clear()
			{
				ResetContent();
				dispitems.clear();
			}
			int addstring(const wstring_t& v_)
			{
				return AddString(v_.c_str()); //temp
			}
			int addstring(const wstring_t& v_, const dwordptr_t data_)
			{
				int i = addstring(v_); SetItemData(i, (const dwordptr_t)data_); return i;
			}
			int getdisptextindex(const wstring_t& disptext_) const
			{
				for (dispitems_t::const_iterator it=dispitems.begin(); it!=dispitems.end(); ++it)
				{
					if ((*it).disptext == disptext_)
						return std::distance(dispitems.begin(), it);
				}
				return -1;
			}
			int getedittextindex() const
			{
				return getdisptextindex(ui::combo::getedittext(*this));
			}
			wstring_t getedittext() const
			{
				return ui::combo::getedittext(*this);
			}
			void setedittext(const wstring_t& v_)
			{
				ui::combo::setedittext(*this, v_);
			}
			wstring_t getlbtext(int i) //TODO: very temp
			{
				wstring_t rv;
				if (i >= 0 && i < (int)dispitems.size())
				{
					rv = dispitems[i].disptext;
				}
				return rv;
			}
			void updatetext(int i, const wstring_t& v_) //TODO: very temp
			{
				if (i >= 0 && i < (int)dispitems.size())
				{
					dispitems[i].disptext = v_;
				}
			}
			/*
			//TODO: define later
			int GetLBText(int nIndex, CString& strText) const
			{
				ATLASSERT(::IsWindow(m_hWnd));
				int nRet = CB_ERR;
				LPTSTR lpstr = strText.GetBufferSetLength(GetLBTextLen(nIndex));
				if(lpstr != NULL)
				{
					nRet = GetLBText(nIndex, lpstr);
					strText.ReleaseBuffer();
				}
				return nRet;
			}
			*/
			sigslot::signal1<int> itemselected_event;
		};
	} //namespace ownerdrawcombo
} //namespace scriptui_test
