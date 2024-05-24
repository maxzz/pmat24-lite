// #include "oti_manifest.h"
//
#pragma once // 10.24.02, 12.15.02, 12.31.02, 01.02.03, 01.12.03, 01.31.03, 02.02.03, 04.29.03

#include <acc_engine_customization.h>
#include <oti_manifest_valuelife.h>

/////////////////////////////////////////////////////////////////////////////

#ifndef IS_OTI_MANIFEST

#define IS_OTI_MANIFEST(manifest_) !(manifest_).alien
#define IS_OTS_MANIFEST(manifest_) (manifest_).alien

#endif//IS_OTI_MANIFEST

#ifndef IS_WEBPAGE

#define IS_WEBPAGE_BY_OURL(manifestform_) ( !(manifestform_).detection.web.ourl.empty() )
#define IS_WEBPAGE_BY_QURL(manifestform_) ( !(manifestform_).detection.web.qurl.empty() )

// We should detect it by murl because qurl may be cleaned up for not well known browsers.
// By reason that we don't know how to start them.
//
#define IS_WEBPAGE IS_WEBPAGE_BY_OURL

#endif//IS_WEBPAGE

/////////////////////////////////////////////////////////////////////////////

namespace manifest
{
	/////////////////////////////////////////////////////////////////////////

  //const string_t myversion = "2.0.0"; //for 3.2
  //const string_t myversion = "2.3.4"; //for 3.4 new customization options, and monitoring
  //const string_t myversion = "2.3.5"; //for 3.5 crossform links
  //const string_t myversion = "2.4.2"; //for 4.2 no changes from 2.3.5, just to help QA
	const string_t myversion = "2.4.3"; //for 4.2 no changes from 2.3.5, added process name, command line, submit type

	/////////////////////////////////////////////////////////////////////////
	// default field values

	namespace DEFAULTS
	{
		enum {
			index = -1,
			nullmemid = -1,
			balloon_counter_defvalue = 3,		// The default value for options_t::baloon_counter
			balloon_counter_maxvalue = 100,		// Max value for options_t::baloon_counter
			balloon_counter_shownever = 0,		// Never show balloon
			balloon_counter_showalways = -1,	// Always show balloon
		};
	}

	/////////////////////////////////////////////////////////////////////////
	// manifest descriptor
	//
	class descriptor_t
	{
	public:
		string_t id;
		string_t created;
		string_t modified;
		string_t integrity;
		string_t source;
		string_t size;
		string_t storage_id;
		string_t version;		// introduced in 3.2

		bool operator==(const descriptor_t& r) const
		{
			return
				id == r.id &&
				created == r.created &&
				modified == r.modified &&
				integrity == r.integrity &&
				source == r.source &&
				size == r.size &&
				storage_id == r.storage_id &&
				version == r.version;
		}

		bool blank() const
		{
			return
				id.empty() &&
				created.empty() &&
				modified.empty() &&
				integrity.empty() &&
				source.empty() &&
				size.empty() &&
				storage_id.empty() &&
				version.empty();
		}

	}; //class descriptor_t

	/////////////////////////////////////////////////////////////////////////
	// form options
	//
	namespace WINDOWTITLETYPE		// window string match, this is for window caption
	{
		enum type_t
		{
			full,
			left,
			right,
			both,
		};

		inline string_t toString(const WINDOWTITLETYPE::type_t& v_)
		{
			const char* rv;
			switch (v_)
			{
				case WINDOWTITLETYPE::full : rv = "full"; break;
				case WINDOWTITLETYPE::left : rv = "left"; break;
				case WINDOWTITLETYPE::right: rv = "right"; break;
				case WINDOWTITLETYPE::both : rv = "both"; break;
				default: return sformat("NEW %d", (unsigned int)v_);
			}
			return rv;
		}
	}

	class windowtitle_t				// window caption
	{
	public:
		WINDOWTITLETYPE::type_t matchtype;
		string_t caption;
		string_t variablecaption;	// if variablecaption is not empty and different from caption field then we are using vcm (variable cation match)

		windowtitle_t() : matchtype(WINDOWTITLETYPE::full)
		{
		}

		bool operator==(const windowtitle_t& r) const
		{
			return
				matchtype == r.matchtype &&
				caption == r.caption &&
				variablecaption == r.variablecaption;
		}

		bool blank() const
		{
			return
				matchtype == WINDOWTITLETYPE::full &&
				caption.empty() &&
				variablecaption.empty();
		}

	}; //class windowtitle_t

	/////////////////////////////////////////////////////////////////////////

