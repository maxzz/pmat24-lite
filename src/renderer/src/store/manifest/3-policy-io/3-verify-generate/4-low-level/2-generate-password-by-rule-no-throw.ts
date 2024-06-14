import { ChSet, Rule, RulesAndMeta } from "../../3-parser/1-parser-types";
import { ChSetExtra, ChSetExtraMap } from "./9-types";
import { GeneratePswByRulesRecursivelyParams, generatePswByRulesRecursively } from "./3-generate-for-chset-entries-holder-recursively";
import { genUtils } from "../9-gen-utils";

function findChSetData(ch: string, chSetExtraMap: ChSetExtraMap, rules: Rule[]): ChSetExtra | undefined {
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

function generatePasswordByRuleRecursively(
    rules: Rule[],
    chSetExtraMap: ChSetExtraMap,
    noDuplicates: boolean,
    avoidConsecutiveChars: boolean,
    excludeChars: string = ''
): string {
    let rv_password = '';

    rules.forEach((ruleEntry) => {

        if (ruleEntry.isGroup) {

            let pswOutOfGroup = generatePasswordByRuleRecursively(
                ruleEntry.group.rules,
                chSetExtraMap,
                noDuplicates,
                avoidConsecutiveChars,
                excludeChars
            );

            if (ruleEntry.group.mix) {
                pswOutOfGroup = genUtils.randomizeCharsInString(pswOutOfGroup);
            }

            rv_password += pswOutOfGroup;

            if (avoidConsecutiveChars) {

                let newPsw = '';
                let prevCh: string | undefined;

                for (let i = 0; i < rv_password.length; i++) {
                    let curCh = rv_password[i];

                    if (prevCh === curCh) {
                        let chSetData = findChSetData(curCh, chSetExtraMap, ruleEntry.group.rules);
                        if (chSetData) {
                            let newExcludeChars = (i === rv_password.length - 1 ? prevCh : prevCh + rv_password[i + 1]) + excludeChars;
                            let generatedValue = genUtils.genPswPartByChars(chSetData.chSet.chars, newExcludeChars, 1);

                            curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                        }
                    }

                    newPsw += curCh;
                    prevCh = curCh;
                }

                rv_password = newPsw;
            }

        } else {
            let chSetData = chSetExtraMap.get(ruleEntry.chSet);
            if (!chSetData) {
                throw new Error("NO.chSetData_t.1");
            }

            const newExcludeChars = (noDuplicates ? rv_password : '') + excludeChars;

            if (chSetData.generatedLen > 0) { // SM: Fix for Bug 88016:PMAT password change create/edit regex pw gen returns rule error only some fraction on uses
                rv_password += chSetData.generateValue(newExcludeChars);
            }

            if (avoidConsecutiveChars) {
                let newPsw = '';
                let prevCh: string | undefined;

                for (let i = 0; i < rv_password.length; i++) {
                    let curCh = rv_password[i];

                    if (prevCh === curCh) {
                        let newExcludeChars = (i === rv_password.length - 1 ? prevCh : prevCh + rv_password[i + 1]) + excludeChars;
                        let generatedValue = genUtils.genPswPartByChars(chSetData.chSet.chars, newExcludeChars, 1);

                        curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                    }

                    newPsw += curCh;
                    prevCh = curCh;
                }

                rv_password = newPsw;
            }
        }
    });

    return rv_password;
}

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
        generatePswByRulesRecursively(rulesAndMeta.rules, pm);

        // Sort ruleEntries whose max is undefined in ascending order of their character set length.
        pm.toGenerate.sort(sortAscendingByCharSetLength);

        let entriesCount = pm.toGenerate.length;

        pm.toGenerate.forEach(
            (chsetData, idx) => {

                let maxAvbl = Math.floor((rulesAndMeta.targetMax - pm.pswLenGenerated)
                    / (entriesCount > 0 ? entriesCount : 1));

                if (chsetData.wasGenerated) {
                    return; // Skip entries if already generated.
                }

                if (maxAvbl <= 0) { // No more extra characters available so set minimum length
                    chsetData.max = chsetData.min;
                } else {
                    let isLastEntry = idx === pm.toGenerate.length - 1;
                    if (isLastEntry) {
                        let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.


                        // We have rule entries for whom password has to be generated.
                        if (pm.pswLenGenerated < rulesAndMeta.targetMin) {
                            moreLengthToGenerate = rulesAndMeta.targetMin - pm.pswLenGenerated;

                            let minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chsetData.min);
                            chsetData.min = Math.min(minimumLenToSatisfyRange, chsetData.chSet.chars.length);
                        }
                    }

                    chsetData.max = Math.max(chsetData.min, Math.min(maxAvbl, chsetData.chSet.chars.length));

                    if (isLastEntry && chsetData.max > rulesAndMeta.targetMax - pm.pswLenGenerated) {
                        chsetData.max = rulesAndMeta.targetMax - pm.pswLenGenerated;
                    }
                }

                if (chsetData.generateLength()) {
                    pm.pswLenGenerated += chsetData.generatedLen;
                    entriesCount--;
                }
            }
        );

        let excludeChars = '';
        if (rulesAndMeta.noPrevPos) { // Check previous password character by character if requested
            excludeChars = prevPsw;
        }

        rv_password = generatePasswordByRuleRecursively(
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
