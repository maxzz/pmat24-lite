// #include <acc_base_io.h>
//
#pragma once

#include "acc_controls_base.h"
#include "acc_controls_strongid.h"

namespace LNODEVERSION
{
	enum type_t
	{
		noneversion = 0,	// Format p4.
		versionone = 1,		// Format p4a: different numbering for composite edit and text rolestaes.
	};

} //namespace LNODEVERSION

class lnode_t
{
public:
	rolestate_t m_rolestate;
	string_t m_classname;
	string_t m_name;
	rect_t m_location;
	long m_roleNumber;
	LNODEVERSION::type_t m_version;

	lnode_t() :
		m_roleNumber(0), m_version(LNODEVERSION::noneversion)
	{
	}

}; //class lnode_t

class lnodeitems_t : public std::vector<lnode_t>
{
public:
	lnodeitems_t()
	{
	}

	template<class InputIteratorT>
	lnodeitems_t(InputIteratorT _First, InputIteratorT _Last) :
		std::vector<lnode_t>(_First, _Last)
	{
	}

}; //class lnodeitems_t

// Information associated with one engcontrol_t.
class blackbox_t
{
public:
	lnodeitems_t m_lnodeitems;		// Loaded from/to manifest. Used by controls resolver, and io.
	dynamicid_t m_loadeddynamicid;	// Loaded from/to manifest. Used by controls resolver, and io.

	void clear()
	{
		m_lnodeitems.clear();
		m_loadeddynamicid.clear();

	} //clear()

}; //class blackbox_t

/////////////////////////////////////////////////////////////////////////////

namespace acc_io
{
    /////////////////////////////////////////////////////////////////////

	inline bool arethesame(__in const lnode_t& lnodeA_, __in const lnode_t& lnode_)
	{
		bool rv =
			lnodeA_.m_rolestate.is_samerole(lnode_.m_rolestate) &&
			lnodeA_.m_classname == lnode_.m_classname &&
			lnodeA_.m_name == lnode_.m_name &&
			//lnodeA_.m_location == lnode_.m_location &&
			lnodeA_.m_roleNumber == lnode_.m_roleNumber &&
			lnodeA_.m_version == lnode_.m_version;
		return rv;

	} //arethesame()

	inline bool arethesame(__in const lnodeitems_t& lnodeitemsA_, __in const lnodeitems_t& lnodeitems_)
	{
		if (lnodeitemsA_.size() != lnodeitems_.size())
		{
			return false;
		}

		if (lnodeitemsA_.empty())
		{
			return true;
		}

		lnodeitems_t::const_iterator itB = lnodeitems_.begin();

		// TODO: We are doing this in a hard way only because rolestate has no operator==. Later.
		for (lnodeitems_t::const_iterator itA = lnodeitemsA_.begin();  itA != lnodeitemsA_.end(); ++itA, ++itB)
		{
			const lnode_t& currentnodeA = *itA;
			const lnode_t& currentnodeB = *itB;

			if (!arethesame(currentnodeA, currentnodeB))
			{
				return false;
			}
		} //for

		return true;
	} //arethesame()

    /////////////////////////////////////////////////////////////////////

	namespace acc_io_debug
	{
		inline void print_lnode(__in const lnode_t& lnode_, __in const char* title_ = 0)
		{
			string_t s = strprintf("%02x [%02x] %-15s classname='%s' name='%s' rect(%s)",
					lnode_.m_roleNumber,
					(unsigned long)lnode_.m_rolestate.role,
					msaa::msaanames::rolename(lnode_.m_rolestate.role),
					lnode_.m_classname,
					lnode_.m_name,
					strings::conv_rect(lnode_.m_location));

			atltrace::text(s.c_str());

		} //print_lnode()

		inline void print_all(__in const blackbox_t& blackbox_, __in const char* title_ = 0)
		{
			atltrace::scope_t scope(title_ ? title_ : "bbox_t");

			for (lnodeitems_t::const_iterator it = blackbox_.m_lnodeitems.begin(); it != blackbox_.m_lnodeitems.end(); ++it)
			{
				const lnode_t& currentnode = *it;

				print_lnode(currentnode, title_);
			} //for

		} //print_all()

	} //namespace acc_io_debug

    /////////////////////////////////////////////////////////////////////
	// namespace compatibilitychecks

