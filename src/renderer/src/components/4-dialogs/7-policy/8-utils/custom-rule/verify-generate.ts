import { password } from "../types";
import { advancedpswpolicy } from "./types";
import { utils } from "../utils";
import { strFindFirstOf } from "../cpp-utils";

export namespace customRule2 {

    type RuleEntries = advancedpswpolicy.ruleEntries_t;
    type ChSetEntry = advancedpswpolicy.chsetEntry_t;

    type ChSetEntriesMap = Map<ChSetEntry, ChSetData>;
    type ChSetEntries = ChSetData[];

    type undef_chsetEntries_t = ChSetEntry[]; 

    type GetBoundsRecursivelyResult = {
        undefchSetEntries: ChSetEntry[], // undefined character set entries
        min: number, // entries min total
        max: number, // entries max total
    };

    function getBoundsRecursively(rulesEntries: RuleEntries, rv: GetBoundsRecursivelyResult): void {
        rulesEntries.forEach(
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
                        //
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

    export function checkRulesBoundsForGenerate(rulesSet: advancedpswpolicy.rulesSet_t): CheckRulesBoundsForGenerateResult {
        // Initialize return values with the assumption that the min and max values are valid.

        const rv: CheckRulesBoundsForGenerateResult = {
            minValid: true,
            maxValid: true,
        };

        // 0. To get min and max bounds.
        var pm: GetBoundsRecursivelyResult = {
            undefchSetEntries: [], // Rule entries without any max bound value.
            min: 0,
            max: 0,
        };

        getBoundsRecursively(rulesSet.m_ruleEntries, pm);

        if (pm.min < rulesSet.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.

            let maxCharactersAvailable = pm.min;

            pm.undefchSetEntries.forEach(
                (currentChEntry) => {
                    maxCharactersAvailable += currentChEntry.m_charset.length;
                }
            );

            rv.minValid = maxCharactersAvailable > rulesSet.m_pswlenSet.m_min;
        } else if (pm.min > rulesSet.m_pswlenSet.m_max) {
            rv.minValid = false;
        }

        if (pm.max < rulesSet.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.

            let maxCharactersAvailable = pm.max;

            pm.undefchSetEntries.forEach(
                (currentChEntry) => {
                    maxCharactersAvailable += currentChEntry.m_charset.length;
                }
            );

            rv.maxValid = maxCharactersAvailable > rulesSet.m_pswlenSet.m_min;

        } else if (pm.max > rulesSet.m_pswlenSet.m_max) {
            rv.maxValid = false;
        }

        return rv;
    }

    class ChSetData {
        //const chsetEntry_t* m_pChsetEntry = nullptr;
        m_pChsetEntry: ChSetEntry;

        m_isgenerated = false;
        m_min = -1;
        m_max = -1;
        m_generatedLen = -1;

        // chsetData_t() {}
        // chsetData_t(const chsetEntry_t* pChsetEntry_, int min_, int max_)
        //     : m_pChsetEntry(pChsetEntry_), m_min(min_), m_max(max_) {}

        constructor(pChsetEntry: ChSetEntry, min: number, max: number) {
            this.m_pChsetEntry = pChsetEntry;
            this.m_min = min;
            this.m_max = max;
        }

        generateLength(): boolean {
            if (this.m_isgenerated) {
                return this.m_isgenerated;
            }

            if (!this.m_pChsetEntry) {
                throw new Error("chsetEntry_t is null.");
            }

            if (this.m_min === -1 && this.m_max === -1) {
                this.m_min = this.m_max = 1;
            }

            if (this.m_max === -2) {
                return false;
            }

            this.m_generatedLen = utils.getRandomInRange(this.m_min, this.m_max);
            this.m_isgenerated = this.m_generatedLen >= this.m_min && this.m_generatedLen <= this.m_max;

            return this.m_isgenerated;
        }

        generateValue(excludeChars: string): string  // To generate unique values
        {
            if (!this.m_pChsetEntry) {
                throw new Error("chsetEntry_t is null.");
            }

            if (this.m_generatedLen <= 0) {
                throw new Error("Invalid length.");
            }

            let generatedValue = '';
            utils.genSubSet(this.m_pChsetEntry.m_charset, excludeChars, this.m_generatedLen, generatedValue);

            return generatedValue;
        }
    };

    function findChSetData(
        ch: string,
        chSetEntriesMap: ChSetEntriesMap,
        rules: RuleEntries,
    ): ChSetData | undefined {
        let rv: ChSetData | undefined;

        // Find which character set the current character belongs.
        for (const rule of rules) {

            if (rule.m_isgroup) {
                rv = findChSetData(ch, chSetEntriesMap, rule.m_groupEntry.m_ruleEntries);
            }

            if (rule.m_chsetEntry.m_charset.indexOf(ch) === -1) {
                // Skip current character set entry if character is not found.
                continue;
            }

            // Find corresponding entry in the character set entries holder.
            rv = chSetEntriesMap.get(rule.m_chsetEntry);
            break;
        }

        return rv;
    }

    function generatePasswordByRuleRecursively(
        ruleEntries_: RuleEntries,
        chSetEntriesHolder_: ChSetEntriesMap,
        noduplicates_: boolean,
        avoidConsecutiveChars_: boolean,
        excludeChars_: string
    ): string {
        let rv_password_ = '';
        // 0. To generate password as per custom rule specified.

        ruleEntries_.forEach((ruleEntry) => {

            if (ruleEntry.m_isgroup) {

                let pswOutOfGroup = generatePasswordByRuleRecursively(
                    ruleEntry.m_groupEntry.m_ruleEntries,
                    chSetEntriesHolder_,
                    noduplicates_,
                    avoidConsecutiveChars_,
                    excludeChars_
                );

                if (ruleEntry.m_groupEntry.m_mix) {
                    pswOutOfGroup = utils.randomizeCharsInString(pswOutOfGroup);
                }

                rv_password_ += pswOutOfGroup;

                if (avoidConsecutiveChars_) {

                    let newPsw = '';
                    let prevCh: string | undefined;

                    for (let itChar = 0; itChar < rv_password_.length; itChar++) {
                        let curCh = rv_password_[itChar];

                        if (prevCh === curCh) {
                            let itchsetEntry = findChSetData(curCh, chSetEntriesHolder_, ruleEntry.m_groupEntry.m_ruleEntries);

                            if (itchsetEntry) {
                                let pchsetData = itchsetEntry;

                                if (!pchsetData) {
                                    throw new Error("NO.chsetEntry_t.2");
                                }

                                let excludeChars = prevCh;
                                if ((itChar + 1) !== rv_password_.length) {
                                    excludeChars += rv_password_[itChar + 1];
                                }

                                if (excludeChars_) {
                                    excludeChars += excludeChars_;
                                }

                                let generatedValue = '';
                                utils.genSubSet(pchsetData.m_pChsetEntry.m_charset, excludeChars, 1, generatedValue);

                                curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                            }
                        }

                        newPsw += curCh;
                        prevCh = curCh;
                    }

                    rv_password_ = newPsw;
                }

            } else {
                let itchsetEntry = chSetEntriesHolder_.get(ruleEntry.m_chsetEntry);
                if (!itchsetEntry) {
                    throw new Error("NO.chsetEntry_t.1");
                }

                let excludeChars = noduplicates_ ? rv_password_ : '';
                if (excludeChars_) {
                    excludeChars += excludeChars_;
                }

                if (itchsetEntry.m_generatedLen > 0) { // SM: Fix for Bug 88016:PMAT password change create/edit regex pw gen returns rule error only some fraction on uses
                    rv_password_ += itchsetEntry.generateValue(excludeChars);
                }

                if (avoidConsecutiveChars_) {
                    let newPsw = '';
                    let prevCh: string | undefined;

                    for (let itChar = 0; itChar < rv_password_.length; itChar++) {
                        let curCh = rv_password_[itChar];

                        if (prevCh === curCh) {
                            let excludeChars = prevCh;
                            if ((itChar + 1) !== rv_password_.length) {
                                excludeChars += rv_password_[itChar + 1];
                            }

                            if (excludeChars_) {
                                excludeChars += excludeChars_;
                            }

                            let generatedValue = '';
                            utils.genSubSet(itchsetEntry.m_pChsetEntry.m_charset, excludeChars, 1, generatedValue);

                            curCh = !generatedValue ? curCh : generatedValue[0]; // i.e. replace with generated value if any.
                        }

                        newPsw += curCh;
                        prevCh = curCh;
                    }

                    rv_password_ = newPsw;
                }
            }
        });

        return rv_password_;
    }

    type generateForChSetEntriesHolderRecursivelyParams = {
        chSetEntriesHolder_: ChSetEntriesMap,
        chsetEntries_generated_: ChSetEntries,
        chsetEntries_togenerate_: ChSetEntries,
        pswLenGenerated_: number,
        pswLenFixedCount_: number,
    };

    function generateForChSetEntriesHolderRecursively(
        ruleEntries_: RuleEntries,
        pm: generateForChSetEntriesHolderRecursivelyParams): void {
        // 0. To generate password (only for one's with known range: min, max) as per custom rule specified.

        ruleEntries_.forEach((ruleEntry) => {

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
                    pm.chSetEntriesHolder_.set(ruleEntry.m_chsetEntry, chsetData);

                    pm.pswLenGenerated_ += chsetData.m_generatedLen;
                } else {
                    pm.chsetEntries_togenerate_.push(chsetData);
                    pm.chSetEntriesHolder_.set(ruleEntry.m_chsetEntry, chsetData);

                    pm.pswLenFixedCount_ += chsetData.m_min;
                }
            }
        });
    }