	class web_detection_t
	{
	public:
		string_t ourl;				// The original url. This should not be edited
		string_t murl;				// Url for matching. Admin can edit it and after that App may become not not Web any more.
		string_t qurl;				// Url for quicklink

		bool checkurl;				// The same story as murl. Somebody clean qurl if we are not using Quicklinks.
									// But we should use this flag instead of cleaning qurl.

		bool ourliscopy;			// This is for internal use only to keep compatibility.
									// If we are loading old manifest we'll copy ourl from murl if ourl is empty.
									// In that case we'll set this flag to true. If this flag is true we wont save ourl.
									// All these troubles for compatibility. We ever should use murl to understand if
									// this is Web application. Admin can just set murl to empty form Admin Training Tool.

		web_detection_t() : checkurl(false), ourliscopy(false)
		{
		}

		bool operator==(const web_detection_t& r) const
		{
			return ourl == r.ourl && murl == r.murl && qurl == r.qurl && checkurl == r.checkurl;
		}

		bool blank() const
		{
			return ourl.empty() && murl.empty() && qurl.empty() && checkurl;
		}

	}; //class web_detection_t

	class dlg_detection_t
	{
	public:
		string_t tab;
		string_t classname;

		bool matchprocessname = false;	// Whether to perform process name match for autoamtic logons or not.
		                                // Process name match is always done for manual mode logons.

		bool operator==(const dlg_detection_t& r) const
		{
			return tab == r.tab && classname == r.classname;
		}

		bool blank() const
		{
			return tab.empty() && classname.empty();
		}

	}; //class dlg_detection_t

	class emu_detection_t			// terminal emulators detection
	{
	public:
		string_t pattern;			// screen pattern to match

		bool operator==(const emu_detection_t& r) const
		{
			return pattern == r.pattern;
		}

		bool blank() const
		{
			return pattern.empty();
		}

	}; //class emu_detection_t

	class detection_t
	{
	public:
		windowtitle_t windowtitle;	// window caption
		web_detection_t web;
		dlg_detection_t dlg;
		emu_detection_t emu;
		string_t names;				// names is a string pool of all strings for this form. used by ots engine
		bool monitor;				// this defines: do the live monitor of the form content for this form or don't
		string_t processname;		// name of the process
		string_t commandline;		// commandline of the current process

		detection_t() :	monitor(false)
		{
		}

		bool operator==(const detection_t& r) const
		{
			atltrace::scope_t scope(__FUNCTION__);
			return
				windowtitle == r.windowtitle &&
				web == r.web &&
				dlg == r.dlg &&
				emu == r.emu &&
				names == r.names &&
				monitor == r.monitor &&
				processname == r.processname &&
				commandline == r.commandline;
		}

		bool blank() const
		{
			return
				windowtitle.blank() &&
				web.blank() &&
				dlg.blank() &&
				emu.blank() &&
				names.empty() &&
				monitor == false &&
				processname.empty() &&
				commandline.empty();
		}

	}; //class detection_t

	/////////////////////////////////////////////////////////////////////////

	namespace SUBMITTYPE
	{
		enum type_t
		{
			undefined = 0,				// For old manifests its undefined
			dosubmit,					// Force submit data, even if submit is not mutched or not detected
			nosubmit,					// Don't submit data. This is statement by User or Admin.
		};

		inline string_t toString(const SUBMITTYPE::type_t& v_)
		{
			const char* rv;
			switch (v_)
			{
				case SUBMITTYPE::undefined: rv = "undefined"; break;
				case SUBMITTYPE::dosubmit: rv = "dosubmit"; break;
				case SUBMITTYPE::nosubmit: rv = "nosubmit"; break;
				default: return sformat("NEW %d", (unsigned int)v_);
			}
			return rv;
		}
	}

	/////////////////////////////////////////////////////////////////////////
	namespace QUICKLINKTYPE
	{
		enum type_t
		{
			undefined = 0,				// For old manifests its undefined
			usequicklink,				// use quicklink.
			dontusequicklink,			// requested to not use quicklink. This is statement by User or Admin.
		};
	}

	/////////////////////////////////////////////////////////////////////////

	class options_t
	{
	public:
		string_t choosename;
		string_t sidekick;
		string_t ownernote;
		string_t qlmenuname;			// Name of quicklink shown into OneTouchMenu
		string_t auth_pl;
		bool qlwocred;					// Start quicklink wo creadentials by HP request per manifest.
		bool auto_prompt;				// start authentication right away in feedback
		bool lock_fields;				// lock screen fields
		int baloon_counter;				// number of times to show baloon; -1 means never, 0 means always

