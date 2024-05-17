// #include "ots_password_policy_explanation_uires.h"
//
#pragma once

#include "..\SharedResources\xresources_changepwd_policyexplanation.h"
#include "ots_password_policy_explanation_ui.h"

/*
This file expect following resource IDs to be declared and defined:
	==========================================================================
	IDS_PSW_POLICY_HEAD		"\nPassword policy settings are as follows:\n"
	IDS_PSW_POLICY_LENGTH	"Length must be between %d and %d characters.\n"
	IDS_PSW_POLICY_ACHSET	"Must contain a character from the set [%s].\n"
	IDS_PSW_POLICY_MINCHSET	"Must contain atleast %d character(s) from the set: %s.\n"
	IDS_PSW_POLICY_MAXCHSET	"Must contain only %d character(s) from the set [%s].\n"
	IDS_PSW_POLICY_MMCHSET	"Must contain atleast %d and atmost %d character(s) from the set: %s.\n"
	IDS_PSW_POLICY_REPEAT	"Must contain repeated occurance of:\n"
	==========================================================================
*/

namespace password_policy_wexplanation
{
	void loadUIResources(__out keyvalues_t& keyvalues_)
	{
		keyvalues_[IDS_PSW_POLICY_HEAD]     = rstring(IDS_PSW_POLICY_HEAD);
		keyvalues_[IDS_PSW_POLICY_LENGTH]   = rstring(IDS_PSW_POLICY_LENGTH);
		keyvalues_[IDS_PSW_POLICY_ACHSET]   = rstring(IDS_PSW_POLICY_ACHSET);
		keyvalues_[IDS_PSW_POLICY_MINCHSET] = rstring(IDS_PSW_POLICY_MINCHSET);
		keyvalues_[IDS_PSW_POLICY_MAXCHSET] = rstring(IDS_PSW_POLICY_MAXCHSET);
		keyvalues_[IDS_PSW_POLICY_MMCHSET]  = rstring(IDS_PSW_POLICY_MMCHSET);
		keyvalues_[IDS_PSW_POLICY_REPEAT]   = rstring(IDS_PSW_POLICY_REPEAT);
		keyvalues_[IDS_PSW_POLICY_NOREPEAT] = rstring(IDS_PSW_POLICY_NOREPEAT);

		keyvalues_[IDS_PSW_VALUES_DIFFER] = rstring(IDS_PSW_VALUES_DIFFER);
		keyvalues_[IDS_PSW_VALUE_EMPTY] = rstring(IDS_PSW_VALUE_EMPTY);
		keyvalues_[IDS_PSW_VALUES_SAME] = rstring(IDS_PSW_VALUES_SAME);
	}

}//namespace password_policy_wexplanation
