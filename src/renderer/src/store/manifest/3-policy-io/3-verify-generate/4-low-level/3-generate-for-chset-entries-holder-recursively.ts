import { Rule } from "../../3-parser/1-parser-types";
import { ChSetExtraMap, ChSetExtra } from "./9-types";

export type GenerateForChSetEntriesHolderRecursivelyParams = {
    chSetExtraMap: ChSetExtraMap;
    generated: ChSetExtra[]; // generated
    toGenerate: ChSetExtra[]; // to generate
    pswLenGenerated: number;
    pswLenFixedCount: number;
};

export function generateForChSetEntriesHolderRecursively(rules: Rule[], pm: GenerateForChSetEntriesHolderRecursivelyParams): void {
    // 0. To generate password (only for one's with known range: min, max) as per custom rule specified.
    rules.forEach((ruleEntry) => {
        if (ruleEntry.isGroup) {
            generateForChSetEntriesHolderRecursively(ruleEntry.group.rules, pm);
        } else {
            let chsetData = new ChSetExtra(
                ruleEntry.chSet,
                ruleEntry.chSet.range.min,
                ruleEntry.chSet.range.max
            );

            if (chsetData.generateLength()) {
                pm.generated.push(chsetData);
                pm.chSetExtraMap.set(ruleEntry.chSet, chsetData);
                pm.pswLenGenerated += chsetData.generatedLen;
            } else {
                pm.toGenerate.push(chsetData);
                pm.chSetExtraMap.set(ruleEntry.chSet, chsetData);
                pm.pswLenFixedCount += chsetData.min;
            }
        }
    });
}