		SUBMITTYPE::type_t submittype;	// We have this information only if it was said in clear, i.e. no defaults, or guesses.

		string_t iconkey;				// Any name not nessesarely unique
		string_t iconlocation;			// Fromat is the same as described into feedback_drawing.h
		QUICKLINKTYPE::type_t useQuickLink; //Use quicklink if specified by user or admin. default is "undefined".
		bool recheckwindowafterfillin;	// To lock fields after fillin is performed by forcing to recheck the window.

		string_t unknownattributes;		// All unrecognized options by the current version.
		//bool authonbrreload;            // If specified within manifest then it will reset authentication to authenticate user again upon browser reload.
		/*
		Too complicated

		bool submitformdata;			// For compatibility with Pro false is default.
										// When OTS manifest is loaded we'll check submit control. If exist we'll set it to true.
										// If Admin will set it explicitly to false, we need to reset all controls as well.
										// For the new OTI manifests it will be set properly from now to true.
										// For the existing OTI manifests will check submit control, the same as for OTS.
		submitformdata(false)

			inline void fix_submitformdata(manifest_t& m_)
			{
				for (manifest::forms_t::iterator itf = m_.forms.begin(); itf != m_.forms.end(); ++itf)
				{
					// If it is already set then just continue
					//
					if ((*itf).options.submitformdata)
					{
						continue;
					}

					bool hassubmitcontrol = false;

					for (manifest::fields_t::const_iterator it = (*itf).fields.begin(); it != (*itf).fields.end(); ++it)
					{
						if ((*it).is_controltosubmitdata())
						{
							hassubmitcontrol = true;
							break;
						}
					}

					if (hassubmitcontrol)
					{
						(*itf).options.submitformdata = true;
					}
				}
			}
		utilsio::legacy::fix_submitformdata(rv_);
		*/

		options_t() :
			auto_prompt(false),
			lock_fields(false),
			baloon_counter(DEFAULTS::balloon_counter_defvalue),
			submittype(SUBMITTYPE::undefined),
			useQuickLink(QUICKLINKTYPE::undefined),
			recheckwindowafterfillin(false),
			qlwocred(false)/*,
			authonbrreload(false)*/
		{
		}

		bool operator==(const options_t& r) const 
		{
			return
				choosename == r.choosename &&
				sidekick == r.sidekick &&
				ownernote == r.ownernote && 
				qlmenuname == r.qlmenuname &&
				auth_pl == r.auth_pl &&
				baloon_counter == r.baloon_counter &&
				auto_prompt == r.auto_prompt &&
				lock_fields == r.lock_fields &&
				submittype == r.submittype &&
				iconkey == r.iconkey &&
				iconlocation == r.iconlocation &&
				useQuickLink == r.useQuickLink &&
				recheckwindowafterfillin == r.recheckwindowafterfillin &&
				unknownattributes == r.unknownattributes &&
				qlwocred == r.qlwocred/* &&
				authonbrreload == r.authonbrreload*/;
		}

		bool blank() const
		{
			return
				choosename.empty() &&
				sidekick.empty() &&
				ownernote.empty() &&
				qlmenuname.empty() &&
				auth_pl.empty() &&
				auto_prompt == false &&
				lock_fields == false &&
				baloon_counter == DEFAULTS::balloon_counter_defvalue &&
				submittype == SUBMITTYPE::undefined &&
				iconkey.empty() &&
				iconlocation.empty() && 
				useQuickLink == QUICKLINKTYPE::undefined &&
				recheckwindowafterfillin == false &&
				unknownattributes.empty() &&
				qlwocred == false/* && 
				authonbrreload == false*/;
		}
	};

	/////////////////////////////////////////////////////////////////////////
	// form reference definition
	//
	namespace FORMTYPE
	{
		enum type_t
		{
			unknown,
			signon,
			pchange,
			//policy_options
		};

		inline string_t toString(const FORMTYPE::type_t& v_)
		{
			const char* rv;
			switch (v_)
			{
				case FORMTYPE::unknown: rv = "unknown"; break;
				case FORMTYPE::signon : rv = "signon"; break;
				case FORMTYPE::pchange: rv = "pchange"; break;
				default: return sformat("NEW %d", (unsigned int)v_);
			}
			return rv;
		}
	}

	namespace FORMNAME				// predefined form names
	{
		enum type_t
		{
			noname = -1,
			signon = 0,
			pchange = 1,
			fieldcatalog = -2,
			primaryform = signon
		};
	}

	typedef FORMTYPE::type_t formtype_t;
	typedef FORMNAME::type_t formname_t;