	inline void check_pro_300_301_compatibility(__inout blackbox_t& blackbox_)
	{
		// For pro 3.00 and 3.01, insert missing dpinfo node.

		if (blackbox_.m_lnodeitems.empty())
		{
			return;
		}

		bool needtofix = blackbox_.m_lnodeitems.front().m_rolestate.role != acc::ROLE::dpinfo;
		if (!needtofix)
		{
			return;
		}

		lnode_t& newnode = *blackbox_.m_lnodeitems.insert(blackbox_.m_lnodeitems.begin(), lnode_t());
		newnode.m_rolestate = rolestate_t(acc::ROLE::dpinfo, 0);

	} //check_pro_300_301_compatibility()

    /////////////////////////////////////////////////////////////////////

	namespace blackboxfolders
	{
		namespace folder_path4
		{

		//private:
			inline string_t rolestate16(__in const rolestate_t& rolestate_)
			{
				string_t rv;

				if (rolestate_.role)
				{
					rv = strings::conv_hex(rolestate_.role);
				}

				rv += "_";

				if (rolestate_.state)
				{
					rv += strings::conv_hex(rolestate_.state);
				}

				return rv;
			} //rolestate16()

			inline void rolestate_st(__in const string_t& v_, __out rolestate_t& rv_rolestate_)
			{
				rv_rolestate_.clear();

				string_t::size_type pos = v_.find('_');

				if (pos == string_t::npos)
				{
					return;
				}

				rv_rolestate_.role = static_cast<acc::ROLE::type_t>(strings::conv_hex(v_.substr(0, pos)));
				rv_rolestate_.state = strings::conv_hex(v_.substr(pos + 1));

			} //rolestate_st()

		//public:
			inline void initialize_from_livenode(__in navinode_t& co_, __inout lnode_t& rv_)
			{
				rv_.m_rolestate = co_.m_rolestate;
				rv_.m_roleNumber = co_.m_rolenumber;
				rv_.m_classname = nonvmnn_windowclassname(co_);
				co_.vmnn_getaccname(rv_.m_name);
				co_.vmnn_getrect(rv_.m_location);

			} //initialize_from_livenode()

			// Extract / Pack one path4.

			inline void unpack_fromstring(__in const string_t& v_, __inout lnode_t& rv_lnode_, __in const strings::pool_t* pool_)
			{
				strings_t ss;
				strings::split_abs(v_, string_t("."), ss);

				string_t rolestring;

				if (ss.size() > 0)
				{
					rv_lnode_.m_roleNumber = strings::conv_hex(ss[0]);
				}

				blackboxfolders_getstringfrompool(ss, 1, pool_, rolestring);
				blackboxfolders_getstringfrompool(ss, 2, pool_, rv_lnode_.m_classname);
				blackboxfolders_getstringfrompool(ss, 3, pool_, rv_lnode_.m_name);

				if (!rolestring.empty())
				{
					rolestate_st(rolestring, rv_lnode_.m_rolestate);
				}

			} //unpack_fromstring()

			inline string_t pack_tostring(__in const lnode_t& lnode_, __inout strings::pool_t* pool_)
			{
				string_t rv;

				rv += strings::conv_hex(lnode_.m_roleNumber);
				rv += ".";

				blackboxfolders_putstringbypool(rolestate16(lnode_.m_rolestate), pool_, rv);
				rv += ".";

				blackboxfolders_putstringbypool(lnode_.m_classname, pool_, rv);
				rv += ".";

				blackboxfolders_putstringbypool(lnode_.m_name, pool_, rv);

				return rv;
			} //pack_tostring()

			// Extract / Pack collection of path4.

			inline string_t packtostring_path(__in const lnodeitems_t& lnodeitems_, __inout strings::pool_t* pool_)
			{
				string_t rv;

				bool bfirst = true;
				for (lnodeitems_t::const_iterator it = lnodeitems_.begin(); it != lnodeitems_.end(); ++it)
				{
					const lnode_t& currentnode = *it;

					if (!rv.empty())
					rv += "|";

					rv += pack_tostring(currentnode, pool_);
				} //for

				return rv;
			} //packtostring_path()

