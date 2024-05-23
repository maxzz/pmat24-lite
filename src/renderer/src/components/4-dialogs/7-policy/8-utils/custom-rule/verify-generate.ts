import { ChSet, RulesExtra, ParseErrorType, Rule } from "../2-adv-psw-policy";
import { ParseAdvPolicyResult, parse_advpolicy } from "../3-parser/parser-call";
import { password } from "../types";
import { utils } from "../utils";
import { strFindFirstOf } from "../cpp-utils";

export namespace customRule2 {

    class ChSetEntryExtra {
        chSet: ChSet;
        min = -1;
        max = -1;
        isGenerated = false;
        generatedLen = -1;

        constructor(pChsetEntry: ChSet, min: number, max: number) {
            this.chSet = pChsetEntry;
            this.min = min;
            this.max = max;
        }

        generateLength(): boolean {
            if (this.isGenerated) {
                return true;
            }

            if (this.min === -1 && this.max === -1) {
                this.min = this.max = 1;
            } else if (this.max === -2) {
                return false;
            }

            this.generatedLen = utils.getRandomInRange(this.min, this.max);
            this.isGenerated = this.generatedLen >= this.min && this.generatedLen <= this.max;

            return this.isGenerated;
        }

        generateValue(excludeChars: string): string {
            let rv = utils.genPswPartByChars(this.chSet.chars, excludeChars, this.generatedLen);
            return rv;
        }
    };

    type ChSetExtraMap = Map<ChSet, ChSetEntryExtra>;

    type GetBoundsRecursivelyResult = {
        undefs: ChSet[],               // undefined character set entries i.e. rule entries without any max bound value.
        min: number,                        // entries min total
        max: number,                        // entries max total
    };

    function getBoundsRecursively(rules: Rule[], rv: GetBoundsRecursivelyResult): void {
        rules.forEach(
            (ruleEntry) => {
                if (ruleEntry.isGroup) {
                    getBoundsRecursively(ruleEntry.group.rules, rv);
                } else {
                    const minRange = ruleEntry.chSet.range.min;
                    const maxRange = ruleEntry.chSet.range.max;

                    // We have min and max range set -1 if the pattern has placeholders.
                    // In that case, we have to set the range to 1 only.
                    if (minRange === -1 && maxRange === -1) {
                        rv.min++;
                        rv.max++;
                        return;
                    }

                    if (minRange > 0) {
                        rv.min += minRange;
                    }

                    if (maxRange > 0) {
                        rv.max += maxRange;
                    } else if (maxRange === -2) {
                        // Add to the list of undefined rule entries.
                        // If we are here then the max range is not set for the current entry.
                        rv.max += minRange; // Add min range to max total (at least).
                        rv.undefs.push(ruleEntry.chSet);
                    }
                }
            }
        );
    }

    type CheckRulesBoundsForGenerateResult = {
        minValid: boolean,
        maxValid: boolean,
    };

    export function checkRulesBoundsForGenerate(rulesExtra: RulesExtra): CheckRulesBoundsForGenerateResult {

        // Initialize return values with the assumption that the min and max values are valid.
        const rv: CheckRulesBoundsForGenerateResult = {
            minValid: true,
            maxValid: true,
        };

        // To get min and max bounds.
        var pm: GetBoundsRecursivelyResult = {
            undefs: [],
            min: 0,
            max: 0,
        };
        getBoundsRecursively(rulesExtra.rules, pm);

        if (pm.min < rulesExtra.pswLenRange.min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.
            let maxCharactersAvailable = pm.undefs.reduce((acc, cur) => acc + cur.chars.length, pm.min);
            rv.minValid = maxCharactersAvailable > rulesExtra.pswLenRange.min;
        } else if (pm.min > rulesExtra.pswLenRange.max) {
            rv.minValid = false;
        }

        if (pm.max < rulesExtra.pswLenRange.min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.
            let maxCharactersAvailable = pm.undefs.reduce((acc, cur) => acc + cur.chars.length, pm.max);
            rv.maxValid = maxCharactersAvailable > rulesExtra.pswLenRange.min;
        } else if (pm.max > rulesExtra.pswLenRange.max) {
            rv.maxValid = false;
        }

        return rv;
    }

