// #include <script_io_field.h>
//
#pragma once

#include <script_def.h>
#include <script_io.h>
#include "debugcategories_engine.h"
#include <atl_sendinput++.h>

namespace script_io
{
	using namespace script;

	namespace impl
	{
		class semi_comma_t
		{
		public:
			enum {ch_start='^', ch_stop='.'};
			static wstring_t remove(const wstring_t& v) //remove_illegal
			{
				static const wstring_t _p0 = L"^upar.";
				static const wstring_t _p1 = L"^semi.";
				static const wstring_t _p2 = L"^comma.";
				static const wstring_t _p3 = L"^open.";
				wstring_t sr;
				sr.reserve(v.size());
				for (wstring_t::const_iterator it=v.begin(); it!=v.end(); ++it)
				{
					switch (*it)
					{
						case '^': sr += _p0; break;
						case ';': sr += _p1; break;
						case ',': sr += _p2; break;
						case '[': sr += _p3; break;
						default: sr += *it;
					}
				}
				return sr;
			}
			static wstring_t restore(const wstring_t& v) //restore_illegal
			{
				static const wstring_t _p0 = L"upar";
				static const wstring_t _p1 = L"semi";
				static const wstring_t _p2 = L"comma";
				static const wstring_t _p3 = L"open";
				wstring_t sr;
				sr.reserve(v.size());
				for (wstring_t::const_iterator it=v.begin(); it!=v.end(); ++it)
				{
					if (*it != ch_start || it+1 == v.end())
						sr += *it;
					else
					{
						wstring_t entity;
						for (++it; it!=v.end() && *it!=ch_stop; ++it)
						{
							entity += *it;
						}
						if (it == v.end()) {sr += ch_start, sr += entity; break;}

						if (entity == _p0) sr += '^'; else
						if (entity == _p1) sr += ';'; else
						if (entity == _p2) sr += ','; else
						if (entity == _p3) sr += '['; else
						sr += ch_start, sr += entity;
					}
				}
				return sr;
			}
		};
	} //namespace impl

	namespace linedata
	{
		namespace references
		{
		}

		namespace NUMBERS
		{
			enum type_t
			{
				undefined, z1, z2, z3, z4, z5, z6, z7, z8, z9, za, zb, zc, zd, ze, zf, zg, zi, z0
			};
		}

		class field_t
		{
			wstringsmap_begin(map_t, NUMBERS::type_t, NUMBERS::undefined)
				wstringsmap_case(L"label", NUMBERS::z2)		// "label=User name"   ","  // label for UI
				wstringsmap_case(L"form", NUMBERS::zd)		// form="0"            ","  // field form name or from catalog: -1=catalog, 0=signon, and so on
				wstringsmap_case(L"dbname", NUMBERS::z1)	// "dbname={guid}"     ","  // dbname
				wstringsmap_case(L"type", NUMBERS::z3)		// "type=psw"          ","  // 'psw' as password|'txt' as clear text
				wstringsmap_case(L"life", NUMBERS::z4)		// "life=askreuse"     ","  // askreuse | askconfirm | askalways
				wstringsmap_case(L"value", NUMBERS::z5)		// "value=username"    ","  // constant or reference
				wstringsmap_case(L"rfdir", NUMBERS::ze)		// rfdir="in"          ","  // reference type [none|in|out]
				wstringsmap_case(L"rfform", NUMBERS::zf)	// rfield="-1"         ","  // reference to another form, field name is our name or by rmemid if exists
				wstringsmap_case(L"rmemid", NUMBERS::zg)	// rmemid="-1"         ","  // memid of referenced field
				wstringsmap_case(L"memid", NUMBERS::z0)		// memid="0"           ","  // memuniqueid
				wstringsmap_case(L"refcnt", NUMBERS::zi)	// refcnt="0"          ","  // how many fields are referencing to us

				wstringsmap_case(L"reuse", NUMBERS::z6)		// valuelife: askreuse
				wstringsmap_case(L"confirm", NUMBERS::z7)	// valuelife: askconfirm
				wstringsmap_case(L"always", NUMBERS::z8)	// valuelife: askalways

				wstringsmap_case(L"txt", NUMBERS::z9)		// fieldtype: 'txt' as clear text
				wstringsmap_case(L"psw", NUMBERS::za)		// fieldtype: 'psw' as password

