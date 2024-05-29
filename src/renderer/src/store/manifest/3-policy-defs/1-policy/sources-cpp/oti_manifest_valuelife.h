// #include <oti_manifest_valuelife.h>
//
#pragma once

namespace valuelife
{
	// onetvalue stands for one_time_value; undefined means constant or reference
	//
	typedef enum {undefined, constant=undefined, askreuse, askconfirm, askalways} type_t;
	/*
	if (!onetvalue && !askalways) then "ask reuse"
	if (!onetvalue &&  askalways) then "ask confirm"
	if ( onetvalue &&  askalways) then "ask always"
	if ( onetvalue && !askalways) then "ask always" //this is illigal combination if value is empty, and will be mapped to type_t::askalways because value is empty
	*/
	inline type_t cast(bool isvalueempty_, bool manifest_askalways_, bool manifest_onetvalue_)
	{
		return isvalueempty_ ? (manifest_onetvalue_ ? askalways : (manifest_askalways_ ? askconfirm : askreuse)) : undefined;
	}
	inline void cast(const type_t v_, bool isvalueempty_, bool& manifest_askalways_, bool& manifest_onetvalue_)
	{
		if (isvalueempty_)
			switch (v_)
			{
			  //case illigal   : manifest_askalways_ = false, manifest_onetvalue_ = true;  break;	// if it is one_time_value then we'll askalways
				case undefined : manifest_askalways_ = false, manifest_onetvalue_ = false; break;	// value is a reference from field catalog
				case askreuse  : manifest_askalways_ = false, manifest_onetvalue_ = false; break;	// value will be asked and saved, if value is empty
				case askconfirm: manifest_askalways_ = true,  manifest_onetvalue_ = false; break;	// value is saved but need to be confirmed allways
				case askalways :
				default:         manifest_askalways_ = true,  manifest_onetvalue_ = true;  break;	// value is not saved so ask allways
			}
		else
			manifest_askalways_ = false, manifest_onetvalue_ = false; // equals to type_t::askreuse	// value is a reference from fc, reference, or constant.
	}																  // in case of constant or reference manifest_askalways_, manifest_onetvalue_ are ignored,
	// cast without value											  // and value is not saved (we just don't save password, or constants to ps)
	//
	inline type_t cast(bool manifest_askalways_, bool manifest_onetvalue_)							// cast from manifest
	{
		return cast(true, manifest_askalways_, manifest_onetvalue_);
	}
	inline void cast(const type_t v_, bool& manifest_askalways_, bool& manifest_onetvalue_)			// cast to manifest
	{
		return cast(v_, true, manifest_askalways_, manifest_onetvalue_);
	}
} //namespace valuelife