    function findChSetData(ch: string, chSetEntriesMap: ChSetExtraMap, rules: Rule[]): ChSetEntryExtra | undefined {
        let rv: ChSetEntryExtra | undefined;

        // Find which character set the current character belongs.
        for (const rule of rules) {

            if (rule.isGroup) {
                rv = findChSetData(ch, chSetEntriesMap, rule.group.rules);
            }

            if (rule.chSet.chars.indexOf(ch) === -1) {
                continue; // Skip current character set entry if character is not found.
            }

            // Find corresponding entry in the character set entries holder.
            rv = chSetEntriesMap.get(rule.chSet);
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
                    pswOutOfGroup = utils.randomizeCharsInString(pswOutOfGroup);
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
                                let generatedValue = utils.genPswPartByChars(chSetData.chSet.chars, newExcludeChars, 1);

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
                            let generatedValue = utils.genPswPartByChars(chSetData.chSet.chars, newExcludeChars, 1);

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

    type GenerateForChSetEntriesHolderRecursivelyParams = {
        chSetExtraMap: ChSetExtraMap,
        generated: ChSetEntryExtra[],   // generated
        toGenerate: ChSetEntryExtra[],  // to generate
        pswLenGenerated: number,
        pswLenFixedCount: number,
    };

    function generateForChSetEntriesHolderRecursively(rules: Rule[], pm: GenerateForChSetEntriesHolderRecursivelyParams): void {
        // 0. To generate password (only for one's with known range: min, max) as per custom rule specified.

        rules.forEach((ruleEntry) => {
            if (ruleEntry.isGroup) {
                generateForChSetEntriesHolderRecursively(ruleEntry.group.rules, pm);
            } else {
                let chsetData = new ChSetEntryExtra(
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
                let min = ruleEntry.chSet.range.min;
                let max = ruleEntry.chSet.range.max;

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

    function parseExtPattern2RulesSet(pattern: string): ParseAdvPolicyResult | undefined {
        const rv = parse_advpolicy(pattern);

        if (rv.error.type != ParseErrorType.errNone) {
            return;
        }

        //resolveRulesSetBounds(rv_rulesSet_);
    }

    ////////////////////////////////////////////////////////////////////////////

    function parseExtPolicy2RulesSet(policy: password.policy_t): ParseAdvPolicyResult | undefined {
        let patternWithMinMax = `${policy.policyExt}<${policy.minLength}, ${policy.maxLength}>`;
        return parseExtPattern2RulesSet(patternWithMinMax);
    }

    function verifyPasswordAgainstRuleNoThrow(rulesExtra: RulesExtra, previousPsw: string, psw: string, noDuplicates: boolean): boolean {

        if (!psw) { // Password is invalid if empty.
            return false;
        }

        // Check length of the password is within min, max bounds.
        if (
            (rulesExtra.pswLenRange.min != 0 && rulesExtra.pswLenRange.min > psw.length) ||
            (rulesExtra.pswLenRange.max != 0 && rulesExtra.pswLenRange.max < psw.length)
        ) {
            return false;
        }

        // Check password has duplicates if specified.
        if (noDuplicates && utils.hasDuplicateChars(psw)) {
            return false;
        }

        if (rulesExtra.checkPrevPswCharPosition && !!previousPsw) {
            let maxLength = Math.min(previousPsw.length, psw.length);
            for (let i = 0; i < maxLength; i++) {
                let isSameCharAtSamePosition = previousPsw[i] === psw[i];
                if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
                {
                    return false;
                }
            }
        }

        if (rulesExtra.avoidConsecutiveChars) {
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
            rules: rulesExtra.rules,
            password: psw,
            mix: false
        };
        let rv = verifyPasswordAgainstRuleRecursively(pm);
        if (rv) {
            rv = !pm.password; // No characters should be left in the password if verified completely.
        }

        return rv;
    }

    function sort_ascendingByCharSetLength(a: ChSetEntryExtra, b: ChSetEntryExtra): number {
        if (a.chSet.chars.length === b.chSet.chars.length) {
            return 0;
        }
        let isLowerCharSetLength = a.chSet.chars.length < b.chSet.chars.length;
        return isLowerCharSetLength ? -1 : 1;
    }

    function generatePasswordByRuleNoThrow(rulesExtra: RulesExtra, noDuplicates: boolean, prevPsw: string): string {
        let rv_password = '';

        try {
            let pm: GenerateForChSetEntriesHolderRecursivelyParams = {
                chSetExtraMap: new Map<ChSet, ChSetEntryExtra>(),
                generated: [],
                toGenerate: [],
                pswLenGenerated: 0, // totalLengthGenerated
                pswLenFixedCount: 0, // minLengthToGenerate
            };
            generateForChSetEntriesHolderRecursively(rulesExtra.rules, pm);

            // Sort ruleEntries whose max is undefined in ascending order of their character set length.
            pm.toGenerate.sort(sort_ascendingByCharSetLength);

            let entriesCount = pm.toGenerate.length;

            pm.toGenerate.forEach(
                (chsetData, idx) => {

                    let maxAvbl = Math.floor((rulesExtra.pswLenRange.max - pm.pswLenGenerated)
                        / (entriesCount > 0 ? entriesCount : 1));

                    if (chsetData.isGenerated) {
                        return; // Skip entries if already generated.
                    }

                    if (maxAvbl <= 0) { // No more extra characters available so set minimum length
                        chsetData.max = chsetData.min;
                    } else {
                        let isLastEntry = idx === pm.toGenerate.length - 1;
                        if (isLastEntry) {
                            let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

                            // We have rule entries for whom password has to be generated.
                            if (pm.pswLenGenerated < rulesExtra.pswLenRange.min) {
                                moreLengthToGenerate = rulesExtra.pswLenRange.min - pm.pswLenGenerated;

                                let minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chsetData.min);
                                chsetData.min = Math.min(minimumLenToSatisfyRange, chsetData.chSet.chars.length);
                            }
                        }

                        chsetData.max = Math.max(chsetData.min, Math.min(maxAvbl, chsetData.chSet.chars.length));

                        if (isLastEntry && chsetData.max > rulesExtra.pswLenRange.max - pm.pswLenGenerated) {
                            chsetData.max = rulesExtra.pswLenRange.max - pm.pswLenGenerated;
                        }
                    }

                    if (chsetData.generateLength()) {
                        pm.pswLenGenerated += chsetData.generatedLen;
                        entriesCount--;
                    }
                }
            );

            let excludeChars = '';
            if (rulesExtra.checkPrevPswCharPosition) { // Check previous password character by character if requested
                excludeChars = prevPsw;
            }

            rv_password = generatePasswordByRuleRecursively(
                rulesExtra.rules,
                pm.chSetExtraMap,
                noDuplicates,
                rulesExtra.avoidConsecutiveChars,
                excludeChars
            );

        } catch (e) {
            rv_password = '';
            console.log('Error in generatePasswordByRuleNoThrow: ', e);
        }

        return rv_password;
    }

}//namespace customRule2
