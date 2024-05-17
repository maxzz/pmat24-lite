export namespace utils {

    export const SET_AlphaLower = "abcdefghikjlmnopqrstuvwxyz";
    export const SET_AlphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    export const SET_AlphaBoth = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz";
    export const SET_Numeric = "0123456789";
    export const SET_Special = "!\"#$%&'()*+,-./:;<=>?[\\]^_`{|}~@";
    export const SET_AlphaNumeric = SET_AlphaBoth + SET_Numeric;
    export const SET_AlphaNumericSpecial = SET_AlphaNumeric + SET_Special;

    export const setSET_AlphaLower = new Set(SET_AlphaLower);
    export const setSET_AlphaUpper = new Set(SET_AlphaUpper);
    export const setSET_AlphaBoth = new Set(SET_AlphaBoth);
    export const setSET_Numeric = new Set(SET_Numeric);
    export const setSET_Special = new Set(SET_Special);
    export const setSET_AlphaNumeric = new Set(SET_AlphaNumeric);
    export const setSET_AlphaNumericSpecial = new Set(SET_AlphaNumericSpecial);

    export function strFindFirstOf(str: string, ch: Set<string>): number {
        for (let i = 0; i < str.length; ++i) {
            if (ch.has(str[i])) {
                return i;
            }
        }
        return -1;
    }

    export function strFindFirstNotOf(str: string, ch: Set<string>): number {
        for (let i = 0; i < str.length; ++i) {
            if (!ch.has(str[i])) {
                return i;
            }
        }
        return -1;
    }

    function getRandomIntInclusive(min: number, max: number): number {
        // Keep it simple so far it used to get passowd length only.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
    }

    export function getRandomInRange(min_: number, max_: number): number {
        // 0. Generate a number in range min and max.

        if (min_ > max_) {
            throw new Error("inv.r.bounds");
        }

        return getRandomIntInclusive(min_, max_);

        /*
        // TODO: Random device is slow and expensive to create so
        // we should avoid calling multiple times.
        std::random_device rd;
        std::mt19937 mt(rd()); // mersenne twister engine.

        std::uniform_int_distribution<size_t> dist(min_, max_);
        size_t rv = dist(mt);

        //size_t rv = min_ + getRandom(max_ - min_);
        return rv;
        */
    }

    export function genSubSet(buildFromChars_: string, excludeChars_: string, pswLength_: number, rv_psw_: string) {
        if (pswLength_ <= 0) {
            throw new Error("inv.arg.length");
        }

        let combinedSubsetIn = new Set(buildFromChars_);
        for (const c of excludeChars_) {
            combinedSubsetIn.delete(c);
        }
        let combinedSubset = Array.from(combinedSubsetIn).join('');

        if (!combinedSubset) {
            throw new Error("empty.comb.set");
        }

        var buf = new Uint8Array(pswLength_ + 1);
        crypto.getRandomValues(buf);

        let resBuffer = [...buf];

        const newPswPart = resBuffer.map((v) => {
            return combinedSubset[v % combinedSubset.length];
        }).join('');

        rv_psw_ += newPswPart;
    }

    export function genAlphaNumeric(pswLength_: number): string {
        //return genPswBySet(SET_AlphaNumeric, pswLength_);

        //string_t alphaL; genPswBySet(SET_AlphaLower, pswLength_, alphaL);
        //string_t alphaU; genPswBySet(SET_AlphaUpper, pswLength_, alphaU);
        //string_t numeric; genPswBySet(SET_Numeric, pswLength_, numeric);

        let alphaL: string = ''; genSubSet(SET_AlphaLower, '', pswLength_, alphaL);
        let alphaU: string = ''; genSubSet(SET_AlphaUpper, '', pswLength_, alphaU);
        let numeric: string = ''; genSubSet(SET_Numeric, '', pswLength_, numeric);

        let rv_psw: string = '';

        // Do until we have password containing all character sets to be used.
        // NOTE: If length <= 2 then we cannot ensure so we ensure: lower/upper + numeric.
        let newSubSet = alphaL + alphaU + numeric;

        let doAgain = true;
        do {

            rv_psw = '';
            genSubSet(newSubSet, '', pswLength_, rv_psw);

            // Check whether we should iterate again to generate an acceptable mix of value.
            if (pswLength_ > 2) {
                // Should have all mix: numeric, lower and upper alphabet.
                doAgain =
                    strFindFirstOf(rv_psw, setSET_Numeric) === -1 ||
                    strFindFirstOf(rv_psw, setSET_AlphaLower) === -1 ||
                    strFindFirstOf(rv_psw, setSET_AlphaUpper) === -1;
            } else if (pswLength_ == 2) {
                // Should have atleast: numeric and lower/upper alphabet.
                doAgain =
                    strFindFirstOf(rv_psw, setSET_Numeric) === -1 || (
                        strFindFirstOf(rv_psw, setSET_AlphaLower) === -1 &&
                        strFindFirstOf(rv_psw, setSET_AlphaUpper) === -1
                    );
            } else {
                // Should have atleast: numeric or lower or upper alphabet.
                doAgain =
                    strFindFirstOf(rv_psw, setSET_Numeric) === -1 &&
                    strFindFirstOf(rv_psw, setSET_AlphaLower) === -1 &&
                    strFindFirstOf(rv_psw, setSET_AlphaUpper) === -1;
            }

        } while (doAgain);

        return rv_psw;
    }

    export function genAlpha(pswLength_: number): string {
        let rv_psw: string = '';
        genSubSet(SET_AlphaBoth, '', pswLength_, rv_psw);
        return rv_psw;
    }

    export function genNumeric(pswLength_: number): string {
        let rv_psw: string = '';
        genSubSet(SET_Numeric, '', pswLength_, rv_psw);
        return rv_psw;
    }

    export function genSpecial(pswLength_: number): string {
        let rv_psw: string = '';
        genSubSet(SET_Special, '', pswLength_, rv_psw); // changed this from SET_AlphaNumericSpecial to SET_Special - mw 11/22/2004 6:24:10 PM
        return rv_psw;
    }


    export function randomizeCharsInString(v_: string): string {
        // 0. Randomize password string within its length.

        if (!v_) {
            return '';
        }

        var buf = new Uint8Array(v_.length + 1);
        crypto.getRandomValues(buf);

        let resBuffer = [...buf];

        let arr = v_.split('');

        var ii = 0;

        arr.forEach(
            (current, i) => {
                let index = resBuffer[ii++] % v_.length;

                let temp = arr[index];
                arr[index] = current;
                arr[i] = temp;
            }
        );

        let rv = arr.join('');
        return rv;
    }

    export function genAlphaNumSpecial(pswLength_: number): string {
        // 0. The goal is to generate password containing alpha, number and special.
        // Characters from each set should exist. Otherwise, atleast 1 from each set 
        // should exist (i.e. alpha, numeric and symbol).

        // 1. Determine length of each character set to generate.
        //
        // To ensure we have atleast: 1 upper, 1 lower and 1 number.
        let specialLen = (pswLength_ > 3) ? getRandomInRange(1, pswLength_ - 3) : 1;
        let alphaNumericLen = pswLength_ - specialLen;

        // 2. Generate characters by upper boundary.
        let rv_psw = '';

        if (alphaNumericLen > 0) {
            rv_psw += genAlphaNumeric(alphaNumericLen);
        }

        if (specialLen > 0) {
            rv_psw += genSpecial(specialLen);
        }

        // 3. Randomize characters in place.
        randomizeCharsInString(rv_psw);

        // genPswBySet(SET_AlphaNumericSpecial, pswLength_, rv_psw);
        return rv_psw;
    }

    /////////////////////////////////////////////////////////////////////

    function isCharNumber(c) {
        return c >= '0' && c <= '9';
    }

    export function hasAdjacentDigits(psw_: string): boolean {
        // 0. To validate whether the password has any adjacentdigits. Used for verification purpose.

        let isPrevDigit = false;

        for (const currentChar of psw_) {
            let isCurrDigit = isCharNumber(currentChar);

            if (isCurrDigit && isPrevDigit) {
                return true;
            }

            isPrevDigit = isCurrDigit;
        }

        return false;
    }

    export function hasDuplicateChars(psw_: string): boolean {
        // 0. To validate whether password has any duplicate characters: letters or digits or symbols.

        let charCount = new Set<string>(psw_);
        return charCount.size !== psw_.length;
    }

    /////////////////////////////////////////////////////////////////////

    export function removeDuplicateChars(psw_: string): string
    {
        // 0. To idenitfy and replace any duplicate character with its corresponding unused set.
        // i.e. Any duplicate of letter will be replaced with its corresponding unused set of letters.
        // Similary digits and symbols will be replaced with its corresponding unused 
        // set of digits and symbols respectively.

        // 0. Fiter out duplication of characters and generate new one from the same character type set.

        let rv_psw = psw_;

        // 1. Set include character set i.e. Alpha upper/lower or digit or special.

        let includeSet = '';

        if (strFindFirstOf(rv_psw, setSET_AlphaLower) !== -1)
        {
            includeSet += SET_AlphaLower;
        }

        if (strFindFirstOf(rv_psw, setSET_AlphaUpper) !== -1)
        {
            includeSet += SET_AlphaUpper;
        }

        if (strFindFirstOf(rv_psw, setSET_Numeric) !== -1)
        {
            includeSet += SET_Numeric;
        }

        if (strFindFirstOf(rv_psw, setSET_Special) !== -1)
        {
            includeSet += SET_Special;
        }

        // 2. Cache all characters and their indexes.

        let excludeSet: string = '';
        let charIndexes = new Map<string, number[]>();

        const arr1 = Array.from(psw_);
        arr1.forEach((currentChar, idx) => {
            excludeSet += currentChar; // Add the current one to excluded set. It may contain duplicates but it does not matter.

            let thisArr = charIndexes.get(currentChar);
            if (!thisArr) {
                charIndexes.set(currentChar, []);
                thisArr = charIndexes.get(currentChar)!;
            }
            thisArr.push(idx);

            let pos = includeSet.indexOf(currentChar);
            if (pos !== -1) {
                includeSet = includeSet.substring(0, pos) + includeSet.substring(pos + 1);
            }
        });

        // 2. Identify characters with duplicates and re-generate new character of the same type excluding 
        // previously used characters of the same type.

        Object.entries(charIndexes).forEach(([_, indices]) => {
            // 2.1 More than 1 index mean we have duplicates.

            if (indices.length === 1) {
                return;
            }

            // 2.3 Generate new character for each occurence of character excluding the generated one.
            // NOTE: Skip the first entry as it is the first occurence.

            indices.forEach((currentIndex) => {
                let value = '';
                genSubSet(includeSet, excludeSet, 1, value);
                let newChar = value[0];

                rv_psw = rv_psw.substring(0, currentIndex) + newChar + rv_psw.substring(currentIndex + 1);

                excludeSet += newChar; // Add current character to exclude range.
            })
        });

        return rv_psw;
    }

    /////////////////////////////////////////////////////////////////////

}
