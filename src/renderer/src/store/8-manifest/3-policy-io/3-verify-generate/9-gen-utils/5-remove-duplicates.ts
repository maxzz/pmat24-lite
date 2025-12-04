import { strFindFirstOf } from "./9-utils-cpp";
import { genPswPartByChars } from "./3-gen-part-by-chars";
import * as Sets from "./1-char-sets";

export function removeDuplicateChars(psw: string): string {
    // 0. To idenitfy and replace any duplicate character with its corresponding unused set.
    // i.e. Any duplicate of letter will be replaced with its corresponding unused set of letters.
    // Similary digits and symbols will be replaced with its corresponding unused 
    // set of digits and symbols respectively.
    // 0. Fiter out duplication of characters and generate new one from the same character type set.
    let rv_psw = psw;

    // 1. Set include character set i.e. Alpha upper/lower or digit or special.
    let includeSet = '';

    if (strFindFirstOf(rv_psw, Sets.setSET_AlphaLower) !== -1) {
        includeSet += Sets.SET_AlphaLower;
    }

    if (strFindFirstOf(rv_psw, Sets.setSET_AlphaUpper) !== -1) {
        includeSet += Sets.SET_AlphaUpper;
    }

    if (strFindFirstOf(rv_psw, Sets.setSET_Numeric) !== -1) {
        includeSet += Sets.SET_Numeric;
    }

    if (strFindFirstOf(rv_psw, Sets.setSET_Special) !== -1) {
        includeSet += Sets.SET_Special;
    }

    // 2. Cache all characters and their indexes.
    let excludeSet: string = '';
    let charIndexes = new Map<string, number[]>();

    const arr1 = Array.from(psw);
    arr1.forEach(
        (currentChar, idx) => {
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
        }
    );

    // 2. Identify characters with duplicates and re-generate new character of the same type excluding 
    // previously used characters of the same type.
    Object.entries(charIndexes).forEach(
        ([_, indices]: [any, number[]]) => {
            // 2.1 More than 1 index mean we have duplicates.
            if (indices.length === 1) {
                return;
            }

            // 2.3 Generate new character for each occurence of character excluding the generated one.
            // NOTE: Skip the first entry as it is the first occurence.
            indices.forEach(
                (currentIndex) => {
                    let value = genPswPartByChars(includeSet, excludeSet, 1);
                    let newChar = value[0];

                    rv_psw = rv_psw.substring(0, currentIndex) + newChar + rv_psw.substring(currentIndex + 1);

                    excludeSet += newChar; // Add current character to exclude range.
                }
            );
        }
    );

    return rv_psw;
}