    type verifyPasswordAgainstRuleRecursivelyParams = {
        ruleEntries_: RuleEntries,
        password_: string,
        mix_: boolean,
    };

    function verifyPasswordAgainstRuleRecursively(pm: verifyPasswordAgainstRuleRecursivelyParams): boolean {
        // 0. To verify password if conforming to custom rule.

        for (const ruleEntry of pm.ruleEntries_) {

            if (ruleEntry.m_isgroup) {
                const newPm = {
                    ruleEntries_: ruleEntry.m_groupEntry.m_ruleEntries,
                    password_: pm.password_,
                    mix_: ruleEntry.m_groupEntry.m_mix
                };
                let rv = verifyPasswordAgainstRuleRecursively(newPm);

                if (!rv) {
                    return false; // Break the loop if verification failed.
                }

                pm.password_ = newPm.password_;

                continue;
            } else {
                let cur_passwordlength = pm.password_.length;

                let min = ruleEntry.m_chsetEntry.m_rangeEntry.m_min;
                let max = ruleEntry.m_chsetEntry.m_rangeEntry.m_max;

                if (min === max && max === -1) {
                    min = max = 1;
                }
                if (max === -2) {
                    max = cur_passwordlength;
                }

                let countCharsFound = 0;
                let index = 0;

                for (; index < cur_passwordlength && index < max; index++) {
                    let pos = -1;

                    if (!pm.mix_) {
                        let currentCH = pm.password_[index];
                        pos = ruleEntry.m_chsetEntry.m_charset.indexOf(currentCH);
                    } else {
                        pos = strFindFirstOf(pm.password_, new Set(ruleEntry.m_chsetEntry.m_charset));
                        if (pos !== -1) {
                            pm.password_ = pm.password_.substring(0, pos) + pm.password_.substring(pos + 1);
                        }
                    }

                    if (pos !== -1) {
                        countCharsFound++;

                        // A small optimization: To stop loop if we found more characters than expected.
                        if (countCharsFound > max) {
                            break;
                        }
                    }

                    if (!pm.mix_ && pos === -1) {
                        break;
                    }
                }//for

                if (!pm.mix_ && index > 0) {
                    pm.password_ = pm.password_.substring(index);
                }

                // Check whether characters found for current character set is range: min, max.
                //
                if (countCharsFound < min || countCharsFound > max) {
                    return false;
                }
            }

        }

        return true;
    }

