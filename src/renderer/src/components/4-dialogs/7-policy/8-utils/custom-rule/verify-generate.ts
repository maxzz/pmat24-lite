import { advancedpswpolicy } from "./types";
import { utils } from "../utils";
import { a } from "@react-spring/web";
import { strFindFirstOf } from "../cpp-utils";

export namespace customRule2 {
    // using namespace advancedpswpolicy;

    // typedef std::vector<const chsetEntry_t*> undef_chsetEntries_t; // Pointer to undefined character set entries
    type undef_chsetEntries_t = advancedpswpolicy.chsetEntry_t[]; // Pointer to undefined character set entries

    type GetBoundsRecursivelyParams = {
        undefchSetEntries_: undef_chsetEntries_t, // undefined chSet entries
        min: number, // entries min total
        max: number, // entries max total
    };

    function getBoundsRecursively(rulesEntries_: advancedpswpolicy.ruleEntries_t, rv: GetBoundsRecursivelyParams): void {

        rulesEntries_.forEach(
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
                        rv.undefchSetEntries_.push(ruleEntry.m_chsetEntry);
                    }
                }
            }
        );
    }

    type checkRulesBoundsForGenerateResult = {
        minValid: boolean,
        maxValid: boolean,
    };

    export function checkRulesBoundsForGenerate(rulesSet_: advancedpswpolicy.rulesSet_t): checkRulesBoundsForGenerateResult {
        // Initialize return values with the assumption that the min and max values are valid.

        const rv: checkRulesBoundsForGenerateResult = {
            minValid: true,
            maxValid: true,
        };

        // 0. To get min and max bounds.
        var pm: GetBoundsRecursivelyParams = {
            undefchSetEntries_: [], // Rule entries without any max bound value.
            min: 0,
            max: 0,
        };

        getBoundsRecursively(rulesSet_.m_ruleEntries, pm);

        if (pm.min < rulesSet_.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.

            let maxCharactersAvailable = pm.min;

            pm.undefchSetEntries_.forEach(
                (currentChEntry) => {
                    maxCharactersAvailable += currentChEntry.m_charset.length;
                }
            );

            rv.minValid = maxCharactersAvailable > rulesSet_.m_pswlenSet.m_min;
        } else if (pm.min > rulesSet_.m_pswlenSet.m_max) {
            rv.minValid = false;
        }

        if (pm.max < rulesSet_.m_pswlenSet.m_min) {
            // Determine whether there are any Rule entries without max value to accommodate missing places.

            let maxCharactersAvailable = pm.max;

            pm.undefchSetEntries_.forEach(
                (currentChEntry) => {
                    maxCharactersAvailable += currentChEntry.m_charset.length;
                }
            );

            rv.maxValid = maxCharactersAvailable > rulesSet_.m_pswlenSet.m_min;

        } else if (pm.max > rulesSet_.m_pswlenSet.m_max) {
            rv.maxValid = false;
        }

        return rv;
    }

    class chsetData_t {
        //const chsetEntry_t* m_pChsetEntry = nullptr;
        m_pChsetEntry: advancedpswpolicy.chsetEntry_t;

        m_isgenerated = false;
        m_min = -1;
        m_max = -1;
        m_generatedLen = -1;

        // chsetData_t() {}
        // chsetData_t(const chsetEntry_t* pChsetEntry_, int min_, int max_)
        //     : m_pChsetEntry(pChsetEntry_), m_min(min_), m_max(max_) {}

        constructor(pChsetEntry_: advancedpswpolicy.chsetEntry_t, min_: number, max_: number) {
            this.m_pChsetEntry = pChsetEntry_;
            this.m_min = min_;
            this.m_max = max_;
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

        generateValue(excludeChars_: string): string  // To generate unique values
        {
            if (!this.m_pChsetEntry) {
                throw new Error("chsetEntry_t is null.");
            }

            if (this.m_generatedLen <= 0) {
                throw new Error("Invalid length.");
            }

            let generatedValue = '';
            utils.genSubSet(this.m_pChsetEntry.m_charset, excludeChars_, this.m_generatedLen, generatedValue);

            return generatedValue;
        }
    };

    /** /
    typedef std::map<const chsetEntry_t*, chsetData_t*> chsetEntriesHolder_t;
    typedef std::list<chsetData_t> chsetEntries_t;
    /**/
    type chsetEntriesHolder_t = Map<advancedpswpolicy.chsetEntry_t, chsetData_t>;
    type chsetEntries_t = chsetData_t[];

    function findCharsetEntryHolder(
        wchar_: string,
        chSetEntriesHolder_: chsetEntriesHolder_t,
        ruleEntries_: advancedpswpolicy.ruleEntries_t,
    ): chsetData_t | undefined {
        let itchsetEntry_: chsetData_t | undefined;

        // Find which character set the current character belongs.
        for (const curRuleEntry of ruleEntries_) {

            if (curRuleEntry.m_isgroup) {
                itchsetEntry_ = findCharsetEntryHolder(wchar_, chSetEntriesHolder_, curRuleEntry.m_groupEntry.m_ruleEntries);
            }

            if (curRuleEntry.m_chsetEntry.m_charset.indexOf(wchar_) === -1) {
                // Skip current character set entry if character is not found.
                continue;
            }

            // Find corresponding entry in the character set entries holder.
            itchsetEntry_ = chSetEntriesHolder_.get(curRuleEntry.m_chsetEntry);
            break;
        }

        return itchsetEntry_;
    }

    function generatePasswordByRuleRecursively(
        ruleEntries_: advancedpswpolicy.ruleEntries_t,
        chSetEntriesHolder_: chsetEntriesHolder_t,
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
                            let itchsetEntry = findCharsetEntryHolder(curCh, chSetEntriesHolder_, ruleEntry.m_groupEntry.m_ruleEntries);

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
        chSetEntriesHolder_: chsetEntriesHolder_t,
        chsetEntries_generated_: chsetEntries_t,
        chsetEntries_togenerate_: chsetEntries_t,
        pswLenGenerated_: number,
        pswLenFixedCount_: number,
    };

    function generateForChSetEntriesHolderRecursively(
        ruleEntries_: advancedpswpolicy.ruleEntries_t,
        pm: generateForChSetEntriesHolderRecursivelyParams): void {
        // 0. To generate password (only for one's with known range: min, max) as per custom rule specified.

        ruleEntries_.forEach((ruleEntry) => {

            if (ruleEntry.m_isgroup) {
                generateForChSetEntriesHolderRecursively(ruleEntry.m_groupEntry.m_ruleEntries, pm);
            } else {
                let chsetData = new chsetData_t(
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
        ruleEntries_: advancedpswpolicy.ruleEntries_t,
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

    /** / not yet
    inline void parseExtPattern2RulesSet(__in const string_t& pattern_, __out rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_)
    {
        rv_rulesSet_.m_ruleEntries.clear();

        parse_advpolicy(pattern_, rv_rulesSet_, rv_parseError_);
    	
        if (rv_parseError_.m_errorType != rv_parseError_.errNone)
        {
            return;
        }

        //resolveRulesSetBounds(rv_rulesSet_);
    }
    /**/

    /** / not yet
    ////////////////////////////////////////////////////////////////////////////
    inline void parseExtPolicy2RulesSet(__in const password::policy_t& policy_, __out rulesSet_t& rv_rulesSet_, __out parseError& rv_parseError_)
    {
        string_t pattern_withMinMaxRange = policy_.GetExtendedPolicyStr() + sformat("<%d, %d>", policy_.GetMinLength(), policy_.GetMaxLength());

        parseExtPattern2RulesSet(pattern_withMinMaxRange, rv_rulesSet_, rv_parseError_);
    }
    /**/

    /** / not yet
    inline bool verifyPasswordAgainstRuleNoThrow(__in const rulesSet_t& rulesSet_, __in const wstring_t& previousPassword_, __in const wstring_t& password_, __in bool noduplicates_) throw()
    {
        // Password is invalid if empty.
        if (password_.empty())
        {
            return false;
        }

        // Check length of the password is within min, max bounds.
        int pswLen = size2int(password_.length());
        if ((rulesSet_.m_pswlenSet.m_min != 0 && rulesSet_.m_pswlenSet.m_min > pswLen) || (rulesSet_.m_pswlenSet.m_max != 0 && rulesSet_.m_pswlenSet.m_max < pswLen))
        {
            return false;
        }

        // Check password has duplicates if specified.
        if (noduplicates_ && password::utils::hasDuplicateChars(password_))
        {
            return false;
        }

        if (rulesSet_.m_checkPrevPasswordCharPosition && 
            !previousPassword_.empty())
        {
            wstring_t::size_type maxLength = min(previousPassword_.length(), password_.length());
            for (wstring_t::size_type index = 0; index < maxLength; index++)
            {
                bool isSameCharAtSamePosition = previousPassword_[index] == password_[index];
                if (isSameCharAtSamePosition) // Current & previous password have same character at the same position
                {
                    return false;
                }
            } // for
        }

        if (rulesSet_.m_avoidConsecutiveChars)
        {
            wchar_t prevChar = '\0';
            for (wstring_t::const_iterator it = password_.begin(); it != password_.end(); ++it)
            {
                bool isSameCharAsPreviousOne = (prevChar == *it);
                if (isSameCharAsPreviousOne) // Current & previous character are repeated and hence invalid
                {
                    return false;
                }

                prevChar = *it;
            } // for
        }

        // Check password against custom rule.
        wstring_t password = password_;
        bool rv = verifyPasswordAgainstRuleRecursively(rulesSet_.m_ruleEntries, password, false);
        if (rv)
        {
            rv = password.length() == 0; // No characters should be left in the password if verified completely.
        }

        return rv;
    }
    /**/

    /** / not yet
    inline bool sort_ascendingByCharSetLength(const chsetData_t& first, const chsetData_t& second)
    {
        bool isLowerCharSetLength = first.m_pChsetEntry->m_charset.length() < second.m_pChsetEntry->m_charset.length();
        return isLowerCharSetLength ? true : false;
    }
    /**/

    /** / not yet
    inline void generatePasswordByRuleNoThrow(__in const rulesSet_t& rulesSet_, __in bool noduplicates_, __in const wstring_t& prevPassword_, __out wstring_t& rv_password_) throw()
    {
        rv_password_.clear();

        try
        {
            chsetEntriesHolder_t chsetEntriesHolder;
            chsetEntries_t chsetEntries_generated;
            chsetEntries_t chsetEntries_togenerate;

            int totalLengthGenerated = 0;
            int minLengthToGenerate = 0;

            generateForChSetEntriesHolderRecursively(rulesSet_.m_ruleEntries, chsetEntriesHolder, chsetEntries_generated, chsetEntries_togenerate, totalLengthGenerated, minLengthToGenerate);

            // Sort ruleEntries whose max is undefined 
            // in ascending order of their character set length.
            //
            chsetEntries_togenerate.sort(sort_ascendingByCharSetLength);

            size_t entriesCount = chsetEntries_togenerate.size();
            if (entriesCount > 0)
            {	
                for (chsetEntries_t::iterator it = chsetEntries_togenerate.begin(); it != chsetEntries_togenerate.end(); ++it)
                {
                    size_t maxAvbl = (size_t)floor((double)(rulesSet_.m_pswlenSet.m_max - totalLengthGenerated) / (double) (entriesCount > 0 ? entriesCount : 1) );

                    chsetData_t& chsetData = (*it);

                    if (chsetData.m_isgenerated) 
                    {
                        // Skip entries if already generated.

                        continue;
                    }

                    if (maxAvbl <= 0) // No more extra characters available so set minimum length
                    {
                        chsetData.m_max = chsetData.m_min;
                    }
                    else
                    {
                        int isLastEntry = std::distance(it, chsetEntries_togenerate.end()) == 1;
                        if (isLastEntry)
                        {
                            size_t moreLengthToGenerate = 0; // Minimum more characters to satisfy the minimum length requirement.

                            // We have rule entries for whom password has to be generated.
                            //
                            if (totalLengthGenerated < rulesSet_.m_pswlenSet.m_min)
                            {
                                moreLengthToGenerate = rulesSet_.m_pswlenSet.m_min - totalLengthGenerated;
                                size_t minimumLenToSatisfyRange = max(moreLengthToGenerate, chsetData.m_min);
                                chsetData.m_min = min(minimumLenToSatisfyRange, chsetData.m_pChsetEntry->m_charset.length());
                            }
                        }

                        chsetData.m_max = max(chsetData.m_min, min(size_t(maxAvbl), chsetData.m_pChsetEntry->m_charset.length()));

                        if (isLastEntry && chsetData.m_max > size_t(rulesSet_.m_pswlenSet.m_max - totalLengthGenerated))
                        {
                            chsetData.m_max = rulesSet_.m_pswlenSet.m_max - totalLengthGenerated;
                        }
                    }

                    if (chsetData.generateLength())
                    {
                        totalLengthGenerated += (int)chsetData.m_generatedLen;

                        entriesCount--; 
                    }
                } // for
            }

            wstring_t excludeChars;
            if (rulesSet_.m_checkPrevPasswordCharPosition) // Check previous password character by character if requested
            {
                excludeChars = prevPassword_;
            }

            generatePasswordByRuleRecursively(rulesSet_.m_ruleEntries, chsetEntriesHolder, noduplicates_, rulesSet_.m_avoidConsecutiveChars, excludeChars, rv_password_);

        }
        catch(...)
        {
            rv_password_.clear();
        }

    }
    /**/

}//namespace customRule2
