import * as Sets from "./1-char-sets";
import { getRandomInRange } from "./2-random-values";
import { strFindFirstOf } from "./9-utils-cpp";
import { genPswPartByChars } from "./3-gen-part-by-chars";
import { randomizeCharsInString } from "./4-randomize-chars";

export function genAlpha(pswLength: number): string {
    let rv_psw = genPswPartByChars(Sets.SET_AlphaBoth, '', pswLength);
    return rv_psw;
}

export function genNumeric(pswLength: number): string {
    let rv_psw = genPswPartByChars(Sets.SET_Numeric, '', pswLength);
    return rv_psw;
}

export function genSpecial(pswLength: number): string {
    let rv_psw = genPswPartByChars(Sets.SET_Special, '', pswLength); // changed this from SET_AlphaNumericSpecial to SET_Special - mw 11/22/2004 6:24:10 PM
    return rv_psw;
}

export function genAlphaNumeric(pswLength: number): string {
    let rv_psw = '';

    const alphaL: string = genPswPartByChars(Sets.SET_AlphaLower, '', pswLength);
    const alphaU: string = genPswPartByChars(Sets.SET_AlphaUpper, '', pswLength);
    const numeric: string = genPswPartByChars(Sets.SET_Numeric, '', pswLength);
    const newSubSet = alphaL + alphaU + numeric;

    // Do until we have password containing all character sets to be used.
    // NOTE: If length <= 2 then we cannot ensure so we ensure: lower/upper + numeric.
    let doAgain = true;
    do {
        rv_psw = genPswPartByChars(newSubSet, '', pswLength);

        // Check whether we should iterate again to generate an acceptable mix of value.
        if (pswLength > 2) {
            doAgain = // Should have all mix: numeric, lower and upper alphabet.
                strFindFirstOf(rv_psw, Sets.setSET_Numeric) === -1 ||
                strFindFirstOf(rv_psw, Sets.setSET_AlphaLower) === -1 ||
                strFindFirstOf(rv_psw, Sets.setSET_AlphaUpper) === -1;
        } else if (pswLength === 2) {
            doAgain = // Should have atleast: numeric and lower/upper alphabet.
                strFindFirstOf(rv_psw, Sets.setSET_Numeric) === -1 || (
                    strFindFirstOf(rv_psw, Sets.setSET_AlphaLower) === -1 &&
                    strFindFirstOf(rv_psw, Sets.setSET_AlphaUpper) === -1
                );
        } else {
            doAgain = // Should have atleast: numeric or lower or upper alphabet.
                strFindFirstOf(rv_psw, Sets.setSET_Numeric) === -1 &&
                strFindFirstOf(rv_psw, Sets.setSET_AlphaLower) === -1 &&
                strFindFirstOf(rv_psw, Sets.setSET_AlphaUpper) === -1;
        }
    } while (doAgain);

    return rv_psw;
}

export function genAlphaNumSpecial(pswLength: number): string {
    // 0. The goal is to generate password containing alpha, number and special.
    // Characters from each set should exist. Otherwise, atleast 1 from each set 
    // should exist (i.e. alpha, numeric and symbol).

    // 1. Determine length of each character set to generate.
    //
    // To ensure we have atleast: 1 upper, 1 lower and 1 number.
    const specialLen = pswLength > 3 ? getRandomInRange(1, pswLength - 3) : 1;
    const alphaNumericLen = pswLength - specialLen;

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

    // genPswBySet(Sets.SET_AlphaNumericSpecial, pswLength_, rv_psw);
    return rv_psw;
}
