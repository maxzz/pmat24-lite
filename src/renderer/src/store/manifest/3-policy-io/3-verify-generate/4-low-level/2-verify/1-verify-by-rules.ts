import { Rule } from "../../../3-parser/1-parser-types";
import { strFindFirstOf } from "../../9-gen-utils/9-utils-cpp";

export type VerifyByRulesParams = {
    rules: Rule[];
    password: string;
    mix: boolean;
};
export function verifyByRules(pm: VerifyByRulesParams): boolean {
    // 0. To verify password if conforming to custom rule.
    for (const ruleEntry of pm.rules) {

        if (ruleEntry.isGroup) {
            const newPm: VerifyByRulesParams = {
                rules: ruleEntry.group.rules,
                password: pm.password,
                mix: ruleEntry.group.mix
            };

            let rv = verifyByRules(newPm);
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
