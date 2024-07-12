// #include "script_listeditor.h"
//
#pragma once

namespace script {namespace fc{class fields_t;}}

namespace scriptlist
{
	class ufo_t;
	class editor_t
	{
		ufo_t* ufo;
	public:
		editor_t();
		~editor_t();
		bool create(HWND hparent_, const rect_t& v_, unsigned id_);
	};
} //namespace scriptlist
