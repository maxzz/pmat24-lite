// manifestutils.cpp // C:\Y\c\dp\pm\Components\Agent\DPAgentOTSPlugin\manifestutils.cpp
//
#include "stdafx.h"
#include "manifestutils.h"

#include "upcontent_impl.h"				// upprofiles_t
#include "oti_profilevalue.h"
#include "dll_interface_fillin.h"
#include <helper_processname.h>
#include "ots_ipc_interface_dpagent.h"
#include "upprofilenames.h"				// To clear auto generated profile names.
#include "ots_implementation_plugin.h" // To post message: WMUS_POST_DSREQREPLY
#include "chgpswverify.h" // To determine whether password field is 'in' or 'out'.
#include "ots_password_policy_advanced.h"

/////////////////////////////////////////////////////////////////////////////

inline bool iswindow_UWPApp(HWND hwndForeground_) /* Universal Windows Platform App */
{
	return strings::equal(window_wclassname(hwndForeground_), L"ApplicationFrameWindow");
}

HWND getActiveThreadWindow() throw()
{
	// 0. This function will return out of process active window.

	DWORD s_dwThreadIdAttachTo = 0;  // 0=System-wide; Non-zero=specifc thread // TODO: There is something wrong!!!!!! s_dwThreadIdAttachTo is never changed.!!!!!! Later.

	HWND rv = 0;
	HWND hwndForeground = GetForegroundWindow();
	DWORD dwThreadIdAttachTo = s_dwThreadIdAttachTo;

	if (dwThreadIdAttachTo == 0)
	{
		// If monitoring local input state system-wide, attach our input
		// state to the thread that created the current foreground window.
		dwThreadIdAttachTo = GetWindowThreadProcessId(hwndForeground, NULL);
		AttachThreadInput(GetCurrentThreadId(), dwThreadIdAttachTo, TRUE);
	}

	rv = GetActiveWindow();

	if (s_dwThreadIdAttachTo == 0)
	{
		// If monitoring local input state system-wide, detach our input
		// state from the thread that created the current foreground window.
		AttachThreadInput(GetCurrentThreadId(), dwThreadIdAttachTo, FALSE);
	}

	if (!rv && iswindow_UWPApp(hwndForeground))
	{
		rv = hwndForeground;
	}

	return rv;
} //getActiveThreadWindow()

namespace dpManifestUtils
{
	bool do_manifestfile_exist(const wstring_t& manifestfilename_)
	{
		if (manifestfilename_.empty())
		{
			return false;
		}

		if (!files::fileexists(manifest_io::split_alien(manifestfilename_)))
		{
			return false;
		}

		return true;
	} //do_manifestfile_exist()

	wstring_t manifestfilenames2string(const wstrings_t& mfnames_)
	{
		wstring_t rv;
		for (const wstring_t& mfnameCurrent : mfnames_)
		{
			if (!mfnameCurrent.empty())
				rv += '\n';

			rv += mfnameCurrent;
		}//for.mfnames_

		return rv;
	} //manifestfilenames2string()

	void loadmanifestByID(__in const string_t& manifestid_, __out manifest::manifest_t& rv_loadedmanifest_)
	{
		rv_loadedmanifest_ = manifest::manifest_t();

		// NOTE: We always receive a single manfiest file name even if match with multiple manifest ids.
		//
		wstring_t manifestfilename;
		ots_cache::get_manifestfnames_by_id(manifestid_, manifestfilename, false);

		if (!manifestfilename.empty()) // Load manifest if filename is not empty.
		{
			manifest_pm20::load_manifest_properly(manifestfilename, rv_loadedmanifest_);
		}

		if (!rv_loadedmanifest_.blank() && !rv_loadedmanifest_.hasforms())
		{
			// We are interested only in real manifests i.e. manifest with forms
			// otherwise manifest is considered as not loaded.
			//
			rv_loadedmanifest_ =  manifest::manifest_t();
		}

	} //loadmanifestByID()

	void loadmanifestbyfilename(__in const wstring_t& manifestfname_, __out manifest::manifest_t& rv_loadedmanifest_)
	{
		rv_loadedmanifest_ = manifest::manifest_t();

		manifest_io::load_manifest_must(manifestfname_, rv_loadedmanifest_);

	} // loadmanifestbyfilename()

