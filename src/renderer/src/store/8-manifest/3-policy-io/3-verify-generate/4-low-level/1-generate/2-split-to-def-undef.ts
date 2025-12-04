import { Rule } from "../../../3-parser/1-parser-types";
import { ChSetExtraMap, ChSetExtra } from "../9-types";

export type GeneratePswByRulesRecursivelyParams = {
    chSetExtraMap: ChSetExtraMap;   // chSet rules to temprarly generated rules extra info
    generated: ChSetExtra[];        // rules generated with defined 'max' length
    toGenerate: ChSetExtra[];       // rules wo/ 'max' length to generate upper bound
    pswLenGenerated: number;        // all password length from well defined 'max' rules; former totalLengthGenerated
    pswLenFixedCount: number;       // all password length from rules wo/ 'max' rules; former minLengthToGenerate
};

/**
 * Generate password (only for one's with known range: min, max) as per custom rule specified.
 */
export function splitToDefUndef(rules: Rule[], pm: GeneratePswByRulesRecursivelyParams): void {
    rules.forEach((rule) => {
        if (rule.isGroup) {
            splitToDefUndef(rule.group.rules, pm);
        } else {
            const chSetExtra = new ChSetExtra(rule.chSet);

            if (chSetExtra.checkWasLenGenerated()) {
                pm.generated.push(chSetExtra);
                pm.chSetExtraMap.set(rule.chSet, chSetExtra);
                pm.pswLenGenerated += chSetExtra.generatedLen;
            } else {
                pm.toGenerate.push(chSetExtra);
                pm.chSetExtraMap.set(rule.chSet, chSetExtra);
                pm.pswLenFixedCount += chSetExtra.min;
            }
        }
    });
}
