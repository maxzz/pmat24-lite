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
