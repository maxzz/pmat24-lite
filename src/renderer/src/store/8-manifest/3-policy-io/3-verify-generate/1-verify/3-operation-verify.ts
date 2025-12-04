import { Poli } from "@/store/8-manifest";
import { genUtils, strFindFirstNotOf, strFindFirstOf } from "../9-gen-utils";

// class verify_t {
//TODO: We need to generate explanation to user why policy verification failed. Later.

export function operator_verify(policy: Poli.Policy, psw: string): boolean {

    if (psw.length < policy.minLen || psw.length > policy.maxLen) {
        console.error("inv.pol.length");
        return false;
    }

    // Never check duplication of characters during password verification.
    //if (policy.noDuplicate && hasDuplicateChars(psw)) { console.error("Password with duplicate chars."); return false; }

    switch (policy.constrainSet) {
        case Poli.ConstrainSet.alphanumeric:
            if (strFindFirstNotOf(psw, genUtils.setSET_AlphaNumeric) !== -1) { // 1. We should validate whether the input string contains any characters other than alpha and numberic.
                console.error("utils.setSET_AlphaNumeric");
                return false;
            }

            if (strFindFirstOf(psw, genUtils.setSET_AlphaBoth) === -1) { // 2. Should also validate whether the input string has both: alpha and numeric characters.
                console.error("no letter in the password");
                return false;
            }

            if (strFindFirstOf(psw, genUtils.setSET_Numeric) === -1) {
                console.error("no number in the password");
                return false;
            }

            //if (hasAdjacentDigits(psw)) { console.error("Password with adjacent digits."); return false; }
            break;
        case Poli.ConstrainSet.alpha:
            if (strFindFirstNotOf(psw, genUtils.setSET_AlphaBoth) !== -1) {
                console.error("alpha/utils.setSET_AlphaBoth");
                return false;
            }
            break;
        case Poli.ConstrainSet.numeric:
            if (strFindFirstNotOf(psw, genUtils.setSET_Numeric) !== -1) {
                console.error("numeric/utils.setSET_Numeric");
                return false;
            }
            break;
        case Poli.ConstrainSet.withspecial:
            if (strFindFirstNotOf(psw, genUtils.setSET_AlphaNumericSpecial) !== -1) {
                console.error("withspecial/utils.setSET_AlphaNumericSpecial");
                return false;
            }

            if (strFindFirstOf(psw, genUtils.setSET_Special) === -1) {
                console.error("no spec character in the password");
                return false;
            }
            break;
        case Poli.ConstrainSet.atleastonenumber:
            if (strFindFirstNotOf(psw, genUtils.setSET_AlphaNumeric) !== -1) {
                console.error("atleastonenumber/utils.setSET_AlphaNumeric");
                return false;
            }

            if (strFindFirstOf(psw, genUtils.setSET_AlphaBoth) === -1) {
                console.error("no letter in the password");
                return false;
            }

            if (strFindFirstOf(psw, genUtils.setSET_Numeric) === -1) {
                console.error("no digit in the password");
                return false;
            }
            break;
        default:
            console.error('Inv.pol.mix =', policy.constrainSet);
    }

    return true;
}
