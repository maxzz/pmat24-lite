// #include "script_property_editors.h"
//
#pragma once

#include <script_io.h>

namespace propeditors
{
	class editorpage_manager_t
	{
		class ufo_t; ufo_t* ufo;
	public:
		sigslot::signal0<> updatecurrentscriptline;

		editorpage_manager_t();
		~editorpage_manager_t();

		bool create(HWND placeholdertoremove_, int& ncreated_ids_);
		void init_current(script_io::ACTION::type_t type_);
		void set_current(script_io::ACTION::type_t type_, const wstring_t& data_);
		bool get_currentdata(wstring_t& v_); //return false if editor cannot pass verification on current data

	}; //class editorpage_manager_t

	class location_manager_t
	{
		class ufo_t; ufo_t* ufo;
	public:
		location_manager_t();
		~location_manager_t();

		bool create(HWND hparent_,const rect_t& v_ ,const wstring_t& title_);
		void set_current(const point_t& pt_);
		bool get_currentpos(point_t& pt_); //return false if editor cannot pass verification on current data

	}; //class location_manager_t

}
