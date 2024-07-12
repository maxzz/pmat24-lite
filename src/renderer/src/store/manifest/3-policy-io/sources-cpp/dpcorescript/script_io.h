// #include <script_io.h>
//
#pragma once

namespace script_io
{
    /////////////////////////////////////////////////////////////////////////

	namespace modifiers
	{
		class modifier_t
		{
		public:
			bool g:1; //generic
			bool l:1; //left
			bool r:1; //right

			modifier_t()
			{
				clear();
			}

			void clear()
			{
				g = false;
				l = false;
				r = false;
			}

		}; //class modifier_t

		class modifiers_t
		{
		public:
			modifier_t shift;
			modifier_t ctrl;
			modifier_t alt;

		}; //class modifiers_t

		static wstring_t build(const modifier_t& v_, const wchar_t name_)
		{
			wstring_t rv;
			if (v_.g)
				return wstring_t(1, name_);

			if (v_.l) rv += 'l';
			if (v_.r) rv += 'r';
			if (v_.l || v_.r) rv += name_;

			return rv;
		}

		static wstring_t build(const modifiers_t& v_)
		{
			wstring_t rv;

			rv  = build(v_.shift, 's');
			rv += build(v_.ctrl, 'c');
			rv += build(v_.alt, 'a');

			return rv;
		}

		static modifiers_t build(const wstring_t& v_)
		{
			modifiers_t rv;
			modifier_t mod;

			for (wstring_t::const_iterator it = v_.begin(); it != v_.end(); ++it)
			{
				const wchar_t& currentchar = *it;

				switch (currentchar)
				{
					case 'l': mod.l = true; break;
					case 'r': mod.r = true; break;
					case 's': if (!mod.l && !mod.r) mod.g = true; rv.shift = mod; mod.clear(); break;
					case 'c': if (!mod.l && !mod.r) mod.g = true; rv.ctrl = mod; mod.clear(); break;
					case 'a': if (!mod.l && !mod.r) mod.g = true; rv.alt = mod; mod.clear(); break;
				}
			}

			return rv;

		} //build()

	} //namespace modifiers

	/////////////////////////////////////////////////////////////////////////

	namespace linedata
	{
		using namespace modifiers;

		namespace KEYS
		{
			enum type_t
			{
				undefined, n1, n2, n3,
			};
		}

		class keys_t
		{
			wstringsmap_begin(map_t, KEYS::type_t, KEYS::undefined)
				wstringsmap_case(L"key", KEYS::n1)
				wstringsmap_case(L"repeat", KEYS::n2)
				wstringsmap_case(L"mode", KEYS::n3)
			wstringsmap_end()

		public:
			wstring_t key;								// "key=ins"              ","
			size_t repeat;								// "repeat=20"            ","
			modifiers_t modifiers;						// "mode=[lr]s[lr]c[lr]a" ","  //shift | control | alt

			keys_t()
			{
				set_default();
			}

			void set_default()
			{
				key.clear();
				repeat = 1;
				modifiers = modifiers_t();
			}

			void set(const wstring_t& v_)
			{
				set_default();

				strings::params::wparams_t operators;
				strings::params::unpackparams(v_, wstring_t(L","), operators);

				for (strings::params::wparams_t::const_iterator it = operators.begin(); it != operators.end(); ++it)
				{
					switch (map_t::instance().cast((*it).first))
					{
						case KEYS::n1: key = (*it).second; break; //TODO: check by table
						case KEYS::n2: repeat = wstrings::conv_int((*it).second); break;
						case KEYS::n3: modifiers = build((*it).second); break;
					}
				}
			}

			wstring_t get() const
			{
				wstring_t sr;

				sr = wstrprintf(L"key=%s", key);
				if (repeat != 1)
					sr += wstrprintf(L",repeat=%s", wstrings::conv_int((int)repeat));

				wstring_t m = build(modifiers);
				if (!m.empty())
					sr += wstrprintf(L",mode=%s", m);

				return sr;
			}

		}; //class keys_t

		namespace POS
		{
			enum type_t
			{
				undefined, z1, z2, z3, z4,
			};
		}

		class pos_t
		{
			wstringsmap_begin(map_t, POS::type_t, POS::undefined)
				wstringsmap_case(L"x", POS::z1)
				wstringsmap_case(L"y", POS::z2)
				wstringsmap_case(L"units", POS::z3)
				wstringsmap_case(L"res", POS::z4)
			wstringsmap_end()

			static int get_currentresolution()
			{
				static int scaleX = -1;

				if (scaleX < 0)
				{
					HDC screen = GetDC(0);
					scaleX = GetDeviceCaps(screen, LOGPIXELSX);
					ReleaseDC(0, screen);
				}

				return scaleX;
			}
		public:
			long x;										// "x=10"              ","
			long y;										// "y=20"              ","
			bool dlgunits:1;							// "units=abs=0|dlg=1" ","  //dialog units
			int resolution;