	class fieldid_t					// field ids: the field identification in memory only
	{
	public:
		formname_t form;			// for editing only, not saved, but initialized from ...
		long id;					// for editing only, not saved, memuniqueid

		fieldid_t() : form(FORMNAME::noname), id(DEFAULTS::nullmemid)
		{
		}

		bool operator==(const fieldid_t& r) const
		{
			return form == r.form && id == r.id;
		}

		bool initialized() const
		{
			return form != FORMNAME::noname && id != DEFAULTS::nullmemid;
		}

		bool initialized_form() const
		{
			return form != FORMNAME::noname;
		}

		bool initialized_id() const
		{
			return id != DEFAULTS::nullmemid;
		}

		bool initialized_fieldcatalog() const
		{
			return form == FORMNAME::fieldcatalog;
		}

	}; //class fieldid_t

	/////////////////////////////////////////////////////////////////////////
	// field definition
	//
	namespace FIELDTYPE
	{
		enum type_t
		{
			unknown,
			edit,
			button,
			listbx,
			combo,
			check,
			radio,
			text,
		};

		inline string_t toString(const FIELDTYPE::type_t& v_)
		{
			const char* rv;
			switch (v_)
			{
				case FIELDTYPE::unknown: rv = "unknown"; break;
				case FIELDTYPE::edit   : rv = "edit"; break;
				case FIELDTYPE::button : rv = "button"; break;
				case FIELDTYPE::listbx : rv = "listbx"; break;
				case FIELDTYPE::combo  : rv = "combo"; break;
				case FIELDTYPE::check  : rv = "check"; break;
				case FIELDTYPE::radio  : rv = "radio"; break;
				case FIELDTYPE::text   : rv = "text"; break;
				default: return sformat("NEW %d", (unsigned int)v_);
			}
			return rv;
		}
	}

	namespace RDIRECTION
	{
		// rfield direction is relative to the current form, i.e. 'in'
		// is read from another form, and 'out' is write to, respectively.
		enum type_t
		{
			none,
			in,
			out
		};

		inline string_t toString(const RDIRECTION::type_t& v_)
		{
			const char* rv;
			switch (v_)
			{
				case RDIRECTION::none: rv = "none"; break;
				case RDIRECTION::in  : rv = "in"; break;
				case RDIRECTION::out : rv = "out"; break;
				default: return sformat("NEW %d", (unsigned int)v_);
			}
			return rv;
		}
	}

	class rfield_t
	{
	public:
		fieldid_t rmemid;			// target form name of this link, in case of fieldcatalog rindex is not saved, and rmemid is not resored as well // field mem unique id on target form of this link // for editing only, not saved
		long rindex;				// target field index of this link, this field is used to restore/save links between forms, only. after load rmemid becomes valid

		rfield_t() : rindex(DEFAULTS::index)
		{
		}
		bool operator==(const rfield_t& r) const
		{
			return rmemid.form == FORMNAME::fieldcatalog || rmemid == r.rmemid; // if (rform == r.rform && fc == r.fc) then don't compare memid
		}

	}; //class rfield_t

	class fieldids_t				// field ids: the field identification in memory only
	{
	public:
		fieldid_t memid;			// for editing only, not saved, memuniqueid
		long accid;					// for editing only, not saved. memid is unique per form, accid is unique per manifest, at least should be
		long refcounter;			// for editing only, not saved, reference to this field counter

		fieldids_t() : accid(DEFAULTS::index), refcounter(0)
		{
		}

	}; //class fieldids_t

	class value_t					// field value
	{
	public:							// tm: this should replace bool askalways; and bool onetvalue;. we'll store them into file only but in memory we'll use one enum value
		valuelife::type_t life;		// for editing only, not saved, but initialized from manifest load/save (save() not yet, but when we'll remove askalways, and onetvalue)
		bool askalways77;			// candidate to remove
		bool onetvalue77;			// candidate to remove
		string_t choosevalue;		//
	  //string_t memvalue;
	  //bool constant;				// For editing only, not saved, but initialized from manifest or from OTI save profile
									// ok, if constant is true, then memvalue was loaded from manifest file, and not reused by some application purposes.

		value_t() : life(valuelife::undefined), askalways77(false), onetvalue77(false)
		{
		}

		bool operator==(const value_t& r) const
		{
			return memvalue == r.memvalue && choosevalue == r.choosevalue && life == r.life && askalways77 == r.askalways77 && onetvalue77 == r.onetvalue77;
		}

		bool blank() const			// this method for save manifets and should not count on memory only values
		{
			return memvalue.empty() && choosevalue.empty() && !askalways77 && onetvalue77 && !is_constant();
		}