			inline void restore_path_fromstring(
				__in const string_t& path_,
				__in const strings::pool_t* pool_,
				__in const LNODEVERSION::type_t version_,
				__out blackbox_t& rv_)
			{
				strings_t ss;
				strings::unpack(path_, string_t("|"), ss);

				rv_.m_lnodeitems.clear();
				rv_.m_lnodeitems.reserve(ss.size());

				for (strings_t::iterator it = ss.begin(); it != ss.end(); ++it)
				{
					const string_t& currentpathpiece = *it;

					lnode_t& newnode = *rv_.m_lnodeitems.insert(rv_.m_lnodeitems.end(), lnode_t());

					unpack_fromstring(currentpathpiece, newnode, pool_);
					newnode.m_version = version_;
				} //for

			} //restore_path_fromstring()

		} //namespace folder_path4

		namespace folder_location
		{
			// Extract / Pack one localtion.

			inline string_t packlocation_tostring(
				__inout strings::pool_t* pool_,
				__in const lnode_t& lnode_)
			{
				string_t s = strings::conv_rect(lnode_.m_location);
				return pool_ ? strings::conv_hex((*pool_)[s]) : s;

			} //packlocation_tostring()

			inline void unpacklocation_fromstring(
				__in const strings::pool_t* pool_,
				__in const string_t& v_,
				__inout rect_t& rv_rect_)
			{
				int index = strings::conv_hex(v_);
				string_t s = pool_ ? (*pool_)[index] : v_;
				rv_rect_ = strings::conv_rect(s);

			} //unpacklocation_fromstring()

			// Extract / Pack collection of localtions.

			inline string_t packtostring_locations(
				__in const lnodeitems_t& lnodeitems_,
				__inout strings::pool_t* pool_)
			{
				string_t rv;

				bool bfirst = true;
				for (lnodeitems_t::const_iterator it = lnodeitems_.begin(); it != lnodeitems_.end(); ++it)
				{
					const lnode_t& currentnode = *it;

					if (!rv.empty())
					rv += "|";

					rv += packlocation_tostring(pool_, currentnode);
				} //for

				return rv;
			} //packtostring_locations()

			inline void restore_locations_fromstring(
				__in const string_t& locationsstring_,
				__in const strings::pool_t* pool_,
				__inout blackbox_t& rv_)
			{
				strings_t ss;
				strings::unpack(locationsstring_, string_t("|"), ss);

				if (ss.empty())
				{
					return;
				}

				bool isthesamesize = ss.size() == rv_.m_lnodeitems.size();
				if (!isthesamesize)
				{
					return;
				}

				strings_t::iterator it = ss.begin();
				lnodeitems_t::iterator itl = rv_.m_lnodeitems.begin();

				for ( ; it != ss.end(); ++it, ++itl)
				{
					const string_t& currentlocation = *it;
					lnode_t& currentlnode = *itl;

					unpacklocation_fromstring(pool_, currentlocation, currentlnode.m_location);
				} //for

			} //restore_locations_fromstring()

		} //namespace folder_location

	} //namespace blackboxfolders

    /////////////////////////////////////////////////////////////////////

	namespace create
	{
		class fullpath_t
		{
			static void fullfill_vector_recursively(__in const navinode_t* navinode_, __out navinode_t::children_t& rv_)
			{
				if (!navinode_)
				{
					return;
				}

				rv_.push_back(const_cast<navinode_t*>(navinode_));

				fullfill_vector_recursively(navinode_->m_parentnavinode, rv_);

			} //fullfill_vector_recursively()

            static void create_blackbox_lnodeitems(__in const navinode_t* navinode_, __out lnodeitems_t& rv_)
            {
				rv_.clear();

				// 1. Build children list to top in backward order.

				navinode_t::children_t navinodestotop;
				{
					navinodestotop.reserve(navinode_->m_level);

					fullfill_vector_recursively(navinode_, navinodestotop);

					std::reverse(navinodestotop.begin(), navinodestotop.end());
				}

				// 2. Create from children_t collection m_lnodeitems items.

				for (navinode_t::children_t::iterator it = navinodestotop.begin(); it != navinodestotop.end(); ++it)
				{
					navinode_t*& currentnode = *it;

					lnode_t& newitem = *rv_.insert(rv_.end(), lnode_t());

					blackboxfolders::folder_path4::initialize_from_livenode(*currentnode, newitem);
				} //for

				// 3. Clear topwindow names. *AF*

				int thislevel = 0;
				for (lnodeitems_t::iterator it = rv_.begin(); it != rv_.end() && thislevel < 3; ++it, ++thislevel)
				{
					lnode_t& currentnode = *it;

					currentnode.m_name.clear();
				} //for

            } //create_blackbox_lnodeitems()