	bool savemanifest2file(__in const wstring_t& localStorageDir_, __in manifest::manifest_t& manifest_) throw()
	{
		// 0. This function is used only to save a new manifest to disk.
		// The filename is generated as guid and stored into local storage directory with 
		// extension ".dpm".

		wstring_t manifestfilename = wformat(L"%s%s%s",
			localStorageDir_,
			wstring_t(guid_t(true)),
			manifest_io::utilsio::manifestfilename::extension_dpm);

		// 1. Check file name.

		// wstring_t manifestfilename = manifest_io::split_alien(manifest_io::alien_manifestfilename(manifest_));
		if (manifestfilename.empty())
		{
			atltrace::error("Cnt.Sav.Mf");
			return false;
		}

		// 2. Save file content to manifest filename.

		string_t filecontent;
		manifest_io::savemanifesttostring(manifest_, filecontent, true); //TODO: The last true arg is not always true. Later.

		autoclose::file_t pf;
		errno_t err = _wfopen_s(&pf.v, manifestfilename.c_str(), L"w");
		if (err != 0 || !pf.v)
		{
			atltrace::lasterror(wformat(L"_wopen failed 103-8 [%d] '%s'", err, customization::debug::mfname(utf8(manifestfilename))));
			return false;
		}

		if (fputs(filecontent.c_str(), pf.v) < 0)
		{
			atltrace::error(wformat(L"failed to save '%s'", customization::debug::mfname(utf8(manifestfilename))));
			return false;
		}

		return true;
	} //savemanifest2file()

	bool removemanifestfile(__in manifest::manifest_t& manifest_) throw()
	{
		// 0. Remove OTI manifest file.

		if (IS_OTS_MANIFEST(manifest_)) // Allow OTI only.
		{
			return true;
		}

		wstring_t splitedfilename = manifest_io::split_alien(manifest_io::alien_manifestfilename(manifest_));
		if (splitedfilename.empty())
		{
			atltrace::error("Cnt.Del.Mf");
			return false;
		}

		return files::deletefile(splitedfilename);

	} // removemanifestfile()


}//namespace dpManifestUtils

/////////////////////////////////////////////////////////////////////////////

namespace upprofileUtils
{
	void clear_upfield_values(__inout unpropart::upfields_t& upfields_)
	{
		for (unpropart::upfield_t& upfieldCurrent : upfields_)
		{
			upfieldCurrent.m_valueOrHash.clear();
			upfieldCurrent.m_isHash = false;
		}//for

	} //clear_upfield_values()

	void clear_upfields_unpsw(__in const manifest::manifest_t& loadedmanifest_,__inout unpropart::upprofile_t& upprofile_)
	{
		// 0. Clear username and password fields only.

		// Check fields meaning does not always detect username and password fields.

		manifest::fields_t formfields; // To determine whether we have any reference field values or not.
		if (!loadedmanifest_.blank() && loadedmanifest_.hascurrentform())
		{
			const manifest::form_t& currentform = loadedmanifest_.currentform();
			formfields = currentform.fields;
		}

		for (unpropart::upfield_t& upfieldCurrent : upprofile_.m_upfields)
		{
			const manifest::field_t* pCurFormField = nullptr;
			for (const manifest::field_t& curFormField : formfields)
			{
				if (strings::equal(curFormField.dbname, upfieldCurrent.m_dbname))
				{
					pCurFormField = &curFormField;
					break;
				}
			}

			bool clearUPFieldValue =
				upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldpass ||
				upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldtext;

			if (clearUPFieldValue)
			{
				if (!pCurFormField || (pCurFormField && !pCurFormField->value.is_constant_or_reference()) )
				{
					upfieldCurrent.m_valueOrHash.clear();
				}
			}
		}//for
	} //clear_upfields_unpsw()

	void clear_upfields_pswonly(__inout unpropart::upprofile_t& upprofile_)
	{
		// 0. Clear password field only.

		// Check fields meaning does not always detect username and password fields.

		for (unpropart::upfield_t& upfieldCurrent : upprofile_.m_upfields)
		{
			bool clearUPFieldValue =
				upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldpass;

			if (clearUPFieldValue)
			{
				upfieldCurrent.m_valueOrHash.clear();
			}
		}//for

	} // clear_upfields_pswonly()

