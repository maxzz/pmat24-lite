// export namespace PolicyStrings {
//     export const IDS_PSW_POLICY_LENGTH     /**/ = "   Password length must be between %d and %d characters.\n";
//     export const IDS_PSW_POLICY_ACHSET     /**/ = "   Password must contain a character from %s.\n";
//     export const IDS_PSW_POLICY_MINCHSET   /**/ = "   Password must contain at least %d character(s) from %s.\n";
//     export const IDS_PSW_POLICY_MAXCHSET   /**/ = "   Password must contain only %d character(s) from %s.\n";
//     export const IDS_PSW_POLICY_MMCHSET    /**/ = "   Password must contain at least %d character(s) and not more than  %d character(s) from %s.\n";
//     export const IDS_PSW_POLICY_REPEAT     /**/ = "   Password must contain repeated occurrence of:\n";
//     export const IDS_PSW_POLICY_NOREPEAT   /**/ = "   Each password character must only be used one time.\n";
//     export const IDS_PSW_VALUES_DIFFER     /**/ = "You must enter the same password in both new password fields.";
//     export const IDS_PSW_VALUE_EMPTY       /**/ = "Enter Password";
//     export const IDS_PSW_VALUES_SAME       /**/ = "Current and new password fields have same values.";
// }

import { Poli, namesConstrainPsw } from "pm-manifest";

export const stringsPolicy = {
    chSetLen: (min: number, max: number)             /**/ => `   Password length must be between ${min} and ${max} characters`,
    chSet: (s: string)                               /**/ => `   Password must contain a character from ${s}`,
    chSetMin: (d: number, s: string)                 /**/ => `   Password must contain at least ${d} character(s) from ${s}`,
    chSetMax: (d: number, s: string)                 /**/ => `   Password must contain only ${d} character(s) from ${s}`,
    chSetMinMax: (d1: number, d2: number, s: string) /**/ => `   Password must contain at least ${d1} character(s) and not more than  ${d2} character(s) from ${s}`,
    repeat: ()                                       /**/ => "   Password must contain repeated occurrence of:",
    noRepeat: ()                                     /**/ => "   Each password character must only be used one time",
};

export const stringsValues = {
    values_differ:  /**/ "You must enter the same password in both new password fields.",
    value_empty:    /**/ "Enter Password",
    values_same:    /**/ "Current and new password fields have same values.",
};

// C:\Y\c\dp\pm\Components\SharedResources\Localization\xresources_changepwd_policyexplanation_en-US.rc
/* STRINGTABLE
BEGIN

    IDS_PSW_POLICY_HEAD     "\n"
    IDS_PSW_POLICY_LENGTH   "   Password length must be between %d and %d characters.\n"
    IDS_PSW_POLICY_ACHSET   "   Password must contain a character from %s.\n"
    IDS_PSW_POLICY_MINCHSET "   Password must contain at least %d character(s) from %s.\n"
    IDS_PSW_POLICY_MAXCHSET "   Password must contain only %d character(s) from %s.\n"
    IDS_PSW_POLICY_MMCHSET  "   Password must contain at least %d character(s) and not more than  %d character(s) from %s.\n"
    IDS_PSW_POLICY_REPEAT   "   Password must contain repeated occurrence of:\n"
    IDS_PSW_POLICY_NOREPEAT "   Each password character must only be used one time.\n"

    IDS_PSW_VALUES_DIFFER   "You must enter the same password in both new password fields."
    IDS_PSW_VALUE_EMPTY     "Enter Password"
    IDS_PSW_VALUES_SAME     "Current and new password fields have same values."
END
 */

// export const stringsPolicy2 = {
//     mix_alnum:        /**/ "Letters and numbers",
//     mix_numonly:      /**/ "Numbers only",
//     mix_alpha:        /**/ "Letters only",
//     mix_alphaspecial: /**/ "Letters or numbers with special characters",
//     mix_alphanum:     /**/ "Letters or numbers with at least one number",
//     diff_wnd:         /**/ "Different than the Windows password",
// };

export const stringsPolicy3 = {
    diffWp: namesConstrainPsw[Poli.ConstrainPsw.diffWp], // former different_wp. Different from window password.   // notWinPsw, // "Different from Windows password"
    diffAp: namesConstrainPsw[Poli.ConstrainPsw.diffAp], // former different_ap. Different from any password.      // notPmPsw,  // "Unique within Password Manager logons"
    diffPp: namesConstrainPsw[Poli.ConstrainPsw.diffPp], // former different_pp. Different from previous password. // notCurPsw, // "Different than the current password"
};

// export const namesConstrainPsw = [
//     "None",
//     "Different than the Windows password",
//     "Unique within Password Manager logons",
//     "Different than the current password",
// ];


// C:\Y\c\dp\pm\Components\SharedResources\Localization\xresources_changepwd_policy_en-US.rc
/*
STRINGTABLE
BEGIN
    IDS_PWDPOLICY_MIX_ALNUM         "Letters and numbers"
    IDS_PWDPOLICY_MIX_NUMONLY       "Numbers only"
    IDS_PWDPOLICY_MIX_ALPHA         "Letters only"
    IDS_PWDPOLICY_MIX_ALPHASPECIAL  "Letters or numbers with special characters"
    IDS_PWDPOLICY_MIX_ALPHANUM      "Letters or numbers with at least one number"
    IDS_PWDPOLICY_DIFF_WND          "Different than the Windows password"
    IDS_ERR_INVALID_VALUE           "Invalid value"
    IDS_ERR_INVALID_RANGE           "Invalid range"

    IDS_PWDPOLICY_DIFF_NONE         "None"
    IDS_PWDPOLICY_DIFF_ANY          "Unique within Password Manager managed logons"
    IDS_PWDPOLICY_DIFF_PREVIOUS     "Different than the current password"

    IDS_PASSWORD_STRENGTH           "Password strength: %s"
    IDS_PASSWORD_STRENGTH_WEAK      "Weak"
    IDS_PASSWORD_STRENGTH_MEDIUM    "Medium"
    IDS_PASSWORD_STRENGTH_STRONG    "Strong"
END
*/