			static void pack_blackbox(__in const blackbox_t& blackbox_, __inout strings::pool_t* pool_, __out string_t& rv_)
			{
				string_t s1 = blackboxfolders::folder_path4::packtostring_path(blackbox_.m_lnodeitems, pool_);
				string_t s2 = blackboxfolders::folder_location::packtostring_locations(blackbox_.m_lnodeitems, pool_);

				rv_ = sformat("[p4a]%s[loc]%s", s1, s2);

				string_t s3 = blackboxfolders::folder_strongid::packtostring_strongid(blackbox_.m_loadeddynamicid.m_legstrongid, pool_);
				if (!s3.empty())
				{
					rv_ += sformat("[sid]%s", s3);
				}

				string_t did = blackboxfolders::packtostring_dynamicidrest(blackbox_.m_loadeddynamicid, pool_);
				if (!did.empty())
				{
					rv_ += sformat("[did2]%s", did);
				}

			} //pack_blackbox()

		public:
            static void packtostring(__in const engcontrol_t& engcontrol_, __out string_t& rv_, __inout strings::pool_t* pool_)
			{
				rv_.clear();

				if (!engcontrol_.m_resolvednode)
				{
					return;
				}

				blackbox_t blackbox;

				// Create hierarchy path
				create_blackbox_lnodeitems(engcontrol_.m_resolvednode, blackbox.m_lnodeitems);
				
				// Initialize blackbox strongid.
				blackbox.m_loadeddynamicid = engcontrol_.m_dynamicid;

				pack_blackbox(blackbox, pool_, rv_);

			} //packtostring()

			static void recreate_forupdate(__in const blackbox_t& blackbox_, __out string_t& rv_, __inout strings::pool_t* pool_)
			{
				pack_blackbox(blackbox_, pool_, rv_);

			} //recreate_forupdate()

		}; //class fullpath_t

        /////////////////////////////////////////////////////////////////

		class comparisonpath_t
		{
			static string_t cleanup_comparisonpath(__in const string_t& path_, __inout strings::pool_t* pool_)
			{
				blackbox_t rv;

				// 1. Extract form balckbox path information.
				{
					strings_t ss;
					strings::unpack(path_, string_t("|"), ss);

					for (strings_t::iterator it = ss.begin(); it != ss.end(); ++it)
					{
						const string_t& currentpiece = *it;

						lnode_t& newnode = *rv.m_lnodeitems.insert(rv.m_lnodeitems.end(), lnode_t());

						blackboxfolders::folder_path4::unpack_fromstring(currentpiece, newnode, pool_);
					} //for
				}

				{
					// 2. Shift to the browser.
					{
						/**/
						lnodeitems_t::iterator it;
						for (it = rv.m_lnodeitems.begin(); it != rv.m_lnodeitems.end(); ++it)
						{
							if ((*it).m_rolestate.is_pane)									//top level browser
							{
								break;
							}
						} //for
						/**/

						/** OK/
						blackbox_t::iterator it = rv.end();
						for (blackbox_t::reverse_iterator rit = rv.rbegin(); rit != rv.rend(); ++rit)
						{
							if ((*rit).m_rolestate.is_pane)									//low level browser
							{
								it = --rit.base(); break;
							}
						} //for
						/**/

						if (it != rv.m_lnodeitems.end())
						{
							rv.m_lnodeitems.erase(rv.m_lnodeitems.begin(), it);
						}
						else
						{
							check_pro_300_301_compatibility(rv);
						}
					}

					// 3. Erase names.

					for (lnodeitems_t::iterator it = rv.m_lnodeitems.begin(); it != rv.m_lnodeitems.end(); ++it)
					{
						lnode_t& currentnode = *it;

						currentnode.m_name.erase();
					} //for
				}

				// 4. Pack path information back before return.

				string_t s = blackboxfolders::folder_path4::packtostring_path(rv.m_lnodeitems, pool_);
				return s;

			} //cleanup_comparisonpath()

		public:
			static void extract_path_to_direct_compare(__in const string_t& path_, __out string_t& rv_, __inout strings::pool_t* pool_)
			{
				rv_.clear();

				strings_t ss;

				if (pool_)
				{
					strings::split(path_, string_t("["), ss);
				}
				else
				{
					strings::split(path_, string_t("["), '\\', ss);
				}

				for (strings_t::const_iterator it = ss.begin(); it != ss.end(); ++it)
				{
					const string_t& currentpiece = *it;

					string_t foldername;
					string_t foldervalue;
					blackboxfolders_extract_foldername(currentpiece, foldername, foldervalue);

					bool isp4path = strings::equal(foldername, "p4a") || strings::equal(foldername, "p4");
					if (!isp4path)
					{
						continue;
					}

					rv_ = cleanup_comparisonpath(foldervalue, pool_);
					return;
				} //for

			} //extract_path_to_direct_compare()

		}; //class comparisonpath_t