	void copy_upfields_values(__in const unpropart::upfields_t& A_, __inout unpropart::upfields_t& B_) throw(...)
	{
		if (A_.size() != B_.size())
		{
			throw std::exception("copy_upfields_values size");
		}

		int index = 0;
		for (unpropart::upfields_t::iterator it = B_.begin(); it != B_.end(); ++it, index++)
		{
			unpropart::upfield_t& upfieldCurrent = *it;

			const unpropart::upfield_t& A = A_.at(index);

			upfieldCurrent.m_valueOrHash = A.m_valueOrHash;
			upfieldCurrent.m_isHash = A.m_isHash;
			upfieldCurrent.m_ignore = A.m_ignore;
			upfieldCurrent.m_pswpolicy = A.m_pswpolicy;
		}//for.B_

	} //copy_upfields_values()

	void copy_upfields_labels(__in const unpropart::upfields_t& A_, __inout unpropart::upfields_t& B_) throw(...)
	{
		if (A_.size() != B_.size())
		{
			throw std::exception("copy_upfields_labels size");
		}

		int index = 0;
		for (unpropart::upfields_t::iterator it = B_.begin(); it != B_.end(); ++it, index++)
		{
			unpropart::upfield_t& upfieldCurrent = *it;

			const unpropart::upfield_t& A = A_.at(index);
			//upfieldCurrent.m_displayname = A.m_displayname;

			// Use dpid->m_disp instead of duplicating into displayname.
			if (!strings::equal(upfieldCurrent.m_dpid.m_disp, A.m_dpid.m_disp))
			{
				upfieldCurrent.m_dpid.m_disp = A.m_dpid.m_disp;
			}
		}//for.B_

	} //copy_upfields_labels()


	void copy_upfields_values_withhistory(__in const unpropart::upfields_t& A_, __inout unpropart::upfields_t& B_) throw(...)
	{
		if (A_.size() != B_.size())
		{
			throw std::exception("copy_upfields_values_withhistory size");
		}

		int index = 0;
		for (unpropart::upfields_t::iterator it = B_.begin(); it != B_.end(); ++it, index++)
		{
			unpropart::upfield_t& upfieldCurrent = *it;

			const unpropart::upfield_t& A = A_.at(index);
			upfieldCurrent.m_isHash = A.m_isHash;
			upfieldCurrent.m_ignore = A.m_ignore;

			bool isprotectedfield = upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldpass;
			if (isprotectedfield)
			{
				wstring_t valuecontainer = upfieldCurrent.m_valueOrHash;
				upfieldCurrent.m_valueOrHash = profilevalue::setcurrentvalue(valuecontainer, A.m_valueOrHash);
			}
			else
			{
				upfieldCurrent.m_valueOrHash = A.m_valueOrHash;
			}
		}//for.B_

	} //copy_upfields_values_withhistory()

	void get_upfieldsInUse_values_withouthistory(__inout unpropart::upfields_t& upfields_) throw(...)
	{
		unpropart::upfields_t upfields_inuse_valueonly;
		for (unpropart::upfields_t::const_iterator it = upfields_.begin(); it != upfields_.end(); ++it)
		{
			const unpropart::upfield_t& upfieldCurrent = *it;

			if (upfieldCurrent.m_ignore)
			{
				continue;
			}

			unpropart::upfield_t& upfieldInUse = *upfields_inuse_valueonly.insert(upfields_inuse_valueonly.end(), upfieldCurrent);

			bool isprotectedfield = upfieldInUse.m_dpid.m_fieldtype == DPIDTYPE::fieldpass;
			if (!isprotectedfield)
			{
				continue;
			}

			wstring_t currentvalue = profilevalue::getcurrentvalue(upfieldInUse.m_valueOrHash);
			upfieldInUse.m_valueOrHash = currentvalue;

		}//for.upfields_

		upfields_.swap(upfields_inuse_valueonly);

	} //get_upfieldsInUse_values_withouthistory()

