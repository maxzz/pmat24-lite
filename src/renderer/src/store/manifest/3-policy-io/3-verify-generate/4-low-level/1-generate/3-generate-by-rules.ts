import { Rule } from "../../../3-parser/1-parser-types";
import { ChSetExtraMap, ChSetExtra } from "../9-types";

export type GeneratePswByRulesRecursivelyParams = {
    chSetExtraMap: ChSetExtraMap;
    generated: ChSetExtra[]; // generated
    toGenerate: ChSetExtra[]; // to generate
    pswLenGenerated: number;
    pswLenFixedCount: number;
};

/**
 * Generate password (only for one's with known range: min, max) as per custom rule specified.
 */
export function generateByRules(rules: Rule[], pm: GeneratePswByRulesRecursivelyParams): void {
    rules.forEach((rule) => {
        if (rule.isGroup) {
            generateByRules(rule.group.rules, pm);
        } else {
            const chSetExtra = new ChSetExtra(rule.chSet);

            if (chSetExtra.wasLenGenerated()) {
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