		bool is_reference() const
		{
			return m_memvalue.size() > 1 && m_memvalue[0] == '@'; // at least has one more after '@'
		}

		bool is_constant() const
		{
			return !m_memvalue.empty() && !is_reference();
		}

		bool is_constant_or_reference() const
		{
			return !m_memvalue.empty();
		}

		void clear_memvalue()
		{
			if (!is_constant())
				m_memvalue.clear(); //TODO: tm: do we still need this, at all
		}

		string_t reference_name() const
		{
			// Empty string if it is not a reference.
			if (!is_reference())
			{
				return string_t();
			}

			// Reference name format: @name[@text].
			strings_t valueparts;
			strings::split(m_memvalue, string_t("@", 1), valueparts);

			return valueparts[0];
		}

		// Checks for the existence of the input attrbute
		// within reference name.
		bool is_reference_attrib_exists(const string_t& v_) const
		{
			// Applicable only for references. 
			if (!is_reference())
			{
				return false;
			}

			// Reference name format: @name[@text].
			// Eg. @ext_quest_c@query@nohist.
			strings_t valueparts;
			strings::split(m_memvalue, string_t("@", 1), valueparts);

			bool rv_exists = false;
			// Element 0 is always reference name.
			for (strings_t::const_iterator it = valueparts.begin() + 1;
				 it != valueparts.end(); ++it)
			{
				const string_t& current_attribute = *it;

				if (!strings::equali(current_attribute, v_))
				{
					continue;
				}

				rv_exists = true;
				break;
			}

			return rv_exists;
		} //is_reference_attrib_exists()

		string_t get_memvalue5() const //TODO: the name should be 'rconstant'
		{
			return m_memvalue;
		}

		const string_t get_memvalue() const
		{
			return m_memvalue;
		}

		string_t& get_memvalue() //TODO: tm: this is very bad, we need to remove it (look at definition of preperty, it is not reference. later)
		{
			return m_memvalue;
		}

		void put_memvalue(const string_t& v)
		{
			m_memvalue = v; //constant = is_constant();
		}
		__declspec(property(get = get_memvalue, put = put_memvalue)) string_t memvalue;
	private:
		string_t m_memvalue;

	}; //class value_t

	class field_t
	{
	public:
		FIELDTYPE::type_t type;		// The type of control. Don't use members password, controltosubmitdata to check type of control
		string_t displayname;		//
		string_t path;				// This is our famous black box
		string_t dbname;			// This is unique name, or name from field catalog, or link to another form
		string_t policy;			//
		value_t value;				// Field value
		RDIRECTION::type_t rdir;	// This is read/write for value, rather then direction of link, since it may be link to field catalog.
		rfield_t rfield;			//
		bool useit;					//
		bool password;				//
		bool controltosubmitdata;	// This is a former submit. This is mark of control to submit data, not a button mark how it was impropriety used everywhere.
		fieldids_t ids;				// Field ids
		string_t options;           // Field options (Eg. password change field policy options stringify'd JSON object). "norep" and "chkppos" //TODO: who puts it here? It's part of policy and policy2, not field.

		field_t() : type(FIELDTYPE::unknown), useit(false), password(false), controltosubmitdata(false), rdir(RDIRECTION::none)
		{
		}

		bool operator==(const field_t& r) const
		{
			return
				displayname == r.displayname &&
				dbname == r.dbname &&
				policy == r.policy &&
				path == r.path &&
				value == r.value &&
				rfield == r.rfield &&
				rdir == r.rdir &&
				useit == r.useit &&
				password == r.password &&
				controltosubmitdata == r.controltosubmitdata &&
			    options == r.options;
		}

		bool blank() const			// this method for save manifets and should not count on memory only values
		{
			return
				dbname.empty() &&
				displayname.empty() &&
				path.empty() &&
				policy.empty() &&
				value.blank() &&
				useit == false &&
				password == false &&
				controltosubmitdata == false &&
				rdir == RDIRECTION::none &&
			    options.empty();
		}

		bool is_controltosubmitdata() const
		{
			// The control is used to submit data only if both are true. It may be applied not only to button controls.
			// If controltosubmitdata is true it does not mean that it will be used to submit data.
			// Starting from Personal 3.0.0 (Pro 4.3) we are using combination useit and controltosubmitdata.
			// This combination may be applied to any control in theory, but so far we are going to use it for
			// edit and button controls only.
			//
			return controltosubmitdata && useit;
		}

