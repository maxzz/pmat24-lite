// #include <oti_manifest_io.h>
//
#pragma once //12.15.02, 01.02.03, 01.05.03, 01.10.03, 01.12.03, 01.15.03, 04.23.03

#include <atl_strings.h>
#include <oti_manifest.h>
#include <expat.h>
#include <atl_expat.h>
#include <acc_engine_customization_ioxml.h>
#include <ots_matching.h>
#include <ots_password_policy.h>
#include <wincrypt.h>

//	namespace manifest_io
//		namespace fileload_error
//		namespace textchars
//			namespace dbname
//			namespace path
//			namespace match
//			namespace low
//			namespace names
//			namespace choosevalue
//		namespace utilsio
//			namespace manifestfilename
//			namespace legacy
//			namespace maintinance
//		namespace internal_io
//			namespace mapping
//				namespace MAP_FIELD_TYPE
//				namespace MAP_FORMTYPE_TYPE
//				namespace MAP_NUMBER_TYPE
//				namespace MAP_FORMNAME_TYPE
//				namespace MAP_RDIRECTION_TYPE
//		namespace internal_o
//		namespace integrity
//		namespace internal_i
//			namespace newio
//				namespace maps
//					namespace MANIFEST_DESCRIPTOR
//					namespace FORM_FIELD
//					namespace FORM_FCONTEXT
//					namespace FORM_DETECTION
//					namespace FORM_OPTIONS
//			namespace newparser
//				namespace parserrules

namespace manifest_io
{
    /////////////////////////////////////////////////////////////////////////

	namespace textchars
	{
		/////////////////////////////////////////////////////////////////////

		namespace dbname		//manifest filed dbname
		{
			inline string_t remove_illegal(__in const string_t& v)
			{
				string_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					char chr = v[i];
					switch (chr)
					{
						case '^': sr += "^up;"; break;
						case '@': sr += "^at;"; break;
						case '.': sr += "^dot;"; break;
						case ':': sr += "^2dot;"; break;
						default: sr += chr; break;
					}
				}//for
				return sr;
			}

			inline string_t restore_illegal(__in const string_t& v)
			{
				string_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == "up") sr += '^'; else
						if (entity == "at") sr += '@'; else
						if (entity == "dot") sr += '.'; else
						if (entity == "2dot") sr += ':'; else
						if (i < len)
							sr += entity + ';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			}

		} //namespace dbname

		/////////////////////////////////////////////////////////////////////

		namespace path			//manifest filed path
		{
			inline string_t remove_illegal(__in const string_t& v)
			{
				string_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					char chr = v[i];
					switch (chr)
					{
						case '^': sr += "^up;"; break;
						case '@': sr += "^at;"; break;
						case '.': sr += "^dot;"; break;
						case ':': sr += "^2dot;"; break;
						default: sr += chr; break;
					}
				}//for
				return sr;
			}

			inline wstring_t wremove_illegal(__in const wstring_t& v)
			{
				wstring_t sr;
				for (unsigned int i=0; i<v.size(); i++)
				{
					wchar_t chr = v[i];
					switch (chr)
					{
						case '^': sr += L"^up;"; break;
						case '@': sr += L"^at;"; break;
						case '.': sr += L"^dot;"; break;
						case ':': sr += L"^2dot;"; break;
						default: sr += chr; break;
					}
				}//for
				return sr;
			}

			inline string_t restore_illegal(__in const string_t& v)
			{
				string_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == "up") sr += '^'; else
						if (entity == "at") sr += '@'; else
						if (entity == "dot") sr += '.'; else
						if (entity == "2dot") sr += ':'; else
						if (i < len)
							sr += entity + ';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			}

