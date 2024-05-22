import { password } from "../types";
import { advancedpswpolicy } from "./types";
import { utils } from "../utils";
import { strFindFirstOf } from "../cpp-utils";
import { RuleEntries, ChSetEntry, RulesSet, ParseErrorType } from "../1-adv-psw-policy";

export namespace customRule2 {

    type ChSetEntriesMap = Map<ChSetEntry, ChSetData>;
    type ChSetEntries = ChSetData[];

    type GetBoundsRecursivelyResult = {
        undefchSetEntries: ChSetEntry[],    // undefined character set entries i.e. rule entries without any max bound value.
        min: number,                        // entries min total
        max: number,                        // entries max total
    };

    function getBoundsRecursively(ruleEntries: RuleEntries, rv: GetBoundsRecursivelyResult): void {
        ruleEntries.forEach(
            (ruleEntry) => {
                if (ruleEntry.m_isgroup) {
                    getBoundsRecursively(ruleEntry.m_groupEntry.m_ruleEntries, rv);
                } else {
                    const minRange = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
                    const maxRange = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;

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
                        rv.undefchSetEntries.push(ruleEntry.m_chsetEntry);
                    }
                }
            }
        );
    }

    type CheckRulesBoundsForGenerateResult = {
        minValid: boolean,
        maxValid: boolean,
    };

    export function checkRulesBoundsForGenerate(rulesSet: RulesSet): CheckRulesBoundsForGenerateResult {

        // Initialize return values with the assumption that the min and max values are valid.
        const rv: CheckRulesBoundsForGenerateResult = {
            minValid: true,
            maxValid: true,
        };

        // To get min and max bounds.
        var pm: GetBoundsRecursivelyResult = {
            undefchSetEntries: [],
            min: 0,
            max: 0,
        };
        getBoundsRecursively(rulesSet.m_ruleEntries, pm);

        if (pm.min < rulesSet.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.
            let maxCharactersAvailable = pm.undefchSetEntries.reduce((acc, cur) => acc + cur.m_charset.length, pm.min);
            rv.minValid = maxCharactersAvailable > rulesSet.m_pswlenSet.m_min;
        } else if (pm.min > rulesSet.m_pswlenSet.m_max) {
            rv.minValid = false;
        }

        if (pm.max < rulesSet.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.
            let maxCharactersAvailable = pm.undefchSetEntries.reduce((acc, cur) => acc + cur.m_charset.length, pm.max);
            rv.maxValid = maxCharactersAvailable > rulesSet.m_pswlenSet.m_min;
        } else if (pm.max > rulesSet.m_pswlenSet.m_max) {
            rv.maxValid = false;
        }

        return rv;
    }

    class ChSetData {
        chSetEntry: ChSetEntry;
        isGenerated = false;
        generatedLen = -1;
        min = -1;
        max = -1;

        constructor(pChsetEntry: ChSetEntry, min: number, max: number) {
            this.chSetEntry = pChsetEntry;
            this.min = min;
            this.max = max;
        }

        generateLength(): boolean {
            if (this.isGenerated) {
                return this.isGenerated;
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

        generateValue(excludeChars: string): string { // Generate unique value
            let rv = utils.genPswPartByChars(this.chSetEntry.m_charset, excludeChars, this.generatedLen);
            return rv;
        }
    };

    function findChSetData(ch: string, chSetEntriesMap: ChSetEntriesMap, rules: RuleEntries,): ChSetData | undefined {
        let rv: ChSetData | undefined;

        // Find which character set the current character belongs.
        for (const rule of rules) {

            if (rule.m_isgroup) {
                rv = findChSetData(ch, chSetEntriesMap, rule.m_groupEntry.m_ruleEntries);
            }

            if (rule.m_chsetEntry.m_charset.indexOf(ch) === -1) {
                continue; // Skip current character set entry if character is not found.
            }

            // Find corresponding entry in the character set entries holder.
            rv = chSetEntriesMap.get(rule.m_chsetEntry);
            break;
        }

        return rv;
    }

    function generatePasswordByRuleRecursively(
        ruleEntries: RuleEntries,
        chSetEntriesMap: ChSetEntriesMap,
        noDuplicates: boolean,
        avoidConsecutiveChars: boolean,
        excludeChars: string = ''
    ): string {
        let rv_password = '';

        ruleEntries.forEach((ruleEntry) => {

            if (ruleEntry.m_isgroup) {

                let pswOutOfGroup = generatePasswordByRuleRecursively(
                    ruleEntry.m_groupEntry.m_ruleEntries,
                    chSetEntriesMap,
                    noDuplicates,
                    avoidConsecutiveChars,
                    excludeChars
                );

                if (ruleEntry.m_groupEntry.m_mix) {
                    pswOutOfGroup = utils.randomizeCharsInString(pswOutOfGroup);
                }

                rv_password += pswOutOfGroup;

                if (avoidConsecutiveChars) {

                    let newPsw = '';
                    let prevCh: string | undefined;

                    for (let i = 0; i < rv_password.length; i++) {
                        let curCh = rv_password[i];

                        if (prevCh === curCh) {
                            let chSetData = findChSetData(curCh, chSetEntriesMap, ruleEntry.m_groupEntry.m_ruleEntries);
                            if (chSetData) {
                                let newExcludeChars = (i === rv_password.length - 1 ? prevCh : prevCh + rv_password[i + 1]) + excludeChars;
                                let generatedValue = utils.genPswPartByChars(chSetData.chSetEntry.m_charset, newExcludeChars, 1);

                                curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                            }
                        }

                        newPsw += curCh;
                        prevCh = curCh;
                    }

                    rv_password = newPsw;
                }

            } else {
                let chSetData = chSetEntriesMap.get(ruleEntry.m_chsetEntry);
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
                            let generatedValue = utils.genPswPartByChars(chSetData.chSetEntry.m_charset, newExcludeChars, 1);

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
        chSetEntriesMap: ChSetEntriesMap,
        chsetEntries_generated_: ChSetEntries,
        chsetEntries_togenerate_: ChSetEntries,
        pswLenGenerated: number,
        pswLenFixedCount: number,
    };

    function generateForChSetEntriesHolderRecursively(ruleEntries: RuleEntries, pm: GenerateForChSetEntriesHolderRecursivelyParams): void {
        // 0. To generate password (only for one's with known range: min, max) as per custom rule specified.

        ruleEntries.forEach((ruleEntry) => {
            if (ruleEntry.m_isgroup) {
                generateForChSetEntriesHolderRecursively(ruleEntry.m_groupEntry.m_ruleEntries, pm);
            } else {
                let chsetData = new ChSetData(
                    ruleEntry.m_chsetEntry,
                    ruleEntry.m_chsetEntry.m_rangeEntry.m_min,
                    ruleEntry.m_chsetEntry.m_rangeEntry.m_max
                );

                if (chsetData.generateLength()) {
                    pm.chsetEntries_generated_.push(chsetData);
                    pm.chSetEntriesMap.set(ruleEntry.m_chsetEntry, chsetData);
                    pm.pswLenGenerated += chsetData.generatedLen;
                } else {
                    pm.chsetEntries_togenerate_.push(chsetData);
                    pm.chSetEntriesMap.set(ruleEntry.m_chsetEntry, chsetData);
                    pm.pswLenFixedCount += chsetData.min;
                }
            }
        });
    }

    type VerifyPasswordAgainstRuleRecursivelyParams = {
        ruleEntries: RuleEntries,
        password: string,
        mix: boolean,
    };

    function verifyPasswordAgainstRuleRecursively(pm: VerifyPasswordAgainstRuleRecursivelyParams): boolean {
        // 0. To verify password if conforming to custom rule.

        for (const ruleEntry of pm.ruleEntries) {

            if (ruleEntry.m_isgroup) {
                const newPm: VerifyPasswordAgainstRuleRecursivelyParams = {
                    ruleEntries: ruleEntry.m_groupEntry.m_ruleEntries,
                    password: pm.password,
                    mix: ruleEntry.m_groupEntry.m_mix
                };

                let rv = verifyPasswordAgainstRuleRecursively(newPm);
                if (!rv) {
                    return false; // Break the loop if verification failed.
                }

                pm.password = newPm.password;
                continue;
            } else {
                let min = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
                let max = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;

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
                        pos = ruleEntry.m_chsetEntry.m_charset.indexOf(curCh);
                    } else {
                        pos = strFindFirstOf(pm.password, new Set(ruleEntry.m_chsetEntry.m_charset));
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

    function parseExtPattern2RulesSet(pattern_): advancedpswpolicy.ParseAdvPolicyResult | undefined {
        const rv = advancedpswpolicy.parse_advpolicy(pattern_);

        if (rv.error.m_errorType != ParseErrorType.errNone) {
            return;
        }

        //resolveRulesSetBounds(rv_rulesSet_);
    }

    ////////////////////////////////////////////////////////////////////////////
    function parseExtPolicy2RulesSet(policy_: password.policy_t): advancedpswpolicy.ParseAdvPolicyResult | undefined {
        let pattern_withMinMaxRange = `${policy_.policyExt}<${policy_.minLength}, ${policy_.maxLength}>`;
        return parseExtPattern2RulesSet(pattern_withMinMaxRange);
    }

    function verifyPasswordAgainstRuleNoThrow(rulesSet: RulesSet, previousPsw: string, psw: string, noDuplicates: boolean): boolean {

        if (!psw) { // Password is invalid if empty.
            return false;
        }

        // Check length of the password is within min, max bounds.
        if (
            (rulesSet.m_pswlenSet.m_min != 0 && rulesSet.m_pswlenSet.m_min > psw.length) ||
            (rulesSet.m_pswlenSet.m_max != 0 && rulesSet.m_pswlenSet.m_max < psw.length)
        ) {
            return false;
        }

        // Check password has duplicates if specified.
        if (noDuplicates && utils.hasDuplicateChars(psw)) {
            return false;
        }

        if (rulesSet.m_checkPrevPasswordCharPosition && !!previousPsw) {
            let maxLength = Math.min(previousPsw.length, psw.length);
            for (let i = 0; i < maxLength; i++) {
                let isSameCharAtSamePosition = previousPsw[i] === psw[i];
                if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
                {
                    return false;
                }
            }
        }

        if (rulesSet.m_avoidConsecutiveChars) {
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
            ruleEntries: rulesSet.m_ruleEntries,
            password: psw,
            mix: false
        };
        let rv = verifyPasswordAgainstRuleRecursively(pm);
        if (rv) {
            rv = !pm.password; // No characters should be left in the password if verified completely.
        }

        return rv;
    }

    function sort_ascendingByCharSetLength(a: ChSetData, b: ChSetData): number {
        if (a.chSetEntry.m_charset.length === b.chSetEntry.m_charset.length) {
            return 0;
        }
        let isLowerCharSetLength = a.chSetEntry.m_charset.length < b.chSetEntry.m_charset.length;
        return isLowerCharSetLength ? -1 : 1;
    }

    function generatePasswordByRuleNoThrow(rulesSet: RulesSet, noDuplicates: boolean, prevPsw: string): string {
        let rv_password = '';

        try {
            let pm: GenerateForChSetEntriesHolderRecursivelyParams = {
                chSetEntriesMap: new Map<ChSetEntry, ChSetData>(),
                chsetEntries_generated_: [],
                chsetEntries_togenerate_: [],
                pswLenGenerated: 0, // totalLengthGenerated
                pswLenFixedCount: 0, // minLengthToGenerate
            };
            generateForChSetEntriesHolderRecursively(rulesSet.m_ruleEntries, pm);

            // Sort ruleEntries whose max is undefined in ascending order of their character set length.
            pm.chsetEntries_togenerate_.sort(sort_ascendingByCharSetLength);

            let entriesCount = pm.chsetEntries_togenerate_.length;

            pm.chsetEntries_togenerate_.forEach(
                (chsetData, idx) => {

                    let maxAvbl = Math.floor((rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated)
                        / (entriesCount > 0 ? entriesCount : 1));

                    if (chsetData.isGenerated) {
                        return; // Skip entries if already generated.
                    }

                    if (maxAvbl <= 0) { // No more extra characters available so set minimum length
                        chsetData.max = chsetData.min;
                    } else {
                        let isLastEntry = idx === pm.chsetEntries_togenerate_.length - 1;
                        if (isLastEntry) {
                            let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

                            // We have rule entries for whom password has to be generated.
                            if (pm.pswLenGenerated < rulesSet.m_pswlenSet.m_min) {
                                moreLengthToGenerate = rulesSet.m_pswlenSet.m_min - pm.pswLenGenerated;

                                let minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chsetData.min);
                                chsetData.min = Math.min(minimumLenToSatisfyRange, chsetData.chSetEntry.m_charset.length);
                            }
                        }

                        chsetData.max = Math.max(chsetData.min, Math.min(maxAvbl, chsetData.chSetEntry.m_charset.length));

                        if (isLastEntry && chsetData.max > rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated) {
                            chsetData.max = rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated;
                        }
                    }

                    if (chsetData.generateLength()) {
                        pm.pswLenGenerated += chsetData.generatedLen;
                        entriesCount--;
                    }
                }
            );

            let excludeChars = '';
            if (rulesSet.m_checkPrevPasswordCharPosition) { // Check previous password character by character if requested
                excludeChars = prevPsw;
            }

            rv_password = generatePasswordByRuleRecursively(
                rulesSet.m_ruleEntries,
                pm.chSetEntriesMap,
                noDuplicates,
                rulesSet.m_avoidConsecutiveChars,
                excludeChars
            );

        } catch (e) {
            rv_password = '';
            console.log('Error in generatePasswordByRuleNoThrow: ', e);
        }

        return rv_password;
    }

}//namespace customRule2
