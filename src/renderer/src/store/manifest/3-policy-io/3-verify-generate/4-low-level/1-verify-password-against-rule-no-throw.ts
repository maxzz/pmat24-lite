import { RulesAndMeta, Rule } from "../../3-parser/1-parser-types";
import { genUtils } from "../9-gen-utils/8-utils";
import { strFindFirstOf } from "../9-gen-utils/9-utils-cpp";

type VerifyPasswordAgainstRuleRecursivelyParams = {
    rules: Rule[],
    password: string,
    mix: boolean,
};

function verifyPasswordAgainstRuleRecursively(pm: VerifyPasswordAgainstRuleRecursivelyParams): boolean {
    // 0. To verify password if conforming to custom rule.

    for (const ruleEntry of pm.rules) {

        if (ruleEntry.isGroup) {
            const newPm: VerifyPasswordAgainstRuleRecursivelyParams = {
                rules: ruleEntry.group.rules,
                password: pm.password,
                mix: ruleEntry.group.mix
            };

            let rv = verifyPasswordAgainstRuleRecursively(newPm);
            if (!rv) {
                return false; // Break the loop if verification failed.
            }

            pm.password = newPm.password;
            continue;
        } else {
            let min = ruleEntry.chSet.min;
            let max = ruleEntry.chSet.max;

            if (min === max && max === -1) {
                min = max = 1;
            }
            if (max === -2) {
                max = pm.password.length;
            }

            let countCharsFound = 0;
            let i = 0;

            for (; i < pm.password.length && i < max; i++) {
                let pos = -1;

                if (!pm.mix) {
                    let curCh = pm.password[i];
                    pos = ruleEntry.chSet.chars.indexOf(curCh);
                } else {
                    pos = strFindFirstOf(pm.password, new Set(ruleEntry.chSet.chars));
                    if (pos !== -1) {
                        pm.password = pm.password.substring(0, pos) + pm.password.substring(pos + 1);
                    }
                }

                if (pos !== -1) {
                    countCharsFound++;
                    if (countCharsFound > max) { // A small optimization: To stop loop if we found more characters than expected.
                        break;
                    }
                }

                if (!pm.mix && pos === -1) {
                    break;
                }
            }

            if (!pm.mix && i > 0) {
                pm.password = pm.password.substring(i);
            }

            // Check whether characters found for current character set is range: min, max.
            if (countCharsFound < min || countCharsFound > max) {
                return false;
            }
        }

    }

    return true;
}

export function verifyPasswordAgainstRuleNoThrow(rulesAndMeta: RulesAndMeta, prevPsw: string, psw: string, noDuplicates: boolean): boolean {

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
    let pm: VerifyPasswordAgainstRuleRecursivelyParams = {
        rules: rulesAndMeta.rules,
        password: psw,
        mix: false
    };
    let rv = verifyPasswordAgainstRuleRecursively(pm);
    if (rv) {
        rv = !pm.password; // No characters should be left in the password if verified completely.
    }

    return rv;
}