	inline bool doskip_fieldtype(__in const dpid_t& dpid_)
	{
		// 0. Skip field type by default.

		bool rv = true;
		switch (dpid_.m_fieldtype)
		{
			case DPIDTYPE::fieldtext:
			case DPIDTYPE::fieldpass:
			case DPIDTYPE::fielddrop:
			case DPIDTYPE::fieldlist:
				rv = false;
				break;
		}//switch

		return rv;
	} //doskip_fieldtype()

	bool doprompt_upprofileforvalues(const unpropart::upprofile_t& upprofile_)
	{
		// 0. Check if we need to prompt user for any missing values.

		bool rv_doprompt = false;

		for (const unpropart::upfield_t& upfieldCurrent : upprofile_.m_upfields)
		{
			if (upfieldCurrent.m_ignore)
			{
				continue;
			}

			// Check empty values only for applicable field types: combo, listfield or edit text etc.

			if (doskip_fieldtype(upfieldCurrent.m_dpid))
			{
				continue;
			}

			if (upfieldCurrent.m_valuelife == valuelife::askalways || upfieldCurrent.m_valuelife == valuelife::askconfirm)
			{
				rv_doprompt = true;
				break;
			}

			// TODO: Handle the case of managed profile with windows references.

			if (upfieldCurrent.m_valueOrHash.empty())
			{
				// We will prompt user to enter values so no point checking further.
				rv_doprompt = true;
				break;
			}

		}//for.upfields

		return rv_doprompt;
	} //doprompt_upprofileforvalues()

	// NOTE: This is used for managed logon profiles only and the purpose is to 
	// determine whether all upprofile fields have values or not.
	//
	bool doupprofile_allfieldsempty(const unpropart::upprofile_t& upprofile_)
	{
		// 0. Determine whether all upfield values are empty.

		bool allfields_empty = true; // By default we assume all fields are empty.

		for (const unpropart::upfield_t& upfieldCurrent : upprofile_.m_upfields)
		{
			// Skip ignored and administrator specified constant values.
			//
			if (upfieldCurrent.m_ignore)
			{
				continue;
			}

			if (upfieldCurrent.m_valuelife == valuelife::undefined || 
				upfieldCurrent.m_valuelife == valuelife::constant)
			{
				continue;
			}

			// Check empty values only for applicable field types: combo, listfield or edit text etc.

			if (doskip_fieldtype(upfieldCurrent.m_dpid))
			{
				continue;
			}

			// Windows reference or any value is considered as non-empty.

			if (!upfieldCurrent.m_valueOrHash.empty())
			{
				// We have some fields with non-empty values.
				allfields_empty = false;
				break;
			}

		}//for.upfields

		return allfields_empty;

	} // doupprofile_allfieldsempty()

	bool checkoperation_disabledbypolicy(
		__in const unpropart::upprofile_t& upprofile_, 
		__in bool isOTSManifest_, __in bool isCurrentOperation_AddProfile_, 
		__in bool policy_allowEditProfile_, __in bool policy_allowAddProfile_)
	{
		if (!isOTSManifest_) /* Applicable for OTS manifests only */
		{
			return false;
		}

		// Do not allow to add profile if current operation is to add profile while
		// it is restricted by policy.

		if (isCurrentOperation_AddProfile_ && !policy_allowAddProfile_)
		{
			return true;
		}

		if (!isCurrentOperation_AddProfile_ && !policy_allowEditProfile_)
		{
			// We allow user to enter data for the first time so check if the upfields have any data or not.
			//
			return !doupprofile_allfieldsempty(upprofile_);
		}

		return false;
	} // checkoperation_disabledbypolicy()