			inline wstring_t wrestore_illegal(__in const wstring_t& v)
			{
				wstring_t sr;
				size_t len = v.size();

				for (size_t i = 0; i < len; i++)
				{
					wchar_t chr = v[i];
					if (chr != '^')
						sr += chr;
					else
					if (i < len-1)
					{
						i++;
						wstring_t entity;
						while (i < len && v[i] != ';')
							entity += v[i++];

						if (entity == L"up") sr += '^'; else
						if (entity == L"at") sr += '@'; else
						if (entity == L"dot") sr += '.'; else
						if (entity == L"2dot") sr += ':'; else
						if (i < len)
							sr += entity + L';';
						else
							sr += entity;
					}
					else
						sr += '^';
				}//for
				return sr;
			}

		} //namespace path

		/////////////////////////////////////////////////////////////////////

		namespace match			//match compatibility
		{
			static inline string_t restore_illegal(__in const string_t& v_)
			{
				string_t rv;
				size_t len = v_.size();

				for (size_t i = 0; i < len; i++)
				{
					char chr = v_[i];
					if (chr != '^')
						rv += chr;
					else
					if (i < len-1)
					{
						i++;
						string_t entity;
						while (i < len && v_[i] != ';')
							entity += v_[i++];

						if (entity == "up") rv += '^'; else
						if (entity == "2dot") rv += ':'; else
						if (i < len)
							rv += entity + ';';
						else
							rv += entity;
					}
					else
						rv += '^';
				}//for
				return rv;
			}

			static inline string_t remove_illegal(__in const string_t& v_)
			{
				string_t rv;
				for (unsigned int i=0; i<v_.size(); i++)
				{
					char chr = v_[i];
					switch (chr)
					{
						case '^': rv += "^up;"; break;
						case ':': rv += "^2dot;"; break;
						default: rv += chr; break;
					}
				}//for
				return rv;
			}

		} //namespace match

		/////////////////////////////////////////////////////////////////////

		namespace low			//low characters from 1..31, and %, for choosevalue, names, value
		{
			inline string_t remove_illegal(__in const string_t& v_)
			{
				string_t rv; rv.reserve(v_.size());

				for (string_t::const_iterator it=v_.begin(); it!=v_.end(); ++it)
				{
					if ((unsigned(*it) <= 31 && *it != 0) || *it == '%')
					{
						rv += sformat("%%%02x", unsigned(*it));
					}
					else
					{
						rv += *it;
					}
				}//for

				return rv;
			}

			inline int xdigit2hex(__in char v_)
			{
				return (isdigit(v_) ? v_ - '0' : 10 + tolower(v_) - 'a') & 0x0f;
			}

			inline string_t restore_illegal(__in const string_t& v_)
			{
				string_t rv; rv.reserve(v_.size());

				string_t::const_iterator it = v_.begin();
				while (it != v_.end())
				{
					if (*it == '%')
					{
						++it;
						if (it == v_.end())
							break;

						int hb = xdigit2hex(*it);

						++it;
						if (it == v_.end())
							break;

						int lb = xdigit2hex(*it);

						int b = (hb << 4) | lb;

						// The correct version is without this check, but we pack only lowest chars
						// ( in remove_illegal() ), then we need to restore only lowest chars
						// otherwise it will couse the problem (for example we'll
						// change %3a to ':' and then do for uppack::cpp(':'))
						//
						if (b <= 31 || b == '%')
						{
							rv += char(b);
						}
						else
						{
							rv += sformat("%%%02x", unsigned(b));
						}
					}
					else
						rv += *it;
					++it;
				}
				return rv;
			}

		} //namespace low

		/////////////////////////////////////////////////////////////////////

		namespace names			// manifest field names
		{
			inline string_t pack(const strings_t& v_)                {return strings::pack(v_, string_t(1,':'), path::remove_illegal);}
			inline void unpack(const string_t& v_, strings_t& rv_)   {strings::unpack(v_, string_t(1,':'), rv_, path::restore_illegal);}

		} //namespace names

		namespace choosevalue	// manifest field choosevalue //TODO: temp: combine unicode and ansi, or clean up to only one
		{
			inline string_t pack(const strings_t& v_)                {return strings::pack(v_, string_t(1,':'), path::remove_illegal);}
			inline wstring_t pack(const wstrings_t& v_)              {return strings::pack(v_, wstring_t(1,':'), path::wremove_illegal);}
			inline void unpack(const string_t& v_, strings_t& rv_)   {strings::unpack(v_, string_t(1,':'), rv_, path::restore_illegal);}
			inline void unpack(const wstring_t& v_, wstrings_t& rv_) {strings::unpack(v_, wstring_t(1,':'), rv_, path::wrestore_illegal);}

		} //namespace choosevalue

	} //namespace textchars

    /////////////////////////////////////////////////////////////////////////

	namespace utilsio
	{
		using namespace manifest;

		/////////////////////////////////////////////////////////////////////

		namespace manifestfilename
		{
			// DPM is DP file extension for manifest files. This was checked with http://filext.com/d.htm

			static const wchar_t* extension_dpm = L".dpm";

			inline bool is_alien(__in const string_t& filename_)
			{
				bool rv = filename_.compare(0, 6, "alien|") == 0;
				return rv;
			}

			inline bool is_alien(__in const wstring_t& filename_)
			{
				bool rv = filename_.compare(0, 6, L"alien|") == 0;
				return rv;
			}

			inline string_t split_alien(__in const string_t& filename_, __in bool& rv_alien_)
			{
				rv_alien_ = is_alien(filename_);
				return rv_alien_ ? filename_.substr(6) : filename_;

			}

			inline wstring_t split_alien(__in const wstring_t& filename_, __in bool& rv_alien_)
			{
				rv_alien_ = is_alien(filename_);
				return rv_alien_ ? filename_.substr(6) : filename_;

			}

			inline wstring_t with_alien(__in const manifest_t& manifest_)
			{
				if (manifest_.alien)
				{
					return L"alien|" + utf8(manifest_.memfilename);
				}
				else
				{
					return utf8(manifest_.memfilename);
				}
			}

		} //namespace manifestfilename

		/////////////////////////////////////////////////////////////////////

		namespace legacy
		{
			inline void internal_unpack_afterload_detection(__inout windowtitle_t& windowtitle_)
			{
				string_t caption = windowtitle_.caption;

				if (caption.find("[m0]:2:2:") == 0)			// Vairable caption with wildcard to the right
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::right;

					windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
					windowtitle_.caption = windowtitle_.variablecaption + "*";
				}
				else
				if (caption.find("[m0]:2:1:") == 0)			// Variable caption with wildcard to the left
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::left;

					windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
					windowtitle_.caption = "*" + windowtitle_.variablecaption;
				}
				else
				if (caption.find("[m0]:2:3:") == 0)			// Variable caption with wildcard at both end
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::both;

					windowtitle_.variablecaption = manifest_io::textchars::match::restore_illegal(caption.substr(9));
					windowtitle_.caption = "*" + windowtitle_.variablecaption + "*";
				}
			}

			inline void internal_pack_beforesave_detection(__inout windowtitle_t& windowtitle_)
			{
				const string_t& caption_ = windowtitle_.caption;

				size_t n = caption_.find("*");
				if (n == string_t::npos)
				{
					return;
				}

				size_t n2 = caption_.rfind("*");

				if (n2 != n && caption_[n2-1] != '\\' && n == 0 && n2 == caption_.length()-1)	// First check the multiple wildcard
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::both;

					windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(n+1, n2-n-1));
					windowtitle_.caption = "[m0]:2:3:" + windowtitle_.variablecaption;
				}
				else
				if (n > 0 && caption_[n-1] != '\\' && n == caption_.length()-1)					// Second check the wildcard at the beginning
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::right;

					windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(0, n));
					windowtitle_.caption = "[m0]:2:2:" + windowtitle_.variablecaption;
				}
				else
				if (n == 0)																		// Third check the wildcard at the end
				{
					windowtitle_.matchtype = manifest::WINDOWTITLETYPE::left;

					windowtitle_.variablecaption = manifest_io::textchars::match::remove_illegal(caption_.substr(n+1, caption_.length()-1));
					windowtitle_.caption = "[m0]:2:1:" + windowtitle_.variablecaption;
				}
			}

			/////////////////////////////////////////////////////////////////

			inline void fix_variablecaption_afterload(__inout manifest_t& rv_)
			{
				for (manifest::forms_t::iterator itf = rv_.forms.begin(); itf != rv_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					internal_unpack_afterload_detection(currentform.detection.windowtitle);
				}//for.forms
			}

			inline bool internal_fix_formname(__inout form_t& form_)
			{
				if (form_.fcontext.formtype == manifest::FORMTYPE::signon || form_.fcontext.name == manifest::FORMNAME::signon)
				{
					form_.fcontext.formtype = manifest::FORMTYPE::signon;
					form_.fcontext.name = manifest::FORMNAME::signon;
					form_.fcontext.parent = manifest::FORMNAME::noname;
					return true;
				}

				if (form_.fcontext.formtype == manifest::FORMTYPE::pchange || form_.fcontext.name == manifest::FORMNAME::pchange)
				{
					form_.fcontext.formtype = manifest::FORMTYPE::pchange;
					form_.fcontext.name = manifest::FORMNAME::pchange;
					if (form_.fcontext.parent == manifest::FORMNAME::noname)
						form_.fcontext.parent = manifest::FORMNAME::signon;
					return true;
				}

				return false;
			}

			inline void fix_manifest_names(__inout manifest_t& manifest_)
			{
				// 0. Set proper names for all form, may be it will be simpler to guaranty the order like: signon, pchange?
				// This won't work if first is pchange and then signon //TODO: may be it's simpler to swap them

				manifest::forms_t::iterator it = manifest_.forms.begin();

				if (it != manifest_.forms.end()) // signon form
				{
					if (!internal_fix_formname((*it)))
					{
						(*it).fcontext.formtype = manifest::FORMTYPE::signon;
						(*it).fcontext.name = manifest::FORMNAME::signon;
						(*it).fcontext.parent = manifest::FORMNAME::noname;
					}
					it++;
				}

				if (it != manifest_.forms.end()) // pchange form
				{
					if (!internal_fix_formname((*it)))
					{
						(*it).fcontext.formtype = manifest::FORMTYPE::pchange;
						(*it).fcontext.name = manifest::FORMNAME::pchange;
						(*it).fcontext.parent = manifest::FORMNAME::signon;
					}
				}
			}

			inline void fix_valuelife(__inout manifest_t& manifest_)
			{
				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					for (manifest::fields_t::iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						currentfield.value.life = valuelife::cast(
							!currentfield.value.is_constant_or_reference(), currentfield.value.askalways77, currentfield.value.onetvalue77
							);
					}//for.fields
				}//for.forms
			}

			inline void fix_ourls(__inout manifest_t& manifest_)
			{
				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					// If it is old manifest then we don't have original Url. All what we can do at this point just assume that match Url still unmodified.
					// TODO: Admin Training Tool should allow Admin to clean this flag, i.e. Admin should confirm that ourl is correct. Later.
					// It is more likely that qurl was not changed, so check it first.

					/*
					// We start using qurl for Win32 application quicklinks as we well. Now we should not copy qurl to ourl anymore (Pro 4.3).
					if (currentform.detection.web.ourl.empty())
					{
						if (!currentform.detection.web.qurl.empty())
						{
							currentform.detection.web.ourl = currentform.detection.web.qurl;
							currentform.detection.web.ourliscopy = true;
						}
					}
					*/

					if (currentform.detection.web.ourl.empty())
					{
						if (!currentform.detection.web.murl.empty())
						{
							currentform.detection.web.ourl = currentform.detection.web.murl;
							currentform.detection.web.ourliscopy = true;
						}
					}
				}//for.forms
			}

			inline void fix_murls(__inout manifest_t& manifest_)
			{
				// 0. This is fix for checkurl member.

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;
					manifest::web_detection_t& currentwebdetection = currentform.detection.web;

					// 1. First exclude any empty murl from matching.
					if (currentwebdetection.murl.empty())
					{
						currentwebdetection.checkurl = false;
						continue;
					}

					// 2. If we already set checkurl and murl is not empty then we are good.
					if (currentwebdetection.checkurl)
					{
						continue;
					}

					// 3. murl is not empty, so for OTI checkurl is true.
					currentwebdetection.checkurl = true;

					// 4. Special case for OTS, we may have not empty URL but matching is turned off.
					if (IS_OTS_MANIFEST(manifest_))
					{
						matching::matchdata_t matchdata = matching::fromString(utf8(currentwebdetection.murl));

						currentwebdetection.checkurl = matchdata.needmatch();
					}
				}//for.forms
			}

		} //namespace legacy

		inline void legacyQuicklink_convert_usequicklink_afterload(__inout manifest_t& rv_)
		{
			for (manifest::forms_t::iterator it = rv_.forms.begin(); it != rv_.forms.end(); ++it)
			{
				manifest::form_t& currentform = *it;

				// 1. If it was defined during loading then don't do anything.

				if (currentform.options.useQuickLink != QUICKLINKTYPE::undefined)
				{
					continue;
				}

				// 2. For Web form, check quicklink url and for Win32 form, check processname.

				bool isinuse = IS_WEBPAGE(currentform) ? !currentform.detection.web.qurl.empty() : !currentform.detection.processname.empty();
				currentform.options.useQuickLink = isinuse ? QUICKLINKTYPE::usequicklink : QUICKLINKTYPE::dontusequicklink;
			}//for.forms
		}

		/////////////////////////////////////////////////////////////////////

		namespace maintinance
		{
			//----------------
			// Initial state from persistance.

			inline void refresh_memids(__in const manifest::FORMNAME::type_t formfrom_, __inout fields_t& fields_) // set formfrom, and memid to all uninitialized fields
			{
				ATLASSERT(formfrom_ != manifest::FORMNAME::noname);

				// 1. Find free index

				long freeindex = formfrom_ << 16;
				for (manifest::fields_t::iterator it = fields_.begin(); it != fields_.end(); ++it)
				{
					manifest::field_t& currentfield = *it;

					if (currentfield.ids.memid.id >= freeindex)
					{
						freeindex = currentfield.ids.memid.id + 1;
					}
				}//for.fields

				// 2. Set memid and formfrom

				for (manifest::fields_t::iterator it = fields_.begin(); it != fields_.end(); ++it)
				{
					manifest::field_t& currentfield = *it;

					if (currentfield.ids.memid.id == manifest::DEFAULTS::nullmemid)
					{
						currentfield.ids.memid.id = freeindex++;
					}

					currentfield.ids.memid.form = formfrom_;
				}//for.fields
			}

			inline void refresh_memids(__inout manifest_t& manifest_)
			{
				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					refresh_memids(currentform.fcontext.name, currentform.fields);
				}//for.forms
			}

			inline void restore_refcounters(__inout manifest_t& manifest_) //just restore refcounters
			{
				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					for (manifest::fields_t::iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						if (currentfield.rfield.rmemid.id == manifest::DEFAULTS::nullmemid)
							continue;
						if (currentfield.rfield.rmemid.form == manifest::FORMNAME::fieldcatalog)
							continue;

						// If there is no reference then there should not be any form.
						ATLASSERT(currentfield.rfield.rmemid.form == manifest::FORMNAME::noname);

						field_t* pfield = manifest_.reffield_bymemid(currentfield);
						if (pfield)
						{
							pfield->ids.refcounter++;
						}

					}//for.fields
				}//for.forms

			} //restore_refcounters()

			//----------------
			// runtime cleanup

			inline void resync_broken_crosslinks(__inout manifest_t& manifest_) //will resync dbnames by memid, and clean invalid links
			{
				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					for (manifest::fields_t::iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						if ((*it).rfield.rmemid.id == manifest::DEFAULTS::nullmemid)
							continue;
						if ((*it).rfield.rmemid.form == manifest::FORMNAME::fieldcatalog)
							continue;

						field_t* pfield = manifest_.reffield_bymemid(*it);

						if (pfield)
						{
							(*it).dbname = pfield->dbname;				// Sync dbname
						}
						else
						{
							(*it).rdir = manifest::RDIRECTION::none;	// Clean up link
							(*it).rfield = manifest::rfield_t();
						}
					}//for.fields
				}//for.forms
			}

			inline void initialize_dbnames(__inout manifest_t& manifest_)
			{
				// 0. Initialize dbnames for newly created form in manifest. It is not required a memcurrentform to be set.

				// Assign new guids to all the fields of the manifest which does not have one

				for (manifest::forms_t::iterator it = manifest_.forms.begin(); it != manifest_.forms.end(); ++it)
				{
					manifest::form_t& currentform = *it;

					for (manifest::fields_t::iterator fit = currentform.fields.begin(); fit != currentform.fields.end(); ++fit)
					{
						manifest::field_t& currentfield = *fit;

						if (currentfield.dbname.empty())
						{
							currentfield.dbname = guid_t(true);
						}
					}//for.fields
				}//for.forms
			}

			inline void set_accids_from_memids(__inout manifest::manifest_t& manifest_) throw()
			{
				// 0. Set accids from memids. There is no check if it was assigned (initialized) before.
				// Before it was done inside engine during controls resolusion. For Firefox style calls we don't need to resolve controls.

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					for (manifest::fields_t::iterator it = currentform.fields.begin(); it != currentform.fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						currentfield.ids.accid = currentfield.ids.memid.id;
					}//for.fields
				}//for.forms
			}

			// NOTE: If we don't save default display names we'll have: 1. More portable manifest, i.e. if created on Admin's PC(French),
			// and User will run it on English OS; 2. Smaller manifest.

			inline void defaultdisplaynames_set(__inout manifest::manifest_t& manifest_, __in const string_t& defaultdisplayname_) throw()
			{
				// 0. Set default display names for all undetected field labels.

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					for (manifest::fields_t::iterator it = currentform.fields.begin(); it != currentform.fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						if (currentfield.displayname.empty())
							currentfield.displayname = defaultdisplayname_;
					}//for.fields
				}//for.forms
			}

			inline void defaultdisplaynames_clear(__inout manifest::manifest_t& manifest_, __in const string_t& defaultdisplayname_) throw()
			{
				// 0. Clear default display names for all undetected field labels before saving manifest.

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					manifest::form_t& currentform = *itf;

					for (manifest::fields_t::iterator it = currentform.fields.begin(); it != currentform.fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						if (currentfield.displayname == defaultdisplayname_)
							currentfield.displayname.clear();
					}//for.fields
				}//for.forms
			}

			inline void defaultdisplaynames_set(__inout manifest::manifest_t& manifest_, __in const wstring_t& defaultdisplayname_) throw()
			{
				// 0. Unicode wrapper of defaultdisplaynames_set().

				string_t wdefaultdisplayname_ = utf8(defaultdisplayname_);
				defaultdisplaynames_set(manifest_, defaultdisplayname_);
			}

			inline void defaultdisplaynames_clear(__inout manifest::manifest_t& manifest_, __in const wstring_t& defaultdisplayname_) throw()
			{
				// 0. Unicode wrapper of defaultdisplaynames_clear().

				string_t wdefaultdisplayname_ = utf8(defaultdisplayname_);
				defaultdisplaynames_clear(manifest_, defaultdisplayname_);
			}

			/////////////////////////////////////////////////////////////////

			inline field_t* internal_reffield_byindex(__in manifest_t& manifest_, __in const field_t& field_)
			{
				ATLASSERT(field_.rfield.rmemid.form != manifest::FORMNAME::noname);
				ATLASSERT(field_.rfield.rmemid.form != manifest::FORMNAME::fieldcatalog);

				form_t* pform = manifest_.form_byname(field_.rfield.rmemid.form);
				if (!pform)
				{
					ATLASSERT(0); //TODO: Get ridd of assets and use trace. Later.
					return 0;
				}

				field_t* pfield = 0;

				bool undefindex = field_.rfield.rindex < 0 || field_.rfield.rindex >= (int)pform->fields.size();

				if (undefindex)
				{
					pfield = pform->fields.get_passwordfield();
				}
				else
				{
					manifest::fields_t::iterator iti = pform->fields.begin();

					std::advance(iti, field_.rfield.rindex);

					pfield = &(*iti);
				}

				return pfield;
			}

			inline long internal_field_rindex_bymemid(__in const manifest::fields_t& fields_, __in long memid_)
			{
				long rv = DEFAULTS::index;

				for (manifest::fields_t::const_iterator it = fields_.begin(); it != fields_.end(); ++it)
				{
					const manifest::field_t& currentfield = *it;

					rv++;
					if (currentfield.ids.memid.id == memid_)
					{
						return rv;
					}
				}//for.fields

				return rv;
			}

			/////////////////////////////////////////////////////////////////
			//namespace files

			inline void files_afterload_restore_crosslinks_byindex(__inout manifest_t& manifest_)
			{
				// 0. This will convert rindex to valid rmemid if possible. set memid prior to this call.

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					for (manifest::fields_t::iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						if (currentfield.rfield.rmemid.form == manifest::FORMNAME::fieldcatalog)
							continue;

						//leagcy case: only 'RDIRECTION' is specified
						//
						if (
							currentfield.rfield.rindex == DEFAULTS::index &&
							currentfield.rdir != RDIRECTION::none &&
							currentfield.rfield.rmemid.form == manifest::FORMNAME::noname
							)
						{
							currentfield.rfield.rmemid.form = FORMNAME::signon;
						}
						else
						{
							if (currentfield.rfield.rindex == DEFAULTS::index)
								continue;
							if (currentfield.rfield.rmemid.form == manifest::FORMNAME::fieldcatalog)
								continue;

							if (currentfield.rfield.rmemid.form == manifest::FORMNAME::noname)
								currentfield.rfield.rmemid.form = manifest::FORMNAME::signon;		// ok, we have at least rindex
						}

						field_t* pfield = internal_reffield_byindex(manifest_, *it);
						if (!pfield)
						{
							manifest_.linksstate = manifest::linksstate::broken; continue; // repert the problem and try to restore others
						}

					  //currentfield.rfield.rdir = currentfield.rfield.rdir;						// as it is
						currentfield.rfield.rmemid = pfield->ids.memid;
						pfield->ids.refcounter++;

					}//for.fields
				}//for.forms
			}

			inline void files_beforesave_set_crosslinks_rindex(__inout manifest_t& manifest_)
			{
				// 0. Restore rindex from memid. we don't need to clean up memid, because they don't stored anyhow

				for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
				{
					for (manifest::fields_t::iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						manifest::field_t& currentfield = *it;

						if (currentfield.rfield.rmemid.id == manifest::DEFAULTS::nullmemid)			// if there is no any link at all then skip it
						{
							currentfield.rfield.rindex = DEFAULTS::index;							// we won't write it
							ATLASSERT(
								currentfield.rfield.rmemid.form == manifest::FORMNAME::noname ||	// if there is no reference then there should not be any form
								currentfield.rfield.rmemid.form == manifest::FORMNAME::fieldcatalog // except field catalog
								);
							continue;
						}
						ATLASSERT(currentfield.rfield.rmemid.form != manifest::FORMNAME::noname);	// if we have rmemid then we should have form id

						//currentfield.rfield.rdir = currentfield.rfield.rdir;						// as it is
						//currentfield.rfield.rform = manifest::FORMNAME::fieldcatalog or formid;	// as it is
						//currentfield.rfield.rmemid = manifest::DEFAULTS::nullmemid;				// we don't save memid
						currentfield.rfield.rindex = DEFAULTS::index;								// we won't write it

						if (currentfield.rfield.rmemid.form != manifest::FORMNAME::fieldcatalog)
						{
							form_t* pform = manifest_.form_byname(currentfield.rfield.rmemid.form);
							if (!pform)
							{
								ATLASSERT(0);
								continue;
							} // Should not be ever, otherwise fix somewhere else

							currentfield.rfield.rindex = internal_field_rindex_bymemid(pform->fields, currentfield.rfield.rmemid.id);
							if (currentfield.rfield.rindex == DEFAULTS::index)
							{
								currentfield.rdir = manifest::RDIRECTION::none;						//clean up link
								currentfield.rfield = manifest::rfield_t();							//link is broken, so clean it up
							}
						}

					}//for.fields
				}//for.forms
			}

		} //namespace maintinance
	} //namespace utilsio

    /////////////////////////////////////////////////////////////////////////

	namespace internal_io
	{
		namespace mapping
		{
			namespace MAP_FIELD_TYPE
			{
				wstringsmap_begin_string(map_t, manifest::FIELDTYPE::type_t, manifest::FIELDTYPE::unknown)
					wstringsmap_case("edit", manifest::FIELDTYPE::edit)
					wstringsmap_case("button", manifest::FIELDTYPE::button)
					wstringsmap_case("list", manifest::FIELDTYPE::listbx)
					wstringsmap_case("combo", manifest::FIELDTYPE::combo)
					wstringsmap_case("check", manifest::FIELDTYPE::check)
					wstringsmap_case("radio", manifest::FIELDTYPE::radio)
					wstringsmap_case("text", manifest::FIELDTYPE::text)
				wstringsmap_end()

				inline manifest::FIELDTYPE::type_t cast(__in const string_t& v_)
				{
					return map_t::instance().cast(v_);
				}

				inline string_t cast(__in const manifest::FIELDTYPE::type_t v_)
				{
					return map_t::instance().cast(v_);
				}

			} //namespace MAP_FIELD_TYPE

			namespace MAP_FORMTYPE_TYPE									//'FORMTYPE::signon' is default
			{
				inline manifest::FORMTYPE::type_t cast(__in const string_t& v_)
				{
					manifest::FORMTYPE::type_t rv = manifest::FORMTYPE::unknown;

					if (v_.empty()) rv = manifest::FORMTYPE::signon; else
					if (v_ == "pchange") rv = manifest::FORMTYPE::pchange;
					return rv;
				}

				inline string_t cast(__in const manifest::FORMTYPE::type_t v_)
				{
					string_t rv;
					switch (v_)
					{
						case manifest::FORMTYPE::pchange: rv = "pchange"; break;
						case manifest::FORMTYPE::unknown: rv = "unknown"; break;	// We allways have to prevent this from happening, if it does then it's a bug.
					}
					return rv;
				}

			} //namespace MAP_FORMTYPE_TYPE

			namespace MAP_NUMBER_TYPE									//'0' is default
			{
				inline int cast(__in const string_t& v_)
				{
					return v_.empty() ? 0 : strings::conv_int(v_);
				}

				inline string_t cast(__in int v_)
				{
					return v_ == 0 ? string_t() : strings::conv_int(v_);
				}

			} //namespace MAP_NUMBER_TYPE

			namespace MAP_FORMNAME_TYPE									//'FORMNAME::signon' is default
			{
				inline manifest::formname_t cast(__in const string_t& v_)
				{
					return v_.empty() ? manifest::FORMNAME::signon : manifest::FORMNAME::type_t(strings::conv_int(v_));
				}

				inline string_t cast(__in const manifest::formname_t v_)
				{
					return v_ == manifest::FORMNAME::signon ? string_t() : strings::conv_int(v_);
				}

			} //namespace MAP_FORMNAME_TYPE

			namespace MAP_RDIRECTION_TYPE								//'RDIRECTION::none' is default
			{
				inline manifest::RDIRECTION::type_t cast(__in const string_t& v_)
				{
					manifest::RDIRECTION::type_t rv = manifest::RDIRECTION::none;
					if (v_.empty()) return rv;
					if (v_ == "in") rv = manifest::RDIRECTION::in; else
					if (v_ == "out") rv = manifest::RDIRECTION::out;
					return rv;
				}

				inline string_t cast(__in const manifest::RDIRECTION::type_t v_)
				{
					string_t rv;
					switch (v_)
					{
						case manifest::RDIRECTION::in: rv = "in"; break;
						case manifest::RDIRECTION::out: rv = "out"; break;
					}
					return rv;
				}

			} //namespace MAP_RDIRECTION_TYPE

			namespace submittype_type										// 'SUBMITTYPE::undefined' is default
			{
				inline manifest::SUBMITTYPE::type_t cast(__in const string_t& v_)
				{
					manifest::SUBMITTYPE::type_t rv = manifest::SUBMITTYPE::undefined;
					if (v_.empty()) return rv;
					if (v_ == "dosubmit") rv = manifest::SUBMITTYPE::dosubmit; else
					if (v_ == "nosubmit") rv = manifest::SUBMITTYPE::nosubmit;
					return rv;
				}

				inline string_t cast(__in const manifest::SUBMITTYPE::type_t v_)
				{
					string_t rv;
					switch (v_)
					{
						case manifest::SUBMITTYPE::dosubmit: rv = "dosubmit"; break;
						case manifest::SUBMITTYPE::nosubmit: rv = "nosubmit"; break;
					}
					return rv;
				}

			} //namespace submittype_type

			namespace usequicklinktype_type										// 'QUICKLINKTYPE::undefined' is default
			{
				inline manifest::QUICKLINKTYPE::type_t cast(__in const string_t& v_)
				{
					manifest::QUICKLINKTYPE::type_t rv = manifest::QUICKLINKTYPE::undefined;
					if (v_.empty()) return rv;
					if ((v_ == "1") || (v_ == "usequicklink")) rv = manifest::QUICKLINKTYPE::usequicklink; else
					if ((v_ == "2") || (v_ == "dontusequicklink")) rv = manifest::QUICKLINKTYPE::dontusequicklink;
					return rv;
				}

				inline string_t cast(__in const manifest::QUICKLINKTYPE::type_t v_)
				{
					string_t rv;
					switch (v_)
					{
						case manifest::QUICKLINKTYPE::undefined: rv = "0"; break;
						case manifest::QUICKLINKTYPE::usequicklink: rv = "1"; break;
						case manifest::QUICKLINKTYPE::dontusequicklink: rv = "2"; break;
					}
					return rv;
				}

			} //namespace usequicklinktype_type

		} //namespace mapping

	} //namespace internal_io

    /////////////////////////////////////////////////////////////////////////

	class internal_o_tostream_t
	{
		void save_descriptor(__inout std::ostream& os, __in const manifest::descriptor_t& descriptor_, __in const string_t& newintegrity_, __in const string_t& version_)
		{
			if (descriptor_.blank())
				return;

			out_begin(os, "<descriptor");
				out(os, "id", descriptor_.id);
				out(os, "created", descriptor_.created);
				out(os, "modified", descriptor_.modified);
				out(os, "integrity", descriptor_.integrity);
				out(os, "integrity_ext", newintegrity_);
				out(os, "source", descriptor_.source);
				out(os, "size", descriptor_.size);
				out(os, "storage_id", descriptor_.storage_id);
				out(os, "version", version_);
			out_end(os);
		}

		void save_fcontext(__inout std::ostream& os, __in const manifest::fcontext_t& fcontext_)
		{
			if (fcontext_.blank() || (fcontext_.formtype == manifest::FORMTYPE::signon && fcontext_.name == manifest::FORMNAME::signon))
				return;

			out_begin(os, "<fcontext");
				out(os, "type", internal_io::mapping::MAP_FORMTYPE_TYPE::cast(fcontext_.formtype));
				out(os, "name", internal_io::mapping::MAP_FORMNAME_TYPE::cast(fcontext_.name));
				out(os, "parent", internal_io::mapping::MAP_FORMNAME_TYPE::cast(fcontext_.parent));
			out_end(os);
		}

		void save_detection(__inout std::ostream& os, __in const manifest::detection_t& detection_, __in const string_t& oldnames_)
		{
			if (detection_.blank())
				return;

			manifest::windowtitle_t temp = detection_.windowtitle;
			utilsio::legacy::internal_pack_beforesave_detection(temp); // This is temp fix, so we wont modify original windowtitle.

			out_begin(os, "<detection");
				out(os, "caption", temp.caption);
				out(os, "variablecaption", temp.variablecaption);
				if (!detection_.web.ourliscopy)			// Save only original value
				out(os, "web_ourl", detection_.web.ourl);
				out(os, "web_murl", detection_.web.murl);
				out(os, "web_qurl", detection_.web.qurl);
				out(os, "web_checkurl", detection_.web.checkurl);
				out(os, "dlg_tab", detection_.dlg.tab);
				out(os, "dlg_class", detection_.dlg.classname);
				out(os, "dlg_checkexe", detection_.dlg.matchprocessname);
				out(os, "emu_pattern", detection_.emu.pattern);
				out(os, "names", textchars::low::remove_illegal(oldnames_));
				out(os, "names_ext", textchars::low::remove_illegal(detection_.names));
				out(os, "monitor", detection_.monitor);
				out(os, "processname", textchars::low::remove_illegal(detection_.processname));
				out(os, "commandline", textchars::low::remove_illegal(detection_.commandline));
			out_end(os);
		}

		void save_options(__inout std::ostream& os, __in const manifest::options_t& options_)
		{
			if (options_.blank())
				return;

			out_begin(os, "<options");
				out(os, "choosename", options_.choosename);
				out(os, "sidekick", options_.sidekick);
				out(os, "ownernote", options_.ownernote);
				out(os, "quicklink", options_.qlmenuname);
				out(os, "auth_pl", options_.auth_pl);
				// This is how it should be. If we uncomment this we maight break CRC for OTS manifests.
				// We have to uncomment it now, because someone broke the logic of balloon counter anyhow.
				if (options_.baloon_counter != manifest::DEFAULTS::balloon_counter_defvalue)
				out(os, "balooncount", strings::conv_int(options_.baloon_counter));
				out(os, "autoprompt", options_.auto_prompt);
				out(os, "lockfields", options_.lock_fields);
				out(os, "submittype", internal_io::mapping::submittype_type::cast(options_.submittype));
				out(os, "iconkey", options_.iconkey);
				out(os, "iconlocation", options_.iconlocation);
				out(os, "usequicklink", internal_io::mapping::usequicklinktype_type::cast(options_.useQuickLink));
				out(os, "recheckwindowafterfillin", options_.recheckwindowafterfillin);
				out(os, "qlwocred", options_.qlwocred);
				// We cannot always detect that page was reloaded.
				// This is still very bad when user navigates to the login page by clicking the back button.
				// Another problem if login credencials failed then we'll hang the browser by endless login loop:
				//     like: fillin -> failed -> fillin -> failed ...
				// 
				// auto-unsafe will override auto-promt option safe behaviour (once per page session) 
				//     to authenticate immediately even if the page was visited already in the current session.
				// 
				// Actually it's more safe to allow user repeat fillin manual action.
				//
				// TODO: !!! Discuss it before making public.
				//
				//out(os, "autounsafe", options_.authonbrreload);

				if (!options_.unknownattributes.empty())
					os << options_.unknownattributes;
			out_end(os);
		}

		void save_field(__inout std::ostream& os, __in const manifest::field_t& field_, __in const string_t& oldPath_)
		{
			if (field_.blank())
				return;

			out_begin(os, "<field");

				out(os, "displayname", field_.displayname);
				out(os, "type", internal_io::mapping::MAP_FIELD_TYPE::cast(field_.type));
				out(os, "dbname", field_.dbname);
				out(os, "path", oldPath_);
				out(os, "path_ext", field_.path);

				string_t policyOld;
				string_t policyExt;
				string_t policyText = field_.policy;
				string_t customRuleOptions = field_.options;
				// NOTE: The order of this call is important since we split options from policy text
				// and then split policy into simple and custom rule separately. 
				password::policy_t::compatibility_split_optionsFromPolicy(customRuleOptions, policyText);
				// TODO: Check that we remove illegal. textchars::low::remove_illegal
				password::policy_t::compatibility_split_policy(policyText, policyOld, policyExt);

				out(os, "policy", policyOld);
				out(os, "policy2", policyExt);
				out(os, "options", customRuleOptions);

				if (field_.value.is_constant_or_reference())
				{
					out(os, "value", textchars::low::remove_illegal(field_.value.memvalue));
				}

				out(os, "choosevalue", textchars::low::remove_illegal(field_.value.choosevalue));

				if (field_.rdir != manifest::RDIRECTION::none)
				{
					out(os, "rfield", internal_io::mapping::MAP_RDIRECTION_TYPE::cast(field_.rdir));
				}

				if (field_.rfield.rindex != manifest::DEFAULTS::index ||
					field_.rfield.rmemid.form == manifest::FORMNAME::fieldcatalog) // We need FC to understand field from FC or form.
				{
					out(os, "rfieldform", internal_io::mapping::MAP_FORMNAME_TYPE::cast(field_.rfield.rmemid.form));
				}

				if (field_.rfield.rindex != manifest::DEFAULTS::index)
				{
					out(os, "rfieldindex", internal_io::mapping::MAP_NUMBER_TYPE::cast(field_.rfield.rindex));
				}

				out(os, "askalways", field_.value.askalways77);
				out(os, "onetvalue", field_.value.onetvalue77);
				out(os, "password", field_.password);
				out(os, "submit", field_.controltosubmitdata);
				out(os, "useit", field_.useit);

				if (!m_saveasfilecontent)
				{
					if (field_.ids.accid != manifest::DEFAULTS::index)
					{
						out(os, "accid", strings::conv_int(field_.ids.accid));
					}
				}
			out_end(os);
		}

		void save_fields(__inout std::ostream& os, __in const manifest::fields_t& fields_)
		{
			if (fields_.blank())
				return;

			string_t emptyPath;

			out_begin(os, "<fields>");

				for (manifest::fields_t::const_iterator it = fields_.begin(); it != fields_.end(); ++it)
				{
					const manifest::field_t currentfield = *it;
					save_field(os, currentfield, emptyPath);
				}//for.fields

			out_end(os, "</fields>");
		}

		void save_fields_merged(__inout std::ostream& os, __in const manifest::fields_t& fldOld_, __in const manifest::fields_t& fldNew_)
		{
			if (fldOld_.blank() || fldNew_.blank()) // TODO: Check that number of fields is the same. Later. OK for now.
				return;

			string_t emptyPath;

			out_begin(os, "<fields>");

				for (manifest::fields_t::const_iterator itold = fldOld_.begin(), itnew = fldNew_.begin(); itold != fldOld_.end() && itnew != fldNew_.end(); ++itold, ++itnew)
				{
					const manifest::field_t fieldOld = *itold;	// Ref filed.

					manifest::field_t fieldNew = *itnew;		// Copy filed.
					fieldNew.dbname = fieldOld.dbname;			// Preserve field guid to access the same variable.

					// If path is the same then save only new path, since we are using primer 'path_ext', not 'path' in manifest file.
					const string_t* oldPath = fieldNew.path == fieldOld.path ? &emptyPath : &fieldOld.path;

					save_field(os, fieldNew, *oldPath);
				}//for.fields

			out_end(os, "</fields>");
		}

		void save_form(__inout std::ostream& os, __in const manifest::form_t& form_)
		{
			if (form_.blank())
				return;

			out_begin(os, "<form>");

				save_fcontext(os, form_.fcontext);
				save_detection(os, form_.detection, string_t());
				save_options(os, form_.options);
				save_fields(os, form_.fields);

			out_end(os, "</form>");
		}

		void save_form_merged(__inout std::ostream& os, __in const manifest::form_t& formOld_, __in const manifest::form_t& formNew_)
		{
			if (formOld_.blank() || formNew_.blank())
				return;

			out_begin(os, "<form>");

				save_fcontext(os, formNew_.fcontext);
				save_detection(os, formNew_.detection, formOld_.detection.names);
				save_options(os, formNew_.options);
				save_fields_merged(os, formOld_.fields, formNew_.fields);

			out_end(os, "</form>");
		}

		void save_forms(__inout std::ostream& os, __in const manifest::forms_t& forms_)
		{
			if (forms_.blank())
				return;

			out_begin(os, "<forms>");

				for (manifest::forms_t::const_iterator it = forms_.begin(); it != forms_.end(); ++it)
				{
					const manifest::form_t& currentForm = *it;

					save_form(os, currentForm);
				}//for.forms

			out_end(os, "</forms>");
		}

		void save_forms_merged(__inout std::ostream& os, __in const manifest::forms_t& formsOld_, __in const manifest::forms_t& formsNew_)
		{
			if (formsOld_.blank() || formsNew_.blank()) // TODO: Check that number of forms is the same. Later. OK for now.
				return;

			out_begin(os, "<forms>");

				for (manifest::forms_t::const_iterator itold = formsOld_.begin(), itnew = formsNew_.begin(); itold != formsOld_.end() && itnew != formsNew_.end(); ++itold, ++itnew)
				{
					const manifest::form_t& currentOldForm = *itold;
					const manifest::form_t& currentNewForm = *itnew;

					save_form_merged(os, currentOldForm, currentNewForm);
				}//for.forms

			out_end(os, "</forms>");
		}

		/////////////////////////////////////////////////////////////////

		void set_level(__in int level_)
		{
			m_level = level_;
			m_ident.clear();

			for (int i = 0; i < level_; i++)
				m_ident += "\t";
		}

		void inc_level()
		{
			set_level(m_level + 1);
		}

		void dec_level()
		{
			set_level(m_level - 1);
		}

		void out(__inout std::ostream& os, __in const char* name_, __in const string_t& value_)
		{
			if (!value_.empty())
			{
				os << m_ident << name_ << "=\"" << xml::remove_illegal(value_) << "\"\n";
			}
		}

		void out(__inout std::ostream& os, __in const char* name_, __in const bool value_)
		{
			if (value_)
			{
				os << m_ident << name_ << "=\"" << value_ << "\"\n";
			}
		}

		void out_begin(__inout std::ostream& os, __in const char* name_)
		{
			os << m_ident << name_ << "\n";
			inc_level();
		}

		void out_end(__inout std::ostream& os, __in const char* name_ = "/>")
		{
			dec_level();
			os << m_ident << name_ << "\n";
		}

		int m_level;
		string_t m_ident;
	public:
		bool m_saveasfilecontent; // File content has no accid's, but string content has.

		internal_o_tostream_t() : m_level(0), m_saveasfilecontent(true)
		{
		}

		void save(manifest::manifest_t& mainfest_, __inout std::ostream& os, __in bool setdefaultversion_ = true)
		{
			// 0. setdefaultversion_ is true for all cases but CRC calculate. In that case we always use the same vesion number.

			if (mainfest_.blank())
				return;

			set_level(0);

			if (setdefaultversion_)
				mainfest_.descriptor.version = manifest::myversion;

			utilsio::maintinance::files_beforesave_set_crosslinks_rindex(mainfest_);

			os << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
			os << "<manifest>\n";

			inc_level();
				save_descriptor(os, mainfest_.descriptor, string_t(), mainfest_.descriptor.version);
				save_forms(os, mainfest_.forms);
			dec_level();

			os << "</manifest>\n";
		}

		void savemerged(__in const manifest::manifest_t mfOld_, __inout manifest::manifest_t& mfNew_, __inout std::ostream& os)
		{
			if (mfOld_.blank() || mfNew_.blank())
				return;

			set_level(0);

			mfNew_.descriptor.version = manifest::myversion;
			utilsio::maintinance::files_beforesave_set_crosslinks_rindex(mfNew_);

			os << "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
			os << "<manifest>\n";

			inc_level();
				save_descriptor(os, mfOld_.descriptor, mfNew_.descriptor.integrity, mfNew_.descriptor.version);
				save_forms_merged(os, mfOld_.forms, mfNew_.forms);
			dec_level();

			os << "</manifest>\n";
		}

	}; //class internal_o_tostream_t

    /////////////////////////////////////////////////////////////////////////

	namespace integrity
	{
		inline string_t calculate_crc(string_t& flatmanifest_)
		{
			_TRACE_HDR("integrity::calculate_crc");
			
			HCRYPTPROV hCryptProv = NULL;
			if (!CryptAcquireContext(&hCryptProv, NULL, NULL, PROV_RSA_FULL, 0))
			{
				if (::GetLastError() == NTE_BAD_KEYSET)
				{
					if (!CryptAcquireContext(&hCryptProv, NULL, NULL, PROV_RSA_FULL, CRYPT_NEWKEYSET))
					{
						atltrace::lasterror("integrity::CryptAcquireContext");
						return string_t();
					}
				}
			}

			string_t rv = "OTS2.0";
			HCRYPTHASH hHash = NULL; BYTE* pbHash = NULL;
			try {
				CryptCreateHash(hCryptProv, CALG_MD5, 0, 0, &hHash);

				CryptHashData(hHash, (BYTE*)flatmanifest_.c_str(), static_cast<DWORD>(flatmanifest_.length()), 0);

				BYTE otshash[] = {"OTSHash271062"};
				CryptHashData(hHash, otshash, sizeof(otshash), 0);

				DWORD dwHashLen = sizeof(DWORD);
				CryptGetHashParam(hHash, HP_HASHVAL, NULL, &dwHashLen, 0);

				pbHash = new BYTE[dwHashLen];
				CryptGetHashParam(hHash, HP_HASHVAL, pbHash, &dwHashLen, 0);

				if (dwHashLen)
					rv.reserve(rv.size() + dwHashLen * 2);

				char buf[3];
				buf[2] = '\0';

				for (unsigned i = 0; i < dwHashLen; i++)
				{
					string_t tt = sformat("%02x", (int)pbHash[i]); // sprintf(buf, "%02x", pbHash[i]); rv.append(buf);
					rv += tt;
				}
			}
			catch(...)
			{
				atltrace::error("ooo");
			}

			if (pbHash)
				delete[] pbHash;
			if (hHash)
				CryptDestroyHash(hHash);
			if (hCryptProv)
				CryptReleaseContext(hCryptProv, 0);

			return rv;
		}

		class cleanvaryblock_t // Clean variable block, since before calculating CRC we need to clean variable part of the manifest.
		{
			manifest::descriptor_t m_descriptor;
			manifest::manifest_t& m_savedManifestReference;
		public:
			cleanvaryblock_t(__inout manifest::manifest_t& mf_) : m_savedManifestReference(mf_)
			{
				// 1. Save current descriptor
				m_descriptor = mf_.descriptor;

				// 2. Clear and initialize variable fields

				// This is the right way but for now commented out to avoid warning into admin explorer and preserve compatibility.
				// May be uncommented when we'll do significant changes to manifest format.
			  //mf_.descriptor = manifest::descriptor_t();
				//
				// This is old method vs. old method
				mf_.descriptor.integrity.clear();
				//
				// This version is for compatibility to avoid warning.
				mf_.descriptor.version = "2.3.5";
			}

			~cleanvaryblock_t()
			{
				// 1. Restore what we had before.
				m_savedManifestReference.descriptor = m_descriptor;
			}

		}; //class cleanvaryblock_t

		inline void add_crc(__inout manifest::manifest_t& mf_)
		{
			if (mf_.forms.size() <= 1) // So far we have more then one form only in Change Password Manifests.
			{
				mf_.crcstate = manifest::crcstate::ok;
				return;
			}

			string_t ointegrity = mf_.descriptor.integrity;

			string_t flatmanifest;
			// scope for vary block
			{
				cleanvaryblock_t cleanvaryblock(mf_);

				std::ostringstream os;

				internal_o_tostream_t saver;
				saver.save(mf_, os, false);

				flatmanifest = os.str();
			}

			mf_.descriptor.integrity = calculate_crc(flatmanifest);
			mf_.crcstate = manifest::crcstate::ok;
		}

		inline bool check_crc(__inout manifest::manifest_t& mf_)
		{
			if (mf_.forms.size() <= 1)
			{
				mf_.crcstate = manifest::crcstate::ok;
				return true;
			}

			string_t ointegrity = mf_.descriptor.integrity;
			if (ointegrity.empty())
			{
				mf_.crcstate = manifest::crcstate::bad;
				return false;
			}

			string_t flatmanifest;
			// scope for vary block
			{
				cleanvaryblock_t cleanvaryblock(mf_);

				std::ostringstream os;

				internal_o_tostream_t saver;
				saver.save(mf_, os, false);

				flatmanifest = os.str();
			}

			bool rv_isunchanged = ointegrity == calculate_crc(flatmanifest);

			mf_.descriptor.integrity = ointegrity;
			mf_.crcstate = rv_isunchanged ? manifest::crcstate::ok : manifest::crcstate::bad;

			return rv_isunchanged;
		}

		inline string_t hash_manifest(__inout manifest::manifest_t& mf_)
		{
			//TODO: check if somebody is using this version at all. I doubt it. MZ.

			if (mf_.forms.size() <= 1) // So far we have more then one form only in Change Password Manifests.
			{
				mf_.crcstate = manifest::crcstate::ok;
				return string_t();
			}

			string_t flatmanifest;
			// scope for vary block
			{
				cleanvaryblock_t cleanvaryblock(mf_);

				std::ostringstream os;

				internal_o_tostream_t saver;
				saver.save(mf_, os, false);

				flatmanifest = os.str();
			}

			return calculate_crc(flatmanifest);
		}

	} //namespace integrity

    /////////////////////////////////////////////////////////////////////////

	namespace internal_i
	{
		namespace newio
		{
			using namespace manifest;

			inline bool map_boolean(const char* value_)
			{
				return strings::equal(value_, "1");
			}

			inline void unknown_value(const char* attr)
			{
				//TODO: implement.
			}

			namespace maps
			{
				namespace MANIFEST_DESCRIPTOR
				{
					namespace localmap
					{
						enum type_t
						{
							unknown, id, created, modified, integrity_ext, integrity, source, size, version, storage_id,
						};
					}
					wstringsmap_begin_string(map_t, localmap::type_t, localmap::unknown)
						wstringsmap_case("id", localmap::id)
						wstringsmap_case("created", localmap::created)
						wstringsmap_case("modified", localmap::modified)
						wstringsmap_case("integrity_ext", localmap::integrity_ext)
						wstringsmap_case("integrity", localmap::integrity)
						wstringsmap_case("source", localmap::source)
						wstringsmap_case("size", localmap::size)
						wstringsmap_case("version", localmap::version)
						wstringsmap_case("storage_id", localmap::storage_id)
					wstringsmap_end()
				}

				namespace FORM_FIELD
				{
					namespace localmap
					{
						enum type_t
						{
							unknown, type, displayname, path_ext, path, dbname, options, policy, policy2,
							value, choosevalue, rfielddir, rfieldform, rfieldindex,
							askalways, onetvalue, password, submit, useit, accid//, username,
						};
					}
					wstringsmap_begin_string(map_t, localmap::type_t, localmap::unknown)
						wstringsmap_case("type", localmap::type)
						wstringsmap_case("displayname", localmap::displayname)
						wstringsmap_case("path_ext", localmap::path_ext)
						wstringsmap_case("path", localmap::path)
						wstringsmap_case("dbname", localmap::dbname)
						wstringsmap_case("options", localmap::options)
						wstringsmap_case("policy", localmap::policy)
						wstringsmap_case("policy2", localmap::policy2)
						wstringsmap_case("value", localmap::value)
						wstringsmap_case("choosevalue", localmap::choosevalue)
						wstringsmap_case("rfield", localmap::rfielddir) //we are preserving 'rfield' name for compatibility
						wstringsmap_case("rfieldform", localmap::rfieldform)
						wstringsmap_case("rfieldindex", localmap::rfieldindex)
						wstringsmap_case("askalways", localmap::askalways)
						wstringsmap_case("onetvalue", localmap::onetvalue)
						wstringsmap_case("password", localmap::password)
						wstringsmap_case("submit", localmap::submit)
						wstringsmap_case("useit", localmap::useit)
						wstringsmap_case("accid", localmap::accid)
					wstringsmap_end()
				}

				namespace FORM_FCONTEXT
				{
					namespace localmap
					{
						enum type_t
						{
							unknown, type, name, parent,
						};
					}
					wstringsmap_begin_string(map_t, localmap::type_t, localmap::unknown)
						wstringsmap_case("type", localmap::type)
						wstringsmap_case("name", localmap::name)
						wstringsmap_case("parent", localmap::parent)
					wstringsmap_end()
				}

				namespace FORM_DETECTION
				{
					namespace localmap
					{
						enum type_t
						{
							unknown,
							caption,
							varcaption,
							web_ourl,
							web_murl,
							web_qurl,
							web_checkurl,
							dlg_tab,
							dlg_class,
							dlg_matchprocess,
							emu_pattern,
							names_ext,
							names,
							monitor,
							processname,
							commandline,
						};
					}
					wstringsmap_begin_string(map_t, localmap::type_t, localmap::unknown)
						wstringsmap_case("caption", localmap::caption)
						wstringsmap_case("variablecaption", localmap::varcaption)
						wstringsmap_case("web_ourl", localmap::web_ourl)
						wstringsmap_case("web_murl", localmap::web_murl)
						wstringsmap_case("web_qurl", localmap::web_qurl)
						wstringsmap_case("web_checkurl", localmap::web_checkurl)
						wstringsmap_case("dlg_tab", localmap::dlg_tab)
						wstringsmap_case("dlg_class", localmap::dlg_class)
						wstringsmap_case("dlg_checkexe", localmap::dlg_matchprocess)
						wstringsmap_case("emu_pattern", localmap::emu_pattern)
						wstringsmap_case("names_ext", localmap::names_ext)
						wstringsmap_case("names", localmap::names)
						wstringsmap_case("monitor", localmap::monitor)
						wstringsmap_case("processname", localmap::processname)
						wstringsmap_case("commandline", localmap::commandline)
					wstringsmap_end()
				}

				namespace FORM_OPTIONS
				{
					namespace localmap
					{
						enum type_t
						{
							unknown, choosename, sidekick, ownernote, qlmenuname, balooncount, autoprompt, lockfields, submittype,
							iconkey, iconlocation, usequicklink, recheckwindowafterfillin, qlwocred,auth_pl/*, authonbrreload*/
						};
					}
					wstringsmap_begin_string(map_t, localmap::type_t, localmap::unknown)
						wstringsmap_case("choosename", localmap::choosename)
						wstringsmap_case("sidekick", localmap::sidekick)
						wstringsmap_case("ownernote", localmap::ownernote)
						wstringsmap_case("quicklink", localmap::qlmenuname)
						wstringsmap_case("balooncount", localmap::balooncount)
						wstringsmap_case("autoprompt", localmap::autoprompt)
						wstringsmap_case("lockfields", localmap::lockfields)
						wstringsmap_case("submittype", localmap::submittype)
						wstringsmap_case("iconkey", localmap::iconkey)
						wstringsmap_case("iconlocation", localmap::iconlocation)
						wstringsmap_case("usequicklink", localmap::usequicklink)
						wstringsmap_case("recheckwindowafterfillin", localmap::recheckwindowafterfillin)
						wstringsmap_case("qlwocred", localmap::qlwocred)
						wstringsmap_case("auth_pl", localmap::auth_pl)
						//wstringsmap_case("authonbrreload", localmap::authonbrreload)
						wstringsmap_end()
				}
			}//namespace maps

			inline void mapManifestDescriptor(__inout descriptor_t& rv_, __in const char* attr_, __in const char* value_)
			{
				maps::MANIFEST_DESCRIPTOR::localmap::type_t v_ = maps::MANIFEST_DESCRIPTOR::map_t::instance().cast(attr_);
				switch (v_)
				{
					case maps::MANIFEST_DESCRIPTOR::localmap::id           : rv_.id = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::created      : rv_.created = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::modified     : rv_.modified = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::integrity_ext: rv_.integrity = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::integrity    : if (rv_.integrity.empty()) rv_.integrity = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::source       : rv_.source = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::size         : rv_.size = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::version      : rv_.version = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::storage_id   : rv_.storage_id = value_; break;
					case maps::MANIFEST_DESCRIPTOR::localmap::unknown      : default: unknown_value(attr_); break;
				}
			}

			inline void mapManifestFormFContext(__inout fcontext_t& rv_, __in const char* attr_, __in const char* value_)
			{
				maps::FORM_FCONTEXT::localmap::type_t v_ = maps::FORM_FCONTEXT::map_t::instance().cast(attr_);
				switch (v_)
				{
					case maps::FORM_FCONTEXT::localmap::type   : rv_.formtype = internal_io::mapping::MAP_FORMTYPE_TYPE::cast(value_); break;
					case maps::FORM_FCONTEXT::localmap::name   : rv_.name = internal_io::mapping::MAP_FORMNAME_TYPE::cast(value_); break;
					case maps::FORM_FCONTEXT::localmap::parent : rv_.parent = internal_io::mapping::MAP_FORMNAME_TYPE::cast(value_); break;
					case maps::FORM_FCONTEXT::localmap::unknown: default: unknown_value(attr_); break;
				}
			}

			inline void mapManifestFormDetection(__inout detection_t& rv_, __in const char* attr_, __in const char* value_)
			{
				maps::FORM_DETECTION::localmap::type_t v_ = maps::FORM_DETECTION::map_t::instance().cast(attr_);
				switch (v_)
				{
					case maps::FORM_DETECTION::localmap::caption     : rv_.windowtitle.caption = value_; break;
					case maps::FORM_DETECTION::localmap::varcaption  : rv_.windowtitle.variablecaption = value_; break;
					case maps::FORM_DETECTION::localmap::web_ourl    : rv_.web.ourl = value_; break;
					case maps::FORM_DETECTION::localmap::web_murl    : rv_.web.murl = value_; break;
					case maps::FORM_DETECTION::localmap::web_qurl    : rv_.web.qurl = value_; break;
					case maps::FORM_DETECTION::localmap::web_checkurl: rv_.web.checkurl = map_boolean(value_); break;
					case maps::FORM_DETECTION::localmap::dlg_tab     : rv_.dlg.tab = value_; break;
					case maps::FORM_DETECTION::localmap::dlg_class   : rv_.dlg.classname = value_; break;
					case maps::FORM_DETECTION::localmap::dlg_matchprocess: rv_.dlg.matchprocessname = map_boolean(value_); break;
					case maps::FORM_DETECTION::localmap::emu_pattern : rv_.emu.pattern = value_; break;
					case maps::FORM_DETECTION::localmap::names_ext   : rv_.names = textchars::low::restore_illegal(value_); break;
					case maps::FORM_DETECTION::localmap::names       : if (rv_.names.empty()) rv_.names = textchars::low::restore_illegal(value_); break;
					case maps::FORM_DETECTION::localmap::monitor     : rv_.monitor = map_boolean(value_); break;
					case maps::FORM_DETECTION::localmap::processname : rv_.processname = textchars::low::restore_illegal(value_); break;
					case maps::FORM_DETECTION::localmap::commandline : rv_.commandline = textchars::low::restore_illegal(value_); break;
					case maps::FORM_DETECTION::localmap::unknown     : default: unknown_value(attr_); break;
				}
			}

			inline void mapManifestFormOptions(__inout options_t& rv_, __in const char* attr_, __in const char* value_)
			{
				maps::FORM_OPTIONS::localmap::type_t v_ = maps::FORM_OPTIONS::map_t::instance().cast(attr_);
				switch (v_)
				{
					case maps::FORM_OPTIONS::localmap::choosename : rv_.choosename = value_; break;
					case maps::FORM_OPTIONS::localmap::sidekick   : rv_.sidekick = value_; break;
					case maps::FORM_OPTIONS::localmap::ownernote  : rv_.ownernote = value_; break;
					case maps::FORM_OPTIONS::localmap::qlmenuname : rv_.qlmenuname = value_; break;
					case maps::FORM_OPTIONS::localmap::balooncount: rv_.baloon_counter = strings::conv_int(value_); break;
					case maps::FORM_OPTIONS::localmap::autoprompt : rv_.auto_prompt = map_boolean(value_); break;
					case maps::FORM_OPTIONS::localmap::lockfields : rv_.lock_fields = map_boolean(value_); break;
					case maps::FORM_OPTIONS::localmap::submittype : rv_.submittype = internal_io::mapping::submittype_type::cast(value_); break;
					case maps::FORM_OPTIONS::localmap::iconkey : rv_.iconkey = value_; break;
					case maps::FORM_OPTIONS::localmap::iconlocation : rv_.iconlocation = value_; break;
					case maps::FORM_OPTIONS::localmap::usequicklink : rv_.useQuickLink = internal_io::mapping::usequicklinktype_type::cast(value_); break;
					case maps::FORM_OPTIONS::localmap::recheckwindowafterfillin : rv_.recheckwindowafterfillin = map_boolean(value_); break;
					case maps::FORM_OPTIONS::localmap::qlwocred : rv_.qlwocred = map_boolean(value_); break;\
					case maps::FORM_OPTIONS::localmap::auth_pl: rv_.auth_pl = value_; break;
					//case maps::FORM_OPTIONS::localmap::authonbrreload: rv_.authonbrreload = map_boolean(value_); break;
						
					case maps::FORM_OPTIONS::localmap::unknown:
					default:
						{
							string_t s = sformat("%s=%s", attr_, value_);
							strings::appendname(s, rv_.unknownattributes, '\n');
						}
						break;
				}
			}

			inline void mapManifestFormField(__inout field_t& rv_, __in const char* attr_, __in const char* value_)
			{
				maps::FORM_FIELD::localmap::type_t v_ = maps::FORM_FIELD::map_t::instance().cast(attr_);
				switch (v_)
				{
					case maps::FORM_FIELD::localmap::type       : rv_.type = internal_io::mapping::MAP_FIELD_TYPE::cast(value_); break;
					case maps::FORM_FIELD::localmap::displayname: rv_.displayname = value_; break;
					case maps::FORM_FIELD::localmap::path_ext   : rv_.path = value_; break;
					case maps::FORM_FIELD::localmap::path       : if (rv_.path.empty()) rv_.path = value_; break;
					case maps::FORM_FIELD::localmap::dbname     : rv_.dbname = value_; break;
					case maps::FORM_FIELD::localmap::options    : rv_.options = value_; break;
					case maps::FORM_FIELD::localmap::policy     : password::policy_t::compatibility_combine_policy(rv_.policy, value_, ""); break;
					case maps::FORM_FIELD::localmap::policy2    : password::policy_t::compatibility_combine_policy(rv_.policy, "", value_); break;
					case maps::FORM_FIELD::localmap::value      : rv_.value.memvalue = textchars::low::restore_illegal(value_); break;
					case maps::FORM_FIELD::localmap::choosevalue: rv_.value.choosevalue = textchars::low::restore_illegal(value_); break;
					case maps::FORM_FIELD::localmap::rfielddir  : rv_.rdir = internal_io::mapping::MAP_RDIRECTION_TYPE::cast(value_); break;
					case maps::FORM_FIELD::localmap::rfieldform : rv_.rfield.rmemid.form = internal_io::mapping::MAP_FORMNAME_TYPE::cast(value_); break;
					case maps::FORM_FIELD::localmap::rfieldindex: rv_.rfield.rindex = internal_io::mapping::MAP_NUMBER_TYPE::cast(value_); break;
					case maps::FORM_FIELD::localmap::askalways  : rv_.value.askalways77 = map_boolean(value_); break;
					case maps::FORM_FIELD::localmap::onetvalue  : rv_.value.onetvalue77 = map_boolean(value_); break;
					case maps::FORM_FIELD::localmap::password   : rv_.password = map_boolean(value_); break;
					case maps::FORM_FIELD::localmap::submit     : rv_.controltosubmitdata = map_boolean(value_); break;
					case maps::FORM_FIELD::localmap::useit      : rv_.useit = map_boolean(value_); break;
					case maps::FORM_FIELD::localmap::accid      : rv_.ids.accid = strings::conv_int(value_); break;
					case maps::FORM_FIELD::localmap::unknown    : default: unknown_value(attr_); break;
				}
			}

		} //namespace newio

		namespace newparser
		{
			namespace parserrules
			{
				class shell_t
				{
				public:
					manifest::manifest_t& m_manifest;
					customization::user_i::parserrules::myinstance_t m_coptions;

					shell_t(manifest::manifest_t& manifest_) : m_manifest(manifest_), m_coptions(manifest_.customizationoptions)
					{
					}

				};

				typedef shell_t myinstance_t;
				typedef void (*on_element_t)(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_);
				typedef void (*on_elementdone_t)(myinstance_t& myinstance_, const char* elementname_);
				typedef expat::ruleelement_t<on_element_t, on_elementdone_t> myrule_t;

				/////////////////////////////////////////////////////////////
				// Customization Options rules

				inline void RULE_CUSTOPT_onnew_process(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					customization::user_i::parserrules::onnew_process(myinstance_.m_coptions, elementname_, attributes_);
				}

				inline void RULE_CUSTOPT_ondone_process(myinstance_t& myinstance_, const char* elementname_)
				{
					customization::user_i::parserrules::ondone_process(myinstance_.m_coptions, elementname_);
				}

				inline void RULE_CUSTOPT_onnew_class(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					customization::user_i::parserrules::onnew_class(myinstance_.m_coptions, elementname_, attributes_);
				}

				inline void RULE_CUSTOPT_ondone_class(myinstance_t& myinstance_, const char* elementname_)
				{
					customization::user_i::parserrules::ondone_class(myinstance_.m_coptions, elementname_);
				}

				inline void RULE_CUSTOPT_onnew_caption(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					customization::user_i::parserrules::onnew_caption(myinstance_.m_coptions, elementname_, attributes_);
				}

				/////////////////////////////////////////////////////////////
				// Manifest rules

				inline void RULE_onnew_descriptor(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					int n = 0;
					while (!attributes_[n].end())
					{
						newio::mapManifestDescriptor(myinstance_.m_manifest.descriptor, attributes_[n].name, attributes_[n].value);
						++n;
					}
				}

				inline void RULE_onnew_form(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					myinstance_.m_manifest.forms.push_back(manifest::form_t());
				}

				inline void RULE_onnew_form_fcontext(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					if (myinstance_.m_manifest.forms.empty())
						return;

					manifest::fcontext_t& fcontext = myinstance_.m_manifest.forms.back().fcontext;

					int n = 0;
					while (!attributes_[n].end())
					{
						newio::mapManifestFormFContext(fcontext, attributes_[n].name, attributes_[n].value);
						++n;
					}
				}

				inline void RULE_onnew_form_detection(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					if (myinstance_.m_manifest.forms.empty())
						return;

					manifest::detection_t& detection = myinstance_.m_manifest.forms.back().detection;

					int n = 0;
					while (!attributes_[n].end())
					{
						newio::mapManifestFormDetection(detection, attributes_[n].name, attributes_[n].value);
						++n;
					}
				}

				inline void RULE_onnew_form_options(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					if (myinstance_.m_manifest.forms.empty())
						return;

					manifest::options_t& options = myinstance_.m_manifest.forms.back().options;

					int n = 0;
					while (!attributes_[n].end())
					{
						newio::mapManifestFormOptions(options, attributes_[n].name, attributes_[n].value);
						++n;
					}
				}

				inline void RULE_onnew_form_field(myinstance_t& myinstance_, const char* elementname_, const expat::attribute_t* attributes_)
				{
					if (myinstance_.m_manifest.forms.empty())
						return;

					manifest::form_t& currentform = myinstance_.m_manifest.forms.back();

					manifest::field_t& newfield = *currentform.fields.insert(currentform.fields.end(), manifest::field_t());

					int n = 0;
					while (!attributes_[n].end())
					{
						newio::mapManifestFormField(newfield, attributes_[n].name, attributes_[n].value);
						++n;
					}

					password::policy_t::compatibility_combine_optionsToPolicy(newfield.options, newfield.policy);
				}

				//-------------------------------------

				static const myrule_t& rulesdefinition()
				{
					static parserrules::myrule_t rv;

					if (rv.allowedelements.empty())
					{
						myrule_t& rootManifest = rv.addrule(myrule_t("manifest"));
						myrule_t& descriptor = rootManifest.addrule(myrule_t("descriptor", RULE_onnew_descriptor));

						myrule_t& rootCOptions = rootManifest.addrule(myrule_t("options"));
						{
							myrule_t& processes = rootCOptions.addrule(myrule_t("processes"));
								myrule_t& process = processes.addrule(myrule_t("process", RULE_CUSTOPT_onnew_process, RULE_CUSTOPT_ondone_process));
										myrule_t& classes = process.addrule(myrule_t("classes"));
											myrule_t& wclass = classes.addrule(myrule_t("class", RULE_CUSTOPT_onnew_class, RULE_CUSTOPT_ondone_class));
												myrule_t& caption = wclass.addrule(myrule_t("caption", RULE_CUSTOPT_onnew_caption));
						}

						myrule_t& forms = rootManifest.addrule(myrule_t("forms"));
						{
							myrule_t& form = forms.addrule(myrule_t("form", RULE_onnew_form));
								myrule_t& fcontext = form.addrule(myrule_t("fcontext", RULE_onnew_form_fcontext));
								myrule_t& detection = form.addrule(myrule_t("detection", RULE_onnew_form_detection));
								myrule_t& options = form.addrule(myrule_t("options", RULE_onnew_form_options));
								myrule_t& fields = form.addrule(myrule_t("fields"));
									myrule_t& field = fields.addrule(myrule_t("field", RULE_onnew_form_field));
						}
					}//if empty

					return rv;
				}

			} //namespace parserrules

			inline void load_stream(__in std::istream& is_, __inout parserrules::myinstance_t& myinstance_) throw(...)
			{
				expat::lib_engine_t engine;
				expat::parser_t<parserrules::myrule_t, parserrules::myinstance_t> parser(engine, parserrules::rulesdefinition(), myinstance_);

				if (!parser.load_stream(is_))
					throw std::runtime_error("Unable to load stream");
			}

			inline void load_line(__in const char* line_, __in std::size_t size_, __inout parserrules::myinstance_t& myinstance_) throw(...)
			{
				expat::lib_engine_t engine;
				expat::parser_t<parserrules::myrule_t, parserrules::myinstance_t> parser(engine, parserrules::rulesdefinition(), myinstance_);

				if (!parser.load_line(line_, size_))
					throw std::runtime_error("Unable to load stream");
			}

		} //namespace newparser

		/////////////////////////////////////////////////////////////////////////////
		// real manifest loader
		//
		// This is internal version of load_manifest_must for OTS Admin Tool.
		// The major difference is it will not check CRC, so admin tool can resign loaded file.

		inline void load_manifest_nocrc_must_memory(__in const wstring_t& name_, __in const char* line_, __in std::size_t size_, __out manifest::manifest_t& rv_) throw(...)
		{
			rv_ = manifest::manifest_t(); // Clear manifest. Just in case if someone passed to us manifest which is member of a class.

			// 1. Load manifest
			{
				newparser::parserrules::myinstance_t myinstance(rv_);
				newparser::load_line(line_, size_, myinstance);
			}

			// 2. Legacy correction of manifest

			utilsio::legacy::fix_variablecaption_afterload(rv_);
			utilsio::legacy::fix_manifest_names(rv_);
			utilsio::legacy::fix_valuelife(rv_);
			utilsio::legacy::fix_ourls(rv_);
			utilsio::legacy::fix_murls(rv_);

			// 3. Convert persistnt to runtime information

			utilsio::maintinance::refresh_memids(rv_);
			utilsio::maintinance::restore_refcounters(rv_);
			utilsio::maintinance::files_afterload_restore_crosslinks_byindex(rv_);

			// 3.old. pm20. Old Enrica's check
			/*
				if (rv_.hasforms())
				{
					string_t caption = rv_.mainform().detection.caption;
					if (caption.find( "[m0]:2:2:") == 0) {
						rv_.forms.main().detection.matchcaption = true;
						rv_.forms.main().detection.caption = match_compatibility::restore_illegal(caption.substr(9)) + "*";
					}
				}
			*/

			// 4. Convert older form of use quicklink (qurl/processname) value to new explicit form (useQuickLink).

			utilsio::legacyQuicklink_convert_usequicklink_afterload(rv_);

			// 5. Say we have not check CRC yet

			rv_.crcstate = manifest::crcstate::undef;
		}

		inline void load_manifest_nocrc_must(__in const wstring_t& name_, __out manifest::manifest_t& rv_) throw(...)
		{
			/////atltrace::scope_t scope(__FUNCTION__);

			bool alien = false;
			wstring_t fname = utilsio::manifestfilename::split_alien(name_, alien);

			if (!wfindfile_t::fileexists(fname))
				throw errors::fileload_error(errors::FILELOADERROR::notfound, fname);

			files::mmreadfile_t file(fname);
			if (file.empty())
				throw errors::fileload_error(errors::FILELOADERROR::noaccess, fname);

			load_manifest_nocrc_must_memory(name_, file.data<const char*>(), file.size(), rv_);

			rv_.alien = alien;
			rv_.memfilename = utf8(fname);
		}

		inline void update_manifest_crc(__inout manifest::manifest_t& rv_) throw ()
		{
			if (rv_.crcstate == manifest::crcstate::undef)
			{
				rv_.crcstate = integrity::check_crc(rv_) ? manifest::crcstate::ok : manifest::crcstate::bad;
			}
		}

	} //namespace internal_i

	/////////////////////////////////////////////////////////////////////////

	// Any manifest loading should go throu this function.
	// It will throw fileload_exception if something goes wrong.
	//
	inline void load_manifest_must(__in const wstring_t& name_, __out manifest::manifest_t& rv_) throw(...)
	{
		internal_i::load_manifest_nocrc_must(name_, rv_);

		// Temp don't check CRC.
		/** /
			internal_i::update_manifest_crc(rv_);

			if (rv_.crcstate == manifest::crcstate::bad)
				throw errors::fileload_error(errors::FILELOADERROR::badcrc, rv_.memfilename);
		/**/
	}

	inline void load_manifest_must_memory(__in const wstring_t& name_, __in const string_t& fileasstring_, __out manifest::manifest_t& rv_) throw(...)
	{
		bool alien = false;
		wstring_t fname = utilsio::manifestfilename::split_alien(name_, alien);

		// No need +1 for termination null
		//
		internal_i::load_manifest_nocrc_must_memory(name_, fileasstring_.c_str(), fileasstring_.length(), rv_);

		rv_.alien = alien;
		rv_.memfilename = utf8(fname);

		// Temp don't check CRC.
		/** /
			internal_i::update_manifest_crc(rv_);

			if (rv_.crcstate == manifest::crcstate::bad)
				throw errors::fileload_error(errors::FILELOADERROR::badcrc, rv_.memfilename);
		/**/
	}

	/////////////////////////////////////////////////////////////////////////

	inline void savemanifesttostring(__inout /*const */manifest::manifest_t& manifest_, __in string_t& rv_manifestasstring_, __in bool saveasfilecontent_) throw(...)
	{
		internal_o_tostream_t saver;
		saver.m_saveasfilecontent = saveasfilecontent_;

		std::ostringstream os;
		saver.save(manifest_, os);

		rv_manifestasstring_ = os.str();
	}

	inline void savemanifesttostring(__inout /*const */manifest::manifest_t& manifest_, __in string_t& rv_manifestasstring_) throw(...)
	{
		bool saveasfilecontent = false; // To save accid's.
		savemanifesttostring(manifest_, rv_manifestasstring_, saveasfilecontent);
	}

	inline void savemanifestasfilecontent_nocrc(__inout /*const */manifest::manifest_t& manifest_, __in string_t& rv_manifestasstring_) throw(...)
	{
		bool saveasfilecontent = true; // Don't save accid's.
		savemanifesttostring(manifest_, rv_manifestasstring_, saveasfilecontent);

		// OK but we are not using this yet.
		//	inline void savemanifestasfilecontent_withcrc(__inout manifest::manifest_t& manifest_, __inout std::ostream& rv_os_) throw(...)
		//	{
		//		internal_o_tostream_t saver;
		//		manifest_io::integrity::add_crc(manifest_);
		//		saver.save(manifest_, rv_os_);
		//	}
	}

	/////////////////////////////////////////////////////////////////////////

	inline wstring_t alien_manifestfilename(__in const manifest::manifest_t& manifest_)
	{
		// 0. The function alien_manifestfilename() will set up a proper filename to pass this name between components.

		return utilsio::manifestfilename::with_alien(manifest_);
	}

	inline wstring_t split_alien(__in const string_t& filename_)
	{
		// 0. The function split_alien() returns manifest filename without alient prefix. As usual, it is used to check if file exists.

		bool alien = false;
		return utilsio::manifestfilename::split_alien(utf8(filename_), alien);
	}

	inline wstring_t split_alien(__in const wstring_t& filename_)
	{
		bool alien = false;
		return utilsio::manifestfilename::split_alien(filename_, alien);
	}

	/////////////////////////////////////////////////////////////////////////

} //namespace manifest_io