			pos_t()
			{
				set_default();
			}

			void set_default()
			{
				x = y = 0;
				dlgunits = true;
				resolution = get_currentresolution();
			}

			void set(const wstring_t& v_)
			{
				set_default();

				strings::params::wparams_t operators;
				strings::params::unpackparams(v_, wstring_t(L","), operators);

				for (strings::params::wparams_t::const_iterator
					it = operators.begin(); it != operators.end(); ++it)
				{
					switch (map_t::instance().cast((*it).first))
					{
						case POS::z1: x = wstrings::conv_int((*it).second); break;
						case POS::z2: y = wstrings::conv_int((*it).second); break;
						case POS::z3: dlgunits = (*it).second == L"dlg"; break;
						case POS::z4: resolution = wstrings::conv_int((*it).second); break;
					}
				}
			}

			wstring_t get() const
			{
				wstring_t sr;

				sr = wstrprintf(L"x=%s,y=%s", wstrings::conv_int(x), wstrings::conv_int(y));

				if (!dlgunits)
					sr += L",units=abs";

				if (resolution != 0 && resolution != 96)
					sr += wstrprintf(L",res=%s", wstrings::conv_int(resolution));

				return sr;
			}

		}; //class pos_t

		namespace DELAY
		{
			enum type_t
			{
				undefined, n1,
			};
		}

		class delay_t
		{
			wstringsmap_begin(map_t, DELAY::type_t, DELAY::undefined)
				wstringsmap_case(L"ms", DELAY::n1)			// "ms=1000"           ","
			wstringsmap_end()

		public:
			unsigned long ms; //TODO: don't forget to multiply and divide on 1000

			delay_t()
			{
				set_default();
			}

			void set_default()
			{
				ms = 0;
			}

			void set(const wstring_t& v_)
			{
				set_default();

				strings::params::wparams_t operators;
				strings::params::unpackparams(v_, wstring_t(L","), operators);

				for (strings::params::wparams_t::const_iterator
					it = operators.begin(); it != operators.end(); ++it)
				{
					switch (map_t::instance().cast((*it).first))
					{
						case DELAY::n1: ms = wstrings::conv_int((*it).second); break;
					}
				}
			}

			wstring_t get() const
			{
				return wstrprintf(L"ms=%s", wstrings::conv_int(ms));
			}

		}; //class delay_t

	} //namespace linedata

	/////////////////////////////////////////////////////////////////////////

	namespace ACTION
	{
		enum type_t
		{
			undefined,
			keys,
			field,
			delay,
			pos,
			last,
		};
	}

	class line_t
	{
	public:
		ACTION::type_t action;
		wstring_t line;

		line_t() : action(ACTION::undefined)
		{
		}

	}; //class line_t
	typedef std::vector<line_t> lines_t;

	/////////////////////////////////////////////////////////////////////////

	namespace lineperfield_io
	{
		class lineperfield_t
		{
		public:
			enum { undefined = -1, };

			size_t m_parts;
			size_t npart;
			wstring_t script;
			wstring_t scriptfield;

			lineperfield_t() :
				m_parts(undefined), npart(undefined)
			{
			}

		}; //class lineperfield_t

		typedef std::map<size_t, lineperfield_t> lineperfields_t;

		// We cannot send input if someparts are missing, but we can edit such broken scripts.
		inline bool is_ready_for_sendinput(size_t numberoffield_, const lineperfields_t& sp_)
		{
			bool br = numberoffield_ == sp_.size();

			if (br)
			{
				if (sp_.empty())
					br = numberoffield_ == 0;
				else
					br = (*sp_.begin()).second.m_parts == sp_.size();
			}

			return br;
		}

		// Format: #a'.'#b'.'<script parts> where: #a is count of patrs; #b is patr number (starting from 0)
		// i.e.
		//    v_={"3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
		//    rv={parts=3 npart=0 script={"keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"} scriptfield={""}}
		//
		inline lineperfield_t cast_line_lineperfields(const wstring_t& v_)
		{
			lineperfield_t rv;
			wstring_t::size_type dotpos = v_.find_first_of('.');

			if (dotpos != wstring_t::npos)
			{
				wstring_t::size_type semipos = v_.find_first_of('.', dotpos+1);

				if (semipos != wstring_t::npos && semipos > dotpos+1)
				{
					rv.m_parts = wstrings::conv_int(v_.substr(0, dotpos));
					rv.npart = wstrings::conv_int(v_.substr(dotpos+1, semipos-1-dotpos));
					rv.script = v_.substr(semipos+1);
				}
			}

			return rv;
		}