				wstringsmap_case(L"in", NUMBERS::zb)		// rdirection: 'in' read value
				wstringsmap_case(L"out", NUMBERS::zc)		// rdirection: 'out' write value
			wstringsmap_end()
			////
			static wstring_t cast_fieldtype(script::fieldtype::type_t v_)
			{
				return map_t::instance().cast(v_ == script::fieldtype::password ? NUMBERS::za : NUMBERS::z9);
			}
			static wstring_t cast_valuelife(fc::valuelife::type_t v_)
			{
				switch (v_)
				{
					case fc::valuelife::askreuse  : return map_t::instance().cast(NUMBERS::z6); break;
					case fc::valuelife::askconfirm: return map_t::instance().cast(NUMBERS::z7); break;
					case fc::valuelife::askalways : return map_t::instance().cast(NUMBERS::z8); break;
				}
				return wstring_t();
			}
			////
			static fc::formname::type_t cast_formname(const wstring_t& v_)
			{
				return v_.empty() ? fc::formname::fieldcatalog : fc::formname::type_t(wstrings::conv_int(v_));
			}
			static wstring_t cast_formname(const fc::formname::type_t v_)
			{
				return v_ == fc::formname::fieldcatalog ? wstring_t() : wstrings::conv_int(v_);
			}
			////
			static fc::rdirection::type_t cast_rfieldtype(const wstring_t& v_)
			{
				return v_.empty() ? fc::rdirection::none : (map_t::instance().cast(v_) == NUMBERS::zb ? fc::rdirection::in : fc::rdirection::out);
			}
			static wstring_t cast_rfieldtype(const fc::rdirection::type_t v_)
			{
				return v_ == fc::rdirection::none ? wstring_t() : map_t::instance().cast(v_ == fc::rdirection::in ? NUMBERS::zb : NUMBERS::zc);
			}
		public:
			script::fc::field_t fcfield;
			field_t()
			{
				set_default();
			}
			void set_default() {fcfield = script::fc::field_t();}
			void set(const wstring_t v_)
			{
				set_default();
				strings::params::wparams_t operators;
				strings::params::unpackparams(v_, wstring_t(L","), operators);
				for (strings::params::wparams_t::const_iterator it=operators.begin(); it!=operators.end(); ++it)
				{
					switch (map_t::instance().cast((*it).first))
					{
						case NUMBERS::z1: fcfield.dbname = (*it).second; break;
						case NUMBERS::zd: fcfield.ids.memid.form = cast_formname((*it).second); break;
						case NUMBERS::ze: fcfield.rdir = cast_rfieldtype((*it).second); break;
						case NUMBERS::zf: fcfield.rmemid.form = cast_formname((*it).second); break;
						case NUMBERS::zg: fcfield.rmemid.id = wstrings::conv_int((*it).second); break;
						case NUMBERS::zi: fcfield.ids.refcounter = wstrings::conv_int((*it).second); break;
						case NUMBERS::z0: fcfield.ids.memid.id = wstrings::conv_int((*it).second); break;
						case NUMBERS::z2: fcfield.disptext = impl::semi_comma_t::restore((*it).second); break;
						case NUMBERS::z3: fcfield.fieldtype = (*it).second == L"psw" ? script::fieldtype::password : script::fieldtype::cleartext; break;
						case NUMBERS::z4:
							{
								int in = map_t::instance().cast((*it).second);

								fcfield.memvalue.life =
									in == NUMBERS::z8 ? script::fc::valuelife::askalways :
										( in == NUMBERS::z7 ? script::fc::valuelife::askconfirm : script::fc::valuelife::askreuse);
							}
							break;
						case NUMBERS::z5: fcfield.memvalue.memcore = impl::semi_comma_t::restore((*it).second); break;
					}
				}
			}
			wstring_t get() const
			{
				wstring_t ws;
				ws = wformat(
					L"label=%s,"
					L"form=%s,"
					L"type=%s,"
					L"dbname=%s,"
					L"value=%s,"
					L"life=%s,"
					L"memid=%s",
					impl::semi_comma_t::remove(fcfield.disptext),
					cast_formname(fcfield.ids.memid.form),
					cast_fieldtype(fcfield.fieldtype),
					fcfield.dbname,
					impl::semi_comma_t::remove(fcfield.memvalue.memcore),
					cast_valuelife(fcfield.memvalue.life),
					wstrings::conv_int(fcfield.ids.memid.id)
					);
				if (fcfield.ids.refcounter != 0)					ws += wformat(L",refcnt=%s", wstrings::conv_int(fcfield.ids.refcounter));
				if (fcfield.rdir != fc::rdirection::none)			ws += wformat(L",rfdir=%s", cast_rfieldtype(fcfield.rdir));
				if (fcfield.rmemid.form != fc::formname::noname)	ws += wformat(L",rfform=%s", cast_formname(fcfield.rmemid.form));
				if (fcfield.rmemid.id != fc::defaults::nullmemid)	ws += wformat(L",rmemid=%s", wstrings::conv_int(fcfield.rmemid.id));
				return ws;
			}
		};
	} //namespace linedata