	void copy_uppdata2upprofile(const unpropart::upprofile_t& upprofileFromUI_, __inout unpropart::upprofile_t& upprofile_)
	{
		// 0. Copy only relevant portion of upprofile from UI. upprofile from UI does not contain dpid hence display name etc.

		upprofile_.m_upprofilename = upprofileFromUI_.m_upprofilename;

		// Copy the following data:
		// upfield values.
		{
			// Copy values with value history.
			upprofileUtils::copy_upfields_values(upprofileFromUI_.m_upfields, upprofile_.m_upfields);
		}

		// Copy upfield labels.
		upprofileUtils::copy_upfields_labels(upprofileFromUI_.m_upfields, upprofile_.m_upfields);

		// Trace profilename.
		if (BUILDDEBUG())
		{
			atltrace::text(WCOLOR_INFO L"Prof = %s.", upprofile_.m_upprofilename.empty() ? L"empty" : utf8(upprofile_.m_upprofilename));
		}

		//

		// groupname.
		upprofile_.m_groupname = upprofileFromUI_.m_groupname;
		// submit or no submit.
		upprofile_.m_dontsubmit = upprofileFromUI_.m_dontsubmit;

		// complaints if any: compromised user or password credential etc.
		upprofile_.m_complain_compr = upprofileFromUI_.m_complain_compr;
		upprofile_.m_complain_compr_bothcreds = upprofileFromUI_.m_complain_compr_bothcreds;
		upprofile_.m_profileurl = upprofileFromUI_.m_profileurl;

	} // copy_uppdata2upprofile()


	void update_uppFieldsForOTIChgPsw(__in const unpropart::upfields_t& currentUPPFields_, __in const unpropart::upfields_t& updatedUPPFields_, __out unpropart::upfields_t& rv_changePswUPPFields_)
	{
		// 0. Iterate through current and updated upprofile fields and collect the protected fields for OTI Change password fill-in operation.

		rv_changePswUPPFields_.clear();

		// Always add current password first.
		for (const unpropart::upfield_t& upfieldCurrent : currentUPPFields_)
		{
			bool isprotected = upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldpass;
			if (isprotected)
			{
				rv_changePswUPPFields_.push_back(upfieldCurrent);
			}
		}//for

		// Updated/new password next.
		for (const unpropart::upfield_t& upfieldCurrent : updatedUPPFields_)
		{
			bool isprotected = upfieldCurrent.m_dpid.m_fieldtype == DPIDTYPE::fieldpass;
			if (isprotected)
			{
				rv_changePswUPPFields_.push_back(upfieldCurrent);
			}
		}//for

	} //update_uppFieldsForOTIChgPsw()

}//namespace upprofileUtils

/////////////////////////////////////////////////////////////////////////////

namespace dpprofileUtils
{
	void print_dpprofile(__in const dpprofile::dpprofile_t& dpprofile_)
	{
		atltrace::scope_t scope("print_dpprofile");

		scope.text("--------------");
		scope.text(L"TSID     = %s", utf8(dpprofile_.timestampid));
		scope.text(L"Group    = %s", utf8(dpprofile_.groupname));
		scope.text(L"MFID     = %s", utf8(dpprofile_.manifestid));

		dpprofile::print_dpprofile(dpprofile_);

	} //print_dpprofile()

}//namespace dpprofileUtils

/////////////////////////////////////////////////////////////////////////////

namespace fillinMethods
{
	bool generatepsw(__in const password::policy_t& policy_, __in const wstring_t& prevPassword_, __out wstring_t& password_, __out wstring_t& rv_msgErr_, __out point_t& pt_)
	{
		password_.clear();
		rv_msgErr_.clear();
		pt_.clear();

		if (policy_.IsExtendedPolicy())
		{
			advancedpswpolicy::parseError parseerror;
			advancedpswpolicy::rulesSet_t rulesSet;
			customRule::parseExtPolicy2RulesSet(policy_, rulesSet, parseerror);

			if (parseerror.m_errorType == parseerror.errNone)
			{
				bool noduplicate = true; // For generation, no duplicate characters in the password.
				customRule::generatePasswordByRuleNoThrow(rulesSet, noduplicate, prevPassword_, password_);
			}
		}
		else
		{
			password_ = utf8(password::generate_t()(policy_));
		}

		if (password_.empty())
		{
			//			rv_msgErr_ = rstring(IDS_ERR_INVALID_PATTERN);
			//			pt_ = get_errormsg_pos(m_button_generate);
			return false;
		}

		return true;
	}