		bool is_editcontrol() const
		{
			// This is the check that should be used if control belongs to edit controls group.
			// Comboboxes have edit capability as edit controls.
			// The check on FIELDTYPE::edit includes protected fields as well.
			return
				type == FIELDTYPE::edit ||
				type == FIELDTYPE::combo;
		}

		bool is_buttoncontrol() const
		{
			// This is the check that should be used if control belongs to button controls group.
			return
				type == FIELDTYPE::button;
		}

	}; //class field_t

	class fields_t :
		public std::list<field_t>
	{
	public:
		bool blank() const
		{
			for (const_iterator it = begin(); it != end(); ++it)
			{
				const field_t& currentfield = *it; 

				if (!currentfield.blank())
					return false;
			}
			return true;
		}

		void clear_memvalues()
		{
			for (iterator it = begin(); it != end(); ++it)
			{
				field_t& currentfield = *it; 

				currentfield.value.clear_memvalue();
			}
		}

		field_t* operator[](long memid_)
		{
			for (iterator it = begin(); it != end(); ++it)
			{
				field_t& currentfield = *it; 

				if (currentfield.ids.memid.id == memid_)
				{
					return &currentfield;
				}
			}

			ATLASSERT(FALSE);
			return 0;
		}

		const field_t* operator[](long memid_) const
		{
			for (const_iterator it = begin(); it != end(); ++it)
			{
				const field_t& currentfield = *it; 

				if (currentfield.ids.memid.id == memid_)
				{
					return &currentfield;
				}
			}

			ATLASSERT(FALSE);
			return 0;
		}

		field_t* get_passwordfield()
		{
			for (iterator it = begin(); it != end(); ++it)
			{
				field_t& currentfield = *it; 

				if (currentfield.password)
				{
					return &currentfield;
				}
			}
			return 0;
		}

		const field_t* get_passwordfield() const
		{
			for (const_iterator it = begin(); it != end(); ++it)
			{
				const field_t& currentfield = *it; 

				if (currentfield.password)
				{
					return &(*it);
				}
			}
			return 0;
		}

	}; //class fields_t

	/////////////////////////////////////////////////////////////////////////
	// form definition
	//
	class fcontext_t
	{
	public:
		formtype_t formtype;
		formname_t name;
		formname_t parent;

		fcontext_t() :
			formtype(FORMTYPE::signon), name(FORMNAME::noname), parent(FORMNAME::noname)
		{
		}

		fcontext_t(const formtype_t t_, const formname_t n_, const formname_t p_) :
			formtype(t_), name(n_), parent(p_)
		{
		}

		bool operator==(const fcontext_t& r) const
		{
			return formtype == r.formtype && name == r.name && parent == r.parent;
		}

		bool blank() const
		{
			return formtype == FORMTYPE::signon && name == FORMNAME::noname && name == parent;
		}

	}; //class fcontext_t

	/////////////////////////////////////////////////////////////////////////

	class form_t
	{
	public:
		fcontext_t fcontext;
		detection_t detection;
		options_t options;
		fields_t fields;

		bool operator==(const form_t& r) const
		{
			return
				fcontext == r.fcontext &&
				detection == r.detection &&
				options == r.options &&
				fields == r.fields;
		}

		bool blank() const
		{
			return
				fcontext.blank() &&
				detection.blank() &&
				options.blank() &&
				fields.blank();
		}

		bool get_is_null() const
		{
			return &null() == this;
		}
		__declspec(property(get = get_is_null)) bool is_null; // We should not use it anymore. Later.

		static form_t& null()
		{
			static form_t nullform;
			return nullform;
		}

	}; //class form_t

	class forms_t :
		public std::list<form_t>
	{
	public:
		bool blank() const
		{
			for (const_iterator it = begin(); it != end(); ++it)
			{
				const form_t& currentform = *it;

				if (!currentform.blank())
					return false;
			}
			return true;
		}

		form_t& main()
		{
			if (empty())
			{
				push_back(form_t());
			}

			return front();
		}

		form_t& operator[](formname_t v)
		{
			for (iterator it = begin(); it != end(); ++it)
			{
				form_t& currentform = *it;

				formname_t current = static_cast<formname_t>(std::distance(begin(), it));

				if (current == v)
				{
					return currentform;
				}
			}

			ATLASSERT(FALSE);
			return form_t::null();
		}

		const form_t& operator[](formname_t v) const
		{
			int current = 0;
			for (const_iterator it = begin(); it != end(); ++it)
			{
				const form_t& currentform = *it;

				if (current++ == v)
				{
					return currentform;
				}
			}

			ATLASSERT(FALSE);
			return form_t::null();
		}

	}; //class forms_t

	/////////////////////////////////////////////////////////////////////////
	// CRC state