/////////////////////////////////////////////////////////////////////////////
// The next is just a prototype of how to load manifest. Error handling is up to caller preferences.
//
//	inline bool load_manifest_properly(__in const wstring_t& filename_, __out manifest::manifest_t& rv_manifest_) throw()
//	{
//		bool rv = false;
//		try {
//			// Choice 1:
//			//manifest_io::internal_i::load_manifest_nocrc_must(filename_, rv_manifest_);
//
//			// Choice 2:
//			//manifest_io::load_manifest_must(filename_, rv_manifest_);
//
//			// Choice 3:
//			//manifest_io::internal_i::load_manifest_nocrc_must(filename_, rv_manifest_);
//			//manifest_io::internal_i::update_manifest_crc(rv_manifest_);
//
//			rv = true;
//		}
//		catch(errors::fileload_error& e_)
//		{
//			atltrace::error( wformat(L"File problem [%s]: %s", utf8(errors::FILELOADERROR::cast(e_.type)), customization::debug::mfname(e_.what())) );
//		}
//		catch(char* e_)
//		{
//			atltrace::error(e_);
//		}
//		catch(string_t& e_)
//		{
//			atltrace::error(e_.c_str());
//		}
//		catch(std::exception& e_)
//		{
//			atltrace::error(e_.what());
//		}
//		catch(...)
//		{
//			atltrace::error("load_manifest_properly ooo");
//		}
//
//		return rv;
//	}