	void generatepasswordByFieldPolicy(__inout unpropart::upprofile_t& upprofile_)
	{
		// 0. We iterate through profile items and collect all fields with generate policy.

		typedef std::vector<unpropart::upfield_t*> pUPFields_t;
		typedef std::map<string_t, pUPFields_t> upfieldsByPolicy_t; // policy string -> pUPFields_t

		upfieldsByPolicy_t upfieldsByPolicy;

		for (unpropart::upfield_t& upfieldCurrent : upprofile_.m_upfields)
		{
			if (upfieldCurrent.m_ignore || upfieldCurrent.m_pswpolicy.empty())
			{
				continue;
			}

			pUPFields_t& pUPFields = upfieldsByPolicy[upfieldCurrent.m_pswpolicy];
			pUPFields.push_back(&upfieldCurrent);
		}//for

		for (upfieldsByPolicy_t::iterator it = upfieldsByPolicy.begin(); it != upfieldsByPolicy.end(); ++it)
		{
			const string_t& policyCurrent = (*it).first;
			pUPFields_t& upfieldsCurrent = (*it).second;

			password::policy_t policy(policyCurrent);
			if (!policy.IsPolicyToGenerate())
				continue;

			wstring_t previousPassword;
			for (const unpropart::upfield_t* pUPField : upfieldsCurrent)
			{
				if (!pUPField)
				{
					continue;
				}

				const unpropart::upfield_t& current_upfield = (*pUPField);
				if (strings::equal(chgpswverify::cpfield::get_rdir_only(current_upfield.m_dbname), "out"))
				{
					continue;
				}

				previousPassword = profilevalue::getcurrentvalue(current_upfield.m_valueOrHash);
				break;
			}//for.pUPField

			// Generate password and save it to all fields.
			wstring_t generatedpsw;
			wstring_t rv_msgErr_;
			point_t pt_;
			generatedpsw.clear(), rv_msgErr_.clear(), pt_.clear();
			bool pw_generated = generatepsw(policy, previousPassword, generatedpsw, rv_msgErr_, pt_);

			for (unpropart::upfield_t* pUPField : upfieldsCurrent)
			{
				if (!pUPField)
				{
					continue;
				}

				unpropart::upfield_t& current_upfield = (*pUPField);
				if (!strings::equal(chgpswverify::cpfield::get_rdir_only(current_upfield.m_dbname), "out"))
				{
					continue;
				}

				current_upfield.m_valueOrHash = generatedpsw;
				current_upfield.m_isHash = false;
			}//for.pUPField

		}//for.upfieldsByPolicy
	}

}//namespace fillinMethods

/////////////////////////////////////////////////////////////////////////////

wstring_t getauxillaryURL(const wstring_t& originalURL_, const wstring_t& processname_)
{
	// 0. Prepare auxilliary URL. Persisted to storage and used by new UI only. It will return orignal URL if non-empty otherwise prepare using process name with file protocol.

	if (!originalURL_.empty())
	{
		return originalURL_;
	}

	atltrace::text("win32.mnf");

	wstring_t rv_profileurl;
	if (!processname_.empty())
	{
		rv_profileurl = wformat(L"file://%s", helper_processname::parse_env(processname_, L"ProgramFiles"));

		atltrace::text(L"processname (URL = %s)", rv_profileurl);
	}
	else
	{
		atltrace::text(ACOLOR_RED "TODO: win32.mnf wo processname.");
	}

	return rv_profileurl;
} //getauxillaryURL()

/////////////////////////////////////////////////////////////////////////////

namespace dsdataholder_notifications
{
	HWND finddpwindow::getWindowUTT() throw(...)
	{
		// 0. Find UTT message window.

		HWND rv = OTSWINDOW::window_newutt();
		if (!rv)
		{
			throw std::runtime_error("No dpUTT window.");
		}
		return rv;
	} //getWindowUTT()

	HWND finddpwindow::getWindowDashboard() throw(...)
	{
		HWND rv = OTSWINDOW::window_dsdashboard();
		if (!rv)
		{
			throw std::runtime_error("No Dashboard window");
		}
		return rv;
	} //getWindowDashboard()

