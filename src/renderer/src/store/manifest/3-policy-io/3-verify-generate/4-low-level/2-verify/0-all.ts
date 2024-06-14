import { RulesAndMeta } from "../../../3-parser/1-parser-types";
import { genUtils } from "../../9-gen-utils";
import { VerifyByRulesParams, verifyByRules } from "./1-verify-by-rules";

export function verifyPassword(rulesAndMeta: RulesAndMeta, prevPsw: string, psw: string, noDuplicates: boolean): boolean {

    if (!psw) { // Password is invalid if empty.
        return false;
    }

    // Check length of the password is within min, max bounds.
    const { targetMin: min, targetMax: max } = rulesAndMeta;
    const isLengthValid = (min === 0 || min <= psw.length) && (max === 0 || max >= psw.length);
    if (!isLengthValid) {
        return false;
    }

    // Check password has duplicates if specified.
    if (noDuplicates && genUtils.hasDuplicateChars(psw)) {
        return false;
    }

    if (rulesAndMeta.noPrevPos && !!prevPsw) {
        let maxLength = Math.min(prevPsw.length, psw.length);
        for (let i = 0; i < maxLength; i++) {
            let isSameCharAtSamePosition = prevPsw[i] === psw[i];
            if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
            {
                return false;
            }
        }
    }

    if (rulesAndMeta.noRepeat) {
        let prevChar = '';
        for (let i = 0; i < psw.length; i++) {
            let isSameCharAsPreviousOne = prevChar === psw[i];
            if (isSameCharAsPreviousOne) // Current & previous character are repeated and hence invalid
            {
                return false;
            }

            prevChar = psw[i];
        }
    }

    // Check password against custom rule.
    let pm: VerifyByRulesParams = {
        rules: rulesAndMeta.rules,
        password: psw,
        mix: false
    };
    let rv = verifyByRules(pm);
    if (rv) {
        rv = !pm.password; // No characters should be left in the password if verified completely.
    }

    return rv;
}
