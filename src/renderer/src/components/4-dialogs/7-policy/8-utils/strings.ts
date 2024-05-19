// C:\Y\c\dp\pm\Components\SharedResources\Localization\xresources_referencenames_en-US.rc 
/* STRINGTABLE
BEGIN
    IDS_DEF_REFNAMES_0		"name=1\nupnname=2\nfullname=3\ndomain=4\ne-mail=5\npassword=6|password=1\next_quest_c@query@nohist=7|both=1\next_quest_cp@query@nohist=8|password=1\next_vip_p@pv@noui=9|password=1\next_vip_potp@id@noui=10|password=1\n"

    IDS_DEF_REFNAMES_1		"1=Windows User Name"
    IDS_DEF_REFNAMES_2		"2=Windows User Principal Name"
    IDS_DEF_REFNAMES_3		"3=Windows Domain\\User Name"
    IDS_DEF_REFNAMES_4		"4=Windows Domain"
    IDS_DEF_REFNAMES_5		"5=Windows E-mail Address"
    IDS_DEF_REFNAMES_6		"6=Windows User Password"
    IDS_DEF_REFNAMES_7		"7=Defender One-time Password"
    IDS_DEF_REFNAMES_8		"8=Defender One-time Password + Windows User Password"
    IDS_DEF_REFNAMES_9		"9=User Password"
    IDS_DEF_REFNAMES_10		"10=User Password + VIP One-time Password"
END
 */

// C:\Y\c\dp\pm\Components\SharedResources\Localization\xresources_changepwd_policyexplanation_en-US.rc
/* STRINGTABLE
BEGIN

    IDS_PSW_POLICY_HEAD		"\n"
    IDS_PSW_POLICY_LENGTH	"   Password length must be between %d and %d characters.\n"
    IDS_PSW_POLICY_ACHSET	"   Password must contain a character from %s.\n"
    IDS_PSW_POLICY_MINCHSET	"   Password must contain at least %d character(s) from %s.\n"
    IDS_PSW_POLICY_MAXCHSET	"   Password must contain only %d character(s) from %s.\n"
    IDS_PSW_POLICY_MMCHSET	"   Password must contain at least %d character(s) and not more than  %d character(s) from %s.\n"
    IDS_PSW_POLICY_REPEAT	"   Password must contain repeated occurrence of:\n"
    IDS_PSW_POLICY_NOREPEAT	"   Each password character must only be used one time.\n"

    IDS_PSW_VALUES_DIFFER   "You must enter the same password in both new password fields."
    IDS_PSW_VALUE_EMPTY		"Enter Password"
    IDS_PSW_VALUES_SAME     "Current and new password fields have same values."
END
 */

export namespace PolicyStrings {
    export const IDS_PSW_POLICY_LENGTH	    /**/ = "   Password length must be between %d and %d characters.\n";
    export const IDS_PSW_POLICY_ACHSET	    /**/ = "   Password must contain a character from %s.\n";
    export const IDS_PSW_POLICY_MINCHSET	/**/ = "   Password must contain at least %d character(s) from %s.\n";
    export const IDS_PSW_POLICY_MAXCHSET	/**/ = "   Password must contain only %d character(s) from %s.\n";
    export const IDS_PSW_POLICY_MMCHSET	    /**/ = "   Password must contain at least %d character(s) and not more than  %d character(s) from %s.\n";
    export const IDS_PSW_POLICY_REPEAT	    /**/ = "   Password must contain repeated occurrence of:\n";
    export const IDS_PSW_POLICY_NOREPEAT	/**/ = "   Each password character must only be used one time.\n";
    export const IDS_PSW_VALUES_DIFFER      /**/ = "You must enter the same password in both new password fields.";
    export const IDS_PSW_VALUE_EMPTY		/**/ = "Enter Password";
    export const IDS_PSW_VALUES_SAME        /**/ = "Current and new password fields have same values.";
}

export namespace PolicyFunctions {
    export const IDS_PSW_POLICY_LENGTH = (min: number, max: number) =>          /**/ `   Password length must be between ${min} and ${max} characters.\n`;
    export const IDS_PSW_POLICY_ACHSET = (s: string) =>	                        /**/ `   Password must contain a character from ${s}.\n`;
    export const IDS_PSW_POLICY_MINCHSET = (d: number, s: string)	            /**/ => `   Password must contain at least ${d} character(s) from ${s}.\n`;
    export const IDS_PSW_POLICY_MAXCHSET = (d: number, s: string)	            /**/ => `   Password must contain only ${d} character(s) from ${s}.\n`;
    export const IDS_PSW_POLICY_MMCHSET = (d1: number, d2: number, s: string)   /**/ => `   Password must contain at least ${d1} character(s) and not more than  ${d2} character(s) from ${s}.\n`;
    export const IDS_PSW_POLICY_REPEAT = ()	                                    /**/ => "   Password must contain repeated occurrence of:\n";
    export const IDS_PSW_POLICY_NOREPEAT = ()	                                /**/ => "   Each password character must only be used one time.\n";
    export const IDS_PSW_VALUES_DIFFER = ()                                     /**/ => "You must enter the same password in both new password fields.";
    export const IDS_PSW_VALUE_EMPTY = ()		                                /**/ => "Enter Password";
    export const IDS_PSW_VALUES_SAME = ()                                       /**/ => "Current and new password fields have same values.";
}