		// Format: ['[sn]'<script line>]*
		// i.e.
		//    lineperfield_={"[sn]3.0.keys,key=ins,repeat=20,mode=sca;pos,x=10,y=19;field;delay,ms=1000"}
		//    lineperfield_field_={"label=User name,type=txt,dbname={db151434-60dc-4a42-8dd7-5080dd747c83},value=,life=reuse"}
		//
		inline void cast_lineperfields(const wstring_t& lineperfield_, const wstring_t& lineperfield_field_, lineperfields_t& lineperfields_)
		{
			wstrings_t slines;
			strings::split(lineperfield_, wstring_t(L"["), slines);

			for (wstrings_t::const_iterator it = slines.begin(); it != slines.end(); ++it)
			{
				if ((*it).substr(0,3) == L"sn]")
				{
					lineperfield_t line = cast_line_lineperfields((*it).substr(3));
					line.scriptfield = lineperfield_field_;
					lineperfields_[line.npart] = line;
				}
			}
		}

	} //namespace lineperfield_io

	namespace lines_io
	{
		wstringsmap_begin(map_t, ACTION::type_t, ACTION::undefined)
			wstringsmap_case(L"keys", ACTION::keys)
			wstringsmap_case(L"pos", ACTION::pos)
			wstringsmap_case(L"delay", ACTION::delay)
			wstringsmap_case(L"field", ACTION::field)
		wstringsmap_end()

		inline wstring_t cast_action(ACTION::type_t v_)
		{
			return map_t::instance().cast(v_);
		}

		// Format: <action>','<script data> where <action> is keys, pos and so on; <script data> is data for operator i.e operator parameters
		// i.e.
		//    v_={"keys,key=ins,repeat=20,mode=sca"}
		//    chunk={"keys"}
		//    sline={"key=ins,repeat=20,mode=sca"}
		//
		inline line_t cast_line(const wstring_t& v_)
		{
			line_t rv;
			wstring_t::size_type chunkpos = v_.find_first_of(',');

			{
				wstring_t chunk = v_.substr(0, chunkpos);
				wstring_t sline; if (chunkpos != wstring_t::npos) sline = v_.substr(chunkpos+1);
				rv.action = map_t::instance().cast(chunk);
				rv.line = sline;
			}

			return rv;
		}

		// i.e.
		//    (*it)={"keys,key=ins,repeat=20,mode=sca"}
		//    lineperfield_field_={"label=User name,type=txt,dbname={db151434-60dc-4a42-8dd7-5080dd747c83},value=,life=reuse"}
		//
		inline void cast_lines(const wstrings_t& v_, const wstring_t& lineperfield_field_, lines_t& lines_)
		{
			for (wstrings_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
			{
				line_t line = cast_line(*it);
				
				if (line.action == ACTION::undefined) continue; //TODO: something. if format is bad then skip it for now

				if (line.action == ACTION::field)
					line.line = lineperfield_field_;

				back_inserter(lines_) = line;
			}
		}

	} //namespace lines_io

	inline bool is_scriptpath(const string_t& v_)
	{
		return v_.substr(0,4) == "[sn]";
	}

	inline bool is_scriptpath(const wstring_t& v_)
	{
		return v_.substr(0,4) == L"[sn]";
	}

} //namespace script_io

/////////////////////////////////////////////////////////////////////////////

namespace script_io
{
	namespace sendinput_io
	{
		using namespace script_io;

		class field_t
		{
		public:
			wstring_t enginepath;
			wstring_t texttosend;
			bool      useunicode = true; // Use unicode/ANSI character fill-in.
			bool      togglekeys = true; // Toggle: Kana, Caps Lock, Scroll Lock and Num Lock keys.

		}; //class field_t

		class fields_t : public std::vector<field_t> {
		public:
			lines_t PrepareForSendInput() const {
				atltrace::scope_t scope(__FUNCTION__);

				// 1. split to lineperfields, and preserve fields

				lineperfield_io::lineperfields_t lineperfields;
				for (fields_t::const_iterator it = begin(); it != end(); ++it) {
					cast_lineperfields((*it).enginepath, (*it).texttosend, lineperfields);
				}
				scope.text(L"lineperfields.size == %d", lineperfields.size());

				// 1.1. validate
				bool valid2send_important_for_sendonly = lineperfield_io::is_ready_for_sendinput(size(), lineperfields);

				// 2. split to lines, and substitute fields i.e. merge them into lines

				lines_t rv;
				if (valid2send_important_for_sendonly) {
					for (lineperfield_io::lineperfields_t::const_iterator it = lineperfields.begin(); it != lineperfields.end(); ++it) {
					wstrings_t chunks;
					strings::split((*it).second.script, wstring_t(L";"), chunks);

					lines_io::cast_lines(chunks, (*it).second.scriptfield, rv);
				}
			}

				scope.text(L"rv.size == %d", rv.size());
			return rv;
			} //PrepareForSendInput()

		}; //class fields_t

	} //namespace sendinput_io

} //namespace script_io

/////////////////////////////////////////////////////////////////////////////