	inline lines_t prepareforeditor(const script::manifestapi::fields_t& v_)
	{
		lines_t rv;
		//1. split to lineperfields, and preserve fields
		//
		lineperfield_io::lineperfields_t lineperfields;
		{
			for (script::manifestapi::fields_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
			{
				linedata::field_t field;
				field.fcfield = (*it).field;
				wstring_t lineperfield_field = field.get();

				cast_lineperfields((*it).enginepath, lineperfield_field, lineperfields);
			}
			/*
			ATLTRACE("\n\n""script parts\n");
			for (lineperfield_io::lineperfields_t::const_iterator it=lineperfields.begin(); it!=lineperfields.end(); ++it)
			{
				ATLTRACE("parts=%d part=%d script='%S'\n", (*it).second.parts, (*it).second.npart, (*it).second.script.c_str());
			}
			*/
		}
		//1.1. validate
		// SM: No longer validate. The validation result was ignored, so no reason to waste processor time.
		// bool valid2send_important_for_sendonly = lineperfield_io::is_ready_for_sendinput(v_.size(), lineperfields);
		//
		//2. split to lines, and substitute fields i.e. merge them into lines
		//
		{
			for (lineperfield_io::lineperfields_t::const_iterator it=lineperfields.begin(); it!=lineperfields.end(); ++it)
			{
				wstrings_t chunks;
				strings::split((*it).second.script, wstring_t(L";"), chunks);
				lines_io::cast_lines(chunks, (*it).second.scriptfield, rv);
			}
			/*
			ATLTRACE("\n\n""actions\n");
			for (lines_t::const_iterator it=rv.begin(); it!=rv.end(); ++it)
			{
				ATLTRACE("action = %-8S, line = [%S]\n", script::lines_io::map_t::instance().cast((*it).action).c_str(), (*it).line.c_str());
			}
			*/
		}
		return rv;
	}

	inline script::manifestapi::fields_t preparefromeditor(const lines_t& v_)
	{
		script::manifestapi::fields_t rv;

		//1. pack parts separated by fields
		//
		wstring_t sum;
		for (lines_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
		{
			if ((*it).action == ACTION::field)
			{
				linedata::field_t lfield;
				lfield.set((*it).line);

				sum += L"field;";
				script::manifestapi::field_t field;
				field.enginepath = sum;
				field.field = lfield.fcfield;
				back_inserter(rv) = field;
				sum.clear();
			}
			else
				sum += wstrprintf(L"%s,%s;", lines_io::cast_action((*it).action), (*it).line);
		}
		//1.1. pack last part to last field
		//
		if (!sum.empty())
		{
			if (!rv.empty()) //otherwise bad script
			{
				script::manifestapi::field_t& lastfield = rv.back();
				lastfield.enginepath += sum;
				sum.clear();
			}
		}
		//2. set part numbers
		//
		int partnumber = 0;
		for (script::manifestapi::fields_t::iterator it = rv.begin(); it != rv.end(); ++it)
		{
			(*it).enginepath = wstrprintf(L"[sn]%d.%d.%s", (int)rv.size(), partnumber++, (*it).enginepath);
		}
		/*
		ATLTRACE("\n\n""parts\n");
		for (script::manifestapi::fields_t::const_iterator it=rv.begin(); it!=rv.end(); ++it)
		{
			ATLTRACE("  field = '%S'\n", (*it).enginepath.c_str());
		}
		*/
		return rv;
	}

} //namespace script_io

namespace script_io
{
	namespace compatibility
	{
		inline wstrings_t createfields(const std::vector<std::pair<bool,bool> >& field_and_tab_or_enter_vector_)
		{
			//1. prepare line
			lines_t lines;
			for (std::vector<std::pair<bool,bool> >::const_iterator
				it = field_and_tab_or_enter_vector_.begin(); it != field_and_tab_or_enter_vector_.end(); ++it)
			{
				//field
				if ((*it).first)
				{
					linedata::field_t field;

					line_t ln;
					ln.action = ACTION::field;
					ln.line = field.get();
					back_inserter(lines) = ln;
				}
				//keys
				{
					linedata::keys_t keys;
					keys.repeat = 1;
					keys.key = VKNAMES::cast((*it).second ? VK::tab : VK::return2);

					line_t ln;
					ln.action = ACTION::keys;
					ln.line = keys.get();
					back_inserter(lines) = ln;
				}
			}

			//2. convert lines to fields
			script::manifestapi::fields_t mf = preparefromeditor(lines);

			//3. evaporate all but pahts
			wstrings_t rv;
			for (script::manifestapi::fields_t::const_iterator it = mf.begin(); it != mf.end(); ++it)
			{
				back_inserter(rv) = (*it).enginepath;
			}

			return rv;
		}
	} //namespace compatibility

} //namespace script_io