    function parseExtPattern2RulesSet(pattern_): advancedpswpolicy.ParseAdvPolicyResult | undefined {
        const rv = advancedpswpolicy.parse_advpolicy(pattern_);

        if (rv.error.m_errorType != advancedpswpolicy.ParseerrorType_t.errNone) {
            return;
        }

        //resolveRulesSetBounds(rv_rulesSet_);
    }

    ////////////////////////////////////////////////////////////////////////////
    function parseExtPolicy2RulesSet(policy_: password.policy_t): advancedpswpolicy.ParseAdvPolicyResult | undefined {
        let pattern_withMinMaxRange = `${policy_.policyExt}<${policy_.minLength}, ${policy_.maxLength}>`;

        return parseExtPattern2RulesSet(pattern_withMinMaxRange);
    }

    function verifyPasswordAgainstRuleNoThrow(rulesSet_: advancedpswpolicy.rulesSet_t, previousPassword_: string, password_: string, noduplicates_: boolean): boolean {

        if (!password_) // Password is invalid if empty.
        {
            return false;
        }

        // Check length of the password is within min, max bounds.
        let pswLen = password_.length;
        if (
            (rulesSet_.m_pswlenSet.m_min != 0 && rulesSet_.m_pswlenSet.m_min > pswLen) ||
            (rulesSet_.m_pswlenSet.m_max != 0 && rulesSet_.m_pswlenSet.m_max < pswLen)
        ) {
            return false;
        }

        // Check password has duplicates if specified.
        if (noduplicates_ && utils.hasDuplicateChars(password_)) {
            return false;
        }

        if (rulesSet_.m_checkPrevPasswordCharPosition && !!previousPassword_) {
            let maxLength = Math.min(previousPassword_.length, password_.length);
            for (let index = 0; index < maxLength; index++) {
                let isSameCharAtSamePosition = previousPassword_[index] === password_[index];
                if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
                {
                    return false;
                }
            }
        }

        if (rulesSet_.m_avoidConsecutiveChars) {
            let prevChar = '';
            for (let it = 0; it < password_.length; it++) {
                let isSameCharAsPreviousOne = prevChar === password_[it];
                if (isSameCharAsPreviousOne) // Current & previous character are repeated and hence invalid
                {
                    return false;
                }

                prevChar = password_[it];
            }
        }

        // Check password against custom rule.
        let pm: verifyPasswordAgainstRuleRecursivelyParams = {
            ruleEntries_: rulesSet_.m_ruleEntries,
            password_: password_,
            mix_: false
        };
        let rv = verifyPasswordAgainstRuleRecursively(pm);
        if (rv) {
            rv = !pm.password_; // No characters should be left in the password if verified completely.
        }

        return rv;
    }