/////////////////////////////////////////////////////////////////////////////

namespace manifest_pm20
{
	inline bool load_manifest_properly(__in const wstring_t& filename_, __out manifest::manifest_t& rv_manifest_) throw()
	{
		// 0. TODO: this definition is temp here. This code was copied from PM 2.0.

		bool rv = false;
		try {
			manifest_io::load_manifest_must(filename_, rv_manifest_);
			rv = true;
		}
		catch(errors::fileload_error& e_)
		{
			atltrace::error( wformat(L"File problem [%s]: '%s'", utf8(errors::FILELOADERROR::toString(e_.type)), customization::debug::mfname(e_.what())) );
		}
		catch(char* e_)
		{
			atltrace::error("loadM_properly: ", e_); // This is just some obfuscation to the funtion name, but the name still unique to use search.
		}
		catch(string_t& e_)
		{
			atltrace::error("loadM_properly: ", e_.c_str());
		}
		catch(std::exception& e_)
		{
			atltrace::error("loadM_properly: ", e_.what());
		}
		catch(...)
		{
			atltrace::error("loadM_properly oo");
		}

		return rv;
	}

	inline bool load_manifest_properly(__in const wstring_t& filename_, __in const string_t& fileasstring_, __out manifest::manifest_t& rv_manifest_) throw()
	{
		bool rv = false;
		try {
			manifest_io::load_manifest_must_memory(filename_, fileasstring_, rv_manifest_);
			rv = true;
		}
		catch(errors::fileload_error& e_)
		{
			atltrace::error( wformat(L"File problem [%s]: '%s'", utf8(errors::FILELOADERROR::toString(e_.type)), customization::debug::mfname(e_.what())) );
		}
		catch(char* e_)
		{
			atltrace::error("loadM_properlyS: ", e_);
		}
		catch(string_t& e_)
		{
			atltrace::error("loadM_properlyS: ", e_.c_str());
		}
		catch(std::exception& e_)
		{
			atltrace::error("loadM_properlyS: ", e_.what());
		}
		catch(...)
		{
			atltrace::error("loadM_properlyS oo");
		}

		return rv;
	}

} //namespace manifest_pm20