	namespace crcstate
	{
		typedef enum {
			undef,						// not verified yet
			ok,							// CRC is verified (for manifest without pchange form (,or manifest in memory only) it's crcstate ok, as well)
			bad,						// CRC is not matched (may be due to user manual change, or compatibility issues. admin tool will fix it if possible)
		} type_t;
	}

	namespace linksstate
	{
		typedef enum {
			undef,						// not verified yet
			resolved,					// links are valid in this manifest
			broken,						// links cannot be resolved
		} type_t;
	}

	/////////////////////////////////////////////////////////////////////////
	// and now all together
	//
	class manifest_t
	{
	public:
		descriptor_t descriptor;
		forms_t forms;
		customization::options_t customizationoptions;

		bool alien;						// this is not saved into file. alien means that manifest was created on another machine (i.e. OTS manifest).
		string_t memfilename;			// this is not saved into file
		formname_t memcurrentform;		// this is not saved into file

		crcstate::type_t crcstate;		// this is not saved into file
		linksstate::type_t linksstate;	// this is not saved into file

		manifest_t() :
			alien(false), memcurrentform(FORMNAME::noname), crcstate(crcstate::ok), linksstate(linksstate::undef)
		{
		}

		bool operator==(const manifest_t& r) const
		{
			bool rv = 
				alien == r.alien &&
				memfilename == r.memfilename &&
				descriptor == r.descriptor &&
				forms == r.forms;
			return rv;

		} //operator==()

		bool blank() const
		{
			bool rv =
				descriptor.blank() &&
				forms.blank(); // alien and memfilename are memory values only
			return rv;

		} //blank()

		//////////////////////////////////////

		bool hasforms() const
		{
			return !forms.empty();
		}

		form_t& mainform()
		{
			ATLASSERT(hasforms());
			return forms.front();
		}

		const form_t& mainform() const
		{
			ATLASSERT(hasforms());
			return forms.front();
		}

		//////////////////////////////////////

		bool hascurrentform() const
		{
			return memcurrentform != FORMNAME::noname;
		}

		form_t& currentform()
		{
			ATLASSERT(memcurrentform >= 0 && memcurrentform < int(forms.size()));

			return forms[memcurrentform];
		}

		const form_t& currentform() const
		{
			ATLASSERT(memcurrentform >= 0 && memcurrentform < int(forms.size()));

			return forms[memcurrentform];
		}

		//////////////////////////////////////

		bool is_parent_valid(const form_t& f_) const
		{
			bool rv = f_.fcontext.parent >= 0 && f_.fcontext.parent < (int)forms.size();
			return rv;

		} //is_parent_valid()

		// Get field from form by protected attribute, normal and const version //TODO: tm: these two should go away. Later.
		//
		field_t* field_bypassword_fromparent(const form_t& f_)
		{
			if (!is_parent_valid(f_))
			{
				return 0;
			}

			form_t& parentform = forms[f_.fcontext.parent];

			field_t* rv = parentform.fields.get_passwordfield();
			return rv;

		} //field_bypassword_fromparent()

		const field_t* field_bypassword_fromparent(const form_t& f_) const
		{
			if (!is_parent_valid(f_))
			{
				return 0;
			}

			const form_t& parentform = forms[f_.fcontext.parent];

			const field_t* rv = parentform.fields.get_passwordfield();
			return rv;

		} //field_bypassword_fromparent()

		// get form by formname, normal and const version
		//
		form_t* form_byname(const formname_t& v_)
		{
			if (v_ == FORMNAME::noname)
			{
				return 0;
			}

			for (forms_t::iterator it = forms.begin(); it != forms.end(); ++it)
			{
				form_t& currentform = *it;

				if (currentform.fcontext.name != v_)
				{
					continue;
				}

				return &currentform;
			} //for

			return 0;
		} //form_byname()

		const form_t* form_byname(const formname_t& v_) const
		{
			if (v_ == FORMNAME::noname)
			{
				return 0;
			}

			for (forms_t::const_iterator it = forms.begin(); it != forms.end(); ++it)
			{
				const form_t& currentform = *it;

				if (currentform.fcontext.name != v_)
				{
					continue;
				}

				return &currentform;
			} //for

			return 0;
		} //form_byname()