	void notificationdata_t::send_notification2UI(HWND hwndSendTo_, const dpagent::requestID_t& requestID_, const string_t& replyData_)
	{
		dpagent::notification_dsdata_t pms;
		pms.requestID = requestID_;
		pms.dsdataanswer = replyData_;

		// To avoid sending ipc messages from multiple threads.
		// Repost message to Agent plugin window to forward through IPC from proper thread.

		posteddata::postdata(OTSWINDOW::window_agent(), implementation_ots::WMUS_POST_DSREQDSREPLY, pms, (LPARAM)hwndSendTo_);

	} //send_notification2UI()

	string_t notificationdata_t::prepare_reponse2UI(const string_t& what_, const string_t& data_, bool result_, bool action_)
	{
		string_t rv_dsdataanswer;

		Json::Value jsRoot;

		jsRoot["what"] = what_;
		jsRoot["data"] = data_;
		jsRoot["result"] = result_;

		if (action_) jsRoot["action"] = action_;

		rv_dsdataanswer = Json::FastWriter().write(jsRoot);

		return rv_dsdataanswer;
	} //prepare_reponse2UI()

	void notificationdata_t::send_dpprofile2fillin(__in HWND hwndSendTo_, const dpagent::requestID_t& requestID_, const string_t& manifestAsString_, bool isOTIChangePsw_, const dpprofile::dpprofile_t& dpprofile_)
	{
		atltrace::scope_t scope(__FUNCTION__);
		if (!iswindow(hwndSendTo_))
		{
			atltrace::error("reply2.inv.sendDa1");
			return;
		}

		scope.text(L"isOTIChangePsw_: %S", isOTIChangePsw_ ? "TRUE" : "FALSE");

		dpagent::notification_senddata_t pms;
		pms.requestID = requestID_;
		pms.ischangepasswordprofile = isOTIChangePsw_;
		pms.manifestasstring = utf8(manifestAsString_);
		pms.datatofillin = dpprofile_;

		//dpagent::call_fromDPAgent(hwndSendTo_, pms);

		posteddata::postdata(OTSWINDOW::window_agent(), implementation_ots::WMUS_POST_DSREQFILLIN, pms, (LPARAM)hwndSendTo_);
	} //send_dpprofile2fillin()

	void notificationdata_t::send_updata2fillin(__in HWND hwndSendTo_, const dpagent::requestID_t& requestID_, const string_t& updataanswer_)
	{
		if (!iswindow(hwndSendTo_))
		{
			atltrace::error("reply2.inv.sendDa2");
			return;
		}

		dpagent::notification_updata_t pms;
		pms.requestID = requestID_;
		pms.undataanswer = updataanswer_;
		pms.notifytype = dpagent::NOTIFICATION::senddata2;

		//dpagent::call_fromDPAgent(hwndSendTo_, pms);

		posteddata::postdata(OTSWINDOW::window_agent(), implementation_ots::WMUS_POST_DSREQUPREPLY, pms, (LPARAM)hwndSendTo_);
	} //send_updata2fillin()

	void notificationdata_t::send_requestaborted(__in HWND hwndSendTo_, const dpagent::requestID_t& requestID_)
	{
		if (!iswindow(hwndSendTo_))
		{
			atltrace::error("reply2.inv.sendAbo");
			return;
		}

		dpagent::notification_requestaborted_t pms;
		pms.requestID = requestID_;

		//dpagent::call_fromDPAgent(hwndSendTo_, pms);

		posteddata::postdata(OTSWINDOW::window_agent(), implementation_ots::WMUS_POST_DSREQABORTED, pms, (LPARAM)hwndSendTo_);

	} //send_requestaborted()

	void notificationdata_t::send_highlightID(HWND hwndSendTo_, const dpagent::requestID_t& requestID_, const unsigned int accID_, HWND hreplywindow_, __in const string_t& manifestid_)
	{
		if (!iswindow(hwndSendTo_))
		{
			atltrace::error("reply2.inv.sendHigh");
			return;
		}

		dpagent::notification_highlightID_t prms;
		prms.accID = accID_;
		prms.highlightagent = hreplywindow_;
		prms.requestID = requestID_;
		prms.manifestid = manifestid_;


		posteddata::postdata(OTSWINDOW::window_agent(), implementation_ots::WMUS_REPOST_HILITEID, prms, (LPARAM)hwndSendTo_);

	} //send_highlightID()

}//namespace dsdataholder_notifications

/////////////////////////////////////////////////////////////////////////////
