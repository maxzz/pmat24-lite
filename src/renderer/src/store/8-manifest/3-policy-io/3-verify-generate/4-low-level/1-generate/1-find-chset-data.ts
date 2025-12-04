import { Rule } from "../../../3-parser/1-parser-types";
import { ChSetExtra, ChSetExtraMap } from "../9-types";

export function findChSetData(ch: string, chSetExtraMap: ChSetExtraMap, rules: Rule[]): ChSetExtra | undefined {
    let rv: ChSetExtra | undefined;

    // Find which character set the current character belongs.
    for (const rule of rules) {

        if (rule.isGroup) {
            rv = findChSetData(ch, chSetExtraMap, rule.group.rules);
        }

        if (rule.chSet.chars.indexOf(ch) === -1) {
            continue; // Skip current character set entry if character is not found.
        }

        // Find corresponding entry in the character set entries holder.
        rv = chSetExtraMap.get(rule.chSet);
        break;
    }

    return rv;
}
