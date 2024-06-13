import { Rule } from "../../3-parser/1-parser-types";
import { stringsPolicy } from "./9-strings";
import { WSHORTHAND_A, WSHORTHAND_a, WSHORTHAND_d, WSHORTHAND_s } from "../../3-parser/2-parser";

export function getCustomRuleExplanation(rules: Rule[], final: string[]): void {
    for (const rule of rules) {
        if (rule.isGroup) {
            /* // TODO: Explain grouping (repeat/mix).
            let groupHead: string = prefix;
            if (rule.group.mix) {
                groupHead += L"Must contain characters in any sequence:\n";
            } else {
                groupHead += L"Must contain characters in the sequence:\n";
            }
            rv += groupHead;
            */
            getCustomRuleExplanation(rule.group.rules, final);
        } else {
            const min = rule.chSet.min;
            const max = rule.chSet.max;
            // const chars = rule.chSet.chars;
            const chars = rule.chSet.chars === WSHORTHAND_A
                ? '[A-Z]'
                : rule.chSet.chars === WSHORTHAND_a
                    ? '[a-z]'
                    : rule.chSet.chars === WSHORTHAND_d
                        ? '[0-9]'
                        : rule.chSet.chars === WSHORTHAND_s
                            ? '[!@#$%^&*()_+=]'
                            : `[${rule.chSet.chars}]`;

            let rv = '';

            if (min === -1 && max === -1) {
                rv = stringsPolicy.chSet(chars); //ai:'Must contain any character.';
            } else if (max > 0 && min > 0) {
                if (max === min) {
                    if (max === 1) {
                        rv = stringsPolicy.chSet(chars); //ai:'Must contain any character.';
                    } else {
                        rv = stringsPolicy.chSetMax(max, chars); //ai:`Must contain only ${max} character(s).`;
                    }
                } else {
                    rv = stringsPolicy.chSetMinMax(min, max, chars); //ai:`Must contain atleast ${min} and not more than ${max} character(s).`;
                }
            } else if (min > 0) {
                rv = stringsPolicy.chSetMin(min, chars); //ai:`Must contain atleast ${min} character(s).`;
            }

            final.push(rv);
        }
    }
}

//TODO: add: Explain grouping (repeat/mix).
//TODO: add: final password length rule. Minimum and maximum length of the final password.