        /////////////////////////////////////////////////////////////////

		inline void restore_blackbox_fromstring(__in const string_t& path_, __in const strings::pool_t* pool_, __out blackbox_t& rv_blackbox_)
		{
			rv_blackbox_.clear();

			strings_t ss;

			if (pool_)
			{
				strings::split(path_, string_t("["), ss);
			}
			else
			{
				strings::split(path_, string_t("["), '\\', ss);
			}

			for (strings_t::const_iterator it = ss.begin(); it != ss.end(); ++it)
			{
				const string_t& currentpiece = *it;

				string_t foldername;
				string_t foldervalue;
				blackboxfolders_extract_foldername(currentpiece, foldername, foldervalue);

				if (strings::equal(foldername, "p4a") || strings::equal(foldername, "p4"))
				{
					LNODEVERSION::type_t nodeversion = strings::equal(foldername, "p4a") ?
						LNODEVERSION::versionone : LNODEVERSION::noneversion;

					blackboxfolders::folder_path4::restore_path_fromstring(foldervalue, pool_, nodeversion, rv_blackbox_);
				}
				else
				if (strings::equal(foldername, "loc"))
				{
					blackboxfolders::folder_location::restore_locations_fromstring(foldervalue, pool_, rv_blackbox_);
				}
				else
				if (strings::equal(foldername, "sid"))
				{
					blackboxfolders::folder_strongid::restore_strongid_fromstring(foldervalue, pool_, rv_blackbox_.m_loadeddynamicid.m_legstrongid);
				}
				else
				if (strings::equal(foldername, "did2"))
				{
					blackboxfolders::restorefromstring_dynamicidrest(foldervalue, pool_, rv_blackbox_.m_loadeddynamicid);
				}

			} //for

			check_pro_300_301_compatibility(rv_blackbox_);

		} //restore_blackbox_fromstring()

        /////////////////////////////////////////////////////////////////

	} //namespace create

	inline void restorenodes(__in const string_t& path_, __in const strings::pool_t* pool_, __out blackbox_t& rv_blackbox_)
	{
		create::restore_blackbox_fromstring(path_, pool_, rv_blackbox_);

	} //restorenodes()

	inline void comparisonpath(__in const string_t& path_, __out string_t& rv_, __inout strings::pool_t* pool_)
	{
		// TODO:
		// This is not exactly true. If we have strong ids then
		// path is just secondary information. Here we need to check if
		// strong ids exist then we need to return them to compare. Later.

		create::comparisonpath_t::extract_path_to_direct_compare(path_, rv_, pool_);

	} //comparisonpath()

	inline void create_fullpath_from_node(__in const engcontrol_t& engcontrol_, __out string_t& rv_, __inout strings::pool_t* pool_ = 0)
	{
		rv_.clear();

		if (!engcontrol_.m_resolvednode)
		{
			return;
		}
		// No more checks for m_resolvednode after this point.

		create::fullpath_t::packtostring(engcontrol_, rv_, pool_);

	} //create_fullpath_from_node()

	inline void create_fullpath_from_blackbox(__in const blackbox_t& blackbox_, __out string_t& rv_, __inout strings::pool_t* pool_ = 0)
	{
		create::fullpath_t::recreate_forupdate(blackbox_, rv_, pool_);

	} //create_fullpath_from_blackbox()

} //namespace acc_io

#if (0)
	// Not used anymore.

    // *AF*
    static void create::fullpath_t::lnodes_wo_topwindow_names(__in const navinode_t& navinode_, __out lnodeitems_t& rv_lnodeitems_)
    {
		create_blackbox_lnodeitems(&navinode_, rv_lnodeitems_);

    } //lnodes_wo_topwindow_names()

    // *AF*
    inline void create_blackbox_lnodeitems_wo_topwindow_names(__in navinode_t& navinode_, __out lnodeitems_t& rv_)
    {
		create::fullpath_t::lnodes_wo_topwindow_names(navinode_, rv_);

    } //create_blackbox_lnodeitems_wo_topwindow_names()

#endif