		// these two functions does not care about rdir at all, this is resolved when loading manifest
		//
		field_t* reffield_bymemid(const field_t& v_)
		{
			bool invalidID = v_.rfield.rmemid.initialized_fieldcatalog() || !v_.rfield.rmemid.initialized_id();
			if (invalidID)
			{
				return 0;
			}

			FORMNAME::type_t formID = v_.rfield.rmemid.form == FORMNAME::noname ? FORMNAME::signon : v_.rfield.rmemid.form;

			form_t* pform = form_byname(formID);
			if (!pform)
			{
				return 0;
			}

			field_t* rv = pform->fields[v_.rfield.rmemid.id];
			return rv;

		} //reffield_bymemid()

		const field_t* reffield_bymemid(const field_t& v_) const
		{
			bool invalidID = v_.rfield.rmemid.initialized_fieldcatalog() || !v_.rfield.rmemid.initialized_id();
			if (invalidID)
			{
				return 0;
			}

			FORMNAME::type_t formID = v_.rfield.rmemid.form == FORMNAME::noname ? FORMNAME::signon : v_.rfield.rmemid.form;

			const form_t* pform = form_byname(formID);
			if (!pform)
			{
				return 0;
			}

			const field_t* rv = pform->fields[v_.rfield.rmemid.id];
			return rv;

		} //reffield_bymemid()

	}; //class manifest_t

	typedef std::list<manifest_t> manifests_t;

	// Done with main definitions here.
	/////////////////////////////////////////////////////////////////////////

	/////////////////////////////////////////////////////////////////////////
	// There are two versions (const and regular) of findfield to find field by dbname

	inline field_t* find_field(manifest_t& manifest_, formname_t field_formname_, const string_t& field_dbname_) throw()
	{
		form_t* pForm = manifest_.form_byname(field_formname_);
		if (!pForm)
		{
			return 0;
		}

		for (fields_t::iterator it = (*pForm).fields.begin(); it != (*pForm).fields.end(); ++it)
		{
			field_t& currentfield = *it;

			if (currentfield.dbname != field_dbname_)
			{
				continue;
			}

			return &currentfield;
		} //for

		return 0;
	} //find_field()

	inline const field_t* find_field(const manifest_t& manifest_, formname_t field_formname_, const string_t& field_dbname_) throw()
	{
		const form_t* pForm = manifest_.form_byname(field_formname_);
		if (!pForm)
		{
			return 0;
		}

		for (fields_t::const_iterator it = (*pForm).fields.begin(); it != (*pForm).fields.end(); ++it)
		{
			const field_t& currentfield = *it;

			if (currentfield.dbname != field_dbname_)
			{
				continue;
			}

			return &currentfield;
		} //for

		return 0;
	} //find_field()

	/////////////////////////////////////////////////////////////////////////
	// The next is basicaly the same as manifest version but with check on direction

	inline const field_t* find_field_noout(const manifest_t& manifest_, formname_t field_formname_, const string_t& field_dbname_) throw()
	{
		const form_t* pForm = manifest_.form_byname(field_formname_);
		if (!pForm)
		{
			return 0;
		}

		for (fields_t::const_iterator it = (*pForm).fields.begin(); it != (*pForm).fields.end(); ++it)
		{
			const field_t& currentfield = *it;

		    if (currentfield.rdir == manifest::RDIRECTION::out)
			{
			    continue;
			}

			if (currentfield.dbname != field_dbname_)
			{
				continue;
			}

			return &currentfield;
		} //for

		return 0;
	} //find_field_noout()

	/////////////////////////////////////////////////////////////////////////
	// Manifest access by Accessibility IDs. Two vesrions are a regular and a const.

	inline manifest::field_t* find_field_by_accid(manifest::manifest_t& manifest_, long accid_)
	{
		for (manifest::forms_t::iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
		{
			manifest::form_t& currentform = *itf;

			for (manifest::fields_t::iterator it = currentform.fields.begin(); it != currentform.fields.end(); ++it)
			{
				manifest::field_t& currentfield = *it;

				if (currentfield.ids.accid != accid_)
				{
					continue;
				}

				return &currentfield;
			} //for
		} //for

		return 0;
	} //find_field_by_accid()

	inline const manifest::field_t* find_field_by_accid(const manifest::manifest_t& manifest_, long accid_)
	{
		for (manifest::forms_t::const_iterator itf = manifest_.forms.begin(); itf != manifest_.forms.end(); ++itf)
		{
			const manifest::form_t& currentform = *itf;

			for (manifest::fields_t::const_iterator it = currentform.fields.begin(); it != currentform.fields.end(); ++it)
			{
				const manifest::field_t& currentfield = *it;

				if (currentfield.ids.accid != accid_)
				{
					continue;
				}

				return &currentfield;
			} //for
		} //for

		return 0;
	} //find_field_by_accid()

	/////////////////////////////////////////////////////////////////////////

} //namespace manifest
