import { isCharNumber } from "./9-utils-cpp";

export function hasAdjacentDigits(psw: string): boolean {
    // 0. To validate whether the password has any adjacentdigits. Used for verification purpose.
    let isPrevDigit = false;

    for (const curCh of psw) {
        const isCurrDigit = isCharNumber(curCh);

        if (isCurrDigit && isPrevDigit) {
            return true;
        }

        isPrevDigit = isCurrDigit;
    }

    return false;
}

export function hasDuplicateChars(psw: string): boolean {
    // 0. To validate whether password has any duplicate characters: letters or digits or symbols
    const set = new Set<string>(psw);
    return set.size !== psw.length;
}
