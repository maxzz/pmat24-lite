import { Rule } from "../../../3-parser/1-parser-types";
import { strFindFirstOf } from "../../9-gen-utils/9-utils-cpp";

export type VerifyByRulesParams = {
    rules: Rule[];
    password: string;
    mix: boolean;
};

/**
 * Verify the password follows the rules.
 */
export function verifyByRules(pm: VerifyByRulesParams): boolean {
    for (const rule of pm.rules) {

        if (rule.isGroup) {
            const newPm: VerifyByRulesParams = {
                rules: rule.group.rules,
                password: pm.password,
                mix: rule.group.mix
            };

            let rv = verifyByRules(newPm);
            if (!rv) {
                return false; // Break the loop if verification failed.
            }

            pm.password = newPm.password;
            continue;
        } else {
            let curPswLength = pm.password.length;

            let min = rule.chSet.min;
            let max = rule.chSet.max;

            if (min === max && max === -1) {
                min = max = 1;
            }
            if (max === -2) {
                max = curPswLength;
            }

            const chars = rule.chSet.chars;
            const charsSet = new Set(chars);

            let countCharsFound = 0;
            let idx = 0;

            for (; idx < curPswLength && idx < max; idx++) {
                let pos = -1;

                if (!pm.mix) {
                    let curCh = pm.password[idx];
                    pos = chars.indexOf(curCh);
                } else {
                    pos = strFindFirstOf(pm.password, charsSet);
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

            if (!pm.mix && idx > 0) {
                pm.password = pm.password.substring(idx);
            }

            // Check whether characters found for current character set is range: min, max.
            if (countCharsFound < min || countCharsFound > max) {
                return false;
            }
        }
    }

    return true;
}
