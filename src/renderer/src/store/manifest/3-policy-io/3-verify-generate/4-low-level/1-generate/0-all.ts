import { ChSet, RulesAndMeta } from "../../../3-parser/1-parser-types";
import { ChSetExtra } from "../9-types";
import { generateByRule } from "./2-generate-by-rule";
import { GeneratePswByRulesRecursivelyParams, generateByRules } from "./3-generate-by-rules";

function sortAscendingByCharSetLength(a: ChSetExtra, b: ChSetExtra): number {
    if (a.chSet.chars.length === b.chSet.chars.length) {
        return 0;
    }
    let isLowerCharSetLength = a.chSet.chars.length < b.chSet.chars.length;
    return isLowerCharSetLength ? -1 : 1;
}

export function generatePasswordByRuleNoThrow(rulesAndMeta: RulesAndMeta, noDuplicates: boolean, prevPsw: string): string {
    let rv_password = '';

    try {
        let pm: GeneratePswByRulesRecursivelyParams = {
            chSetExtraMap: new Map<ChSet, ChSetExtra>(),
            generated: [],
            toGenerate: [],
            pswLenGenerated: 0, // totalLengthGenerated
            pswLenFixedCount: 0, // minLengthToGenerate
        };
        generateByRules(rulesAndMeta.rules, pm);

        // Sort ruleEntries whose max is undefined in ascending order of their character set length.
        pm.toGenerate.sort(sortAscendingByCharSetLength);

        let entriesCount = pm.toGenerate.length;

        pm.toGenerate.forEach(
            (chSetExtra, idx) => {
                const maxAvbl = Math.floor((rulesAndMeta.targetMax - pm.pswLenGenerated) / (entriesCount > 0 ? entriesCount : 1));

                if (chSetExtra.wasGenerated) {
                    return; // Skip entries if already generated.
                }

                if (maxAvbl <= 0) { // No more extra characters available so set minimum length
                    chSetExtra.max = chSetExtra.min;
                } else {
                    const isLastEntry = idx === pm.toGenerate.length - 1;
                    if (isLastEntry) {
                        let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

                        // We have rule entries for whom password has to be generated.
                        if (pm.pswLenGenerated < rulesAndMeta.targetMin) {
                            moreLengthToGenerate = rulesAndMeta.targetMin - pm.pswLenGenerated;

                            const minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chSetExtra.min);
                            chSetExtra.min = Math.min(minimumLenToSatisfyRange, chSetExtra.chSet.chars.length);
                        }
                    }

                    chSetExtra.max = Math.max(chSetExtra.min, Math.min(maxAvbl, chSetExtra.chSet.chars.length));

                    if (isLastEntry && chSetExtra.max > rulesAndMeta.targetMax - pm.pswLenGenerated) {
                        chSetExtra.max = rulesAndMeta.targetMax - pm.pswLenGenerated;
                    }
                }

                if (chSetExtra.wasLenGenerated()) {
                    pm.pswLenGenerated += chSetExtra.generatedLen;
                    entriesCount--;
                }
            }
        );

        let excludeChars = '';
        if (rulesAndMeta.noPrevPos) { // Check previous password character by character if requested
            excludeChars = prevPsw;
        }

        rv_password = generateByRule(
            rulesAndMeta.rules,
            pm.chSetExtraMap,
            noDuplicates,
            rulesAndMeta.noRepeat,
            excludeChars
        );

    } catch (e) {
        rv_password = '';
        console.log('Error in generatePasswordByRuleNoThrow: ', e);
    }

    return rv_password;
}
