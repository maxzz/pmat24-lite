import { password } from "./types";
import { utils } from "./utils";
import { strFindFirstNotOf, strFindFirstOf } from "./cpp-utils";

// class verify_t {
//TODO: We need to generate explanation to user why policy verification failed. Later.

export function operator_verify(policy_: password.policy_t, psw_: string): boolean {

    if (psw_.length < policy_.minLength || psw_.length > policy_.maxLength) {
        console.log("inv.pol.length");
        return false;
    }

    // Never check duplication of characters during password verification.
    //if (policy_.m_noduplicate && utils.hasDuplicateChars(psw_))
    //{
    //	atltrace.error("Password with duplicate chars.");
    //	return false;
    //}

    switch (policy_.simpleChSet) {
        case password.CHARSETTYPE.alphanumeric:
            if (strFindFirstNotOf(psw_, utils.setSET_AlphaNumeric) !== -1) { // 1. We should validate whether the input string contains any characters other than alpha and numberic.
                console.log("utils.setSET_AlphaNumeric");
                return false;
            }

            if (strFindFirstOf(psw_, utils.setSET_AlphaBoth) === -1) { // 2. Should also validate whether the input string has both: alpha and numeric characters.
                console.log("no letter in the password");
                return false;
            }

            if (strFindFirstOf(psw_, utils.setSET_Numeric) === -1) {
                console.log("no number in the password");
                return false;
            }

            //if (utils.hasAdjacentDigits(psw_)) {
            //	console.log("Password with adjacent digits.");
            //	return false;
            //}
            break;
        case password.CHARSETTYPE.alpha:
            if (strFindFirstNotOf(psw_, utils.setSET_AlphaBoth) !== -1) {
                console.log("alpha/utils.setSET_AlphaBoth");
                return false;
            }
            break;
        case password.CHARSETTYPE.numeric:
            if (strFindFirstNotOf(psw_, utils.setSET_Numeric) !== -1) {
                console.log("numeric/utils.setSET_Numeric");
                return false;
            }
            break;
        case password.CHARSETTYPE.withspecial:
            if (strFindFirstNotOf(psw_, utils.setSET_AlphaNumericSpecial) !== -1) {
                console.log("withspecial/utils.setSET_AlphaNumericSpecial");
                return false;
            }

            if (strFindFirstOf(psw_, utils.setSET_Special) === -1) {
                console.log("no spec character in the password");
                return false;
            }
            break;
        case password.CHARSETTYPE.atleastonenumber:
            if (strFindFirstNotOf(psw_, utils.setSET_AlphaNumeric) !== -1) {
                console.log("atleastonenumber/utils.setSET_AlphaNumeric");
                return false;
            }

            if (strFindFirstOf(psw_, utils.setSET_AlphaBoth) === -1) {
                console.log("no letter in the password");
                return false;
            }

            if (strFindFirstOf(psw_, utils.setSET_Numeric) === -1) {
                console.log("no digit in the password");
                return false;
            }
            break;
        default:
            console.log('Inv.pol.mix =', policy_.simpleChSet);
    }

    return true;
}