    function sort_ascendingByCharSetLength(a: ChSetData, b: ChSetData): number {
        if (a.m_pChsetEntry.m_charset.length === b.m_pChsetEntry.m_charset.length) {
            return 0;
        }
        let isLowerCharSetLength = a.m_pChsetEntry.m_charset.length < b.m_pChsetEntry.m_charset.length;
        return isLowerCharSetLength ? -1 : 1;
    }

    /**/
    function generatePasswordByRuleNoThrow(rulesSet: advancedpswpolicy.rulesSet_t, noDuplicates: boolean, prevPassword: string): string {
        let rv_password = '';

        try {
            let pm: generateForChSetEntriesHolderRecursivelyParams = {
                chSetEntriesHolder_: new Map<ChSetEntry, ChSetData>(),
                chsetEntries_generated_: [],
                chsetEntries_togenerate_: [],
                pswLenGenerated_: 0, // totalLengthGenerated
                pswLenFixedCount_: 0, // minLengthToGenerate
            };

            generateForChSetEntriesHolderRecursively(rulesSet.m_ruleEntries, pm);

            // Sort ruleEntries whose max is undefined in ascending order of their character set length.
            pm.chsetEntries_togenerate_.sort(sort_ascendingByCharSetLength);

            let entriesCount = pm.chsetEntries_togenerate_.length;

            pm.chsetEntries_togenerate_.forEach(
                (chsetData, idx) => {

                    let maxAvbl = Math.floor((rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated_)
                        / (entriesCount > 0 ? entriesCount : 1));

                    if (chsetData.m_isgenerated) {
                        return; // Skip entries if already generated.
                    }

                    if (maxAvbl <= 0) { // No more extra characters available so set minimum length
                        chsetData.m_max = chsetData.m_min;
                    } else {
                        let isLastEntry = idx === pm.chsetEntries_togenerate_.length - 1;
                        if (isLastEntry) {
                            let moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

                            // We have rule entries for whom password has to be generated.
                            if (pm.pswLenGenerated_ < rulesSet.m_pswlenSet.m_min) {
                                moreLengthToGenerate = rulesSet.m_pswlenSet.m_min - pm.pswLenGenerated_;

                                let minimumLenToSatisfyRange = Math.max(moreLengthToGenerate, chsetData.m_min);
                                chsetData.m_min = Math.min(minimumLenToSatisfyRange, chsetData.m_pChsetEntry.m_charset.length);
                            }
                        }

                        chsetData.m_max = Math.max(chsetData.m_min, Math.min(maxAvbl, chsetData.m_pChsetEntry.m_charset.length));

                        if (isLastEntry && chsetData.m_max > rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated_) {
                            chsetData.m_max = rulesSet.m_pswlenSet.m_max - pm.pswLenGenerated_;
                        }
                    }

                    if (chsetData.generateLength()) {
                        pm.pswLenGenerated_ += chsetData.m_generatedLen;
                        entriesCount--;
                    }
                }
            );

            let excludeChars = '';
            if (rulesSet.m_checkPrevPasswordCharPosition) { // Check previous password character by character if requested
                excludeChars = prevPassword;
            }

            rv_password = generatePasswordByRuleRecursively(
                rulesSet.m_ruleEntries,
                pm.chSetEntriesHolder_,
                noDuplicates,
                rulesSet.m_avoidConsecutiveChars,
                excludeChars
            );

        } catch (e) {
            rv_password = '';
        }

        return rv_password;
    }
    
}//namespace customRule2
