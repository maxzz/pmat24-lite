import * as charSets from "./1-char-sets";
import * as randonValues from "./2-random-values";
import * as rest from "./8-utils";
import * as removeDuplicateChars from "./3-remove-duplicates";
import * as genPswPartByChars from "./genPswPartByChars";
import * as randomizeCharsInString from "./randomizeCharsInString";
import * as hasAdjacentDigits from "./hasAdjacentDigits";

export const genUtils = {
    ...charSets,
    ...randonValues,
    ...removeDuplicateChars,
    ...genPswPartByChars,
    ...randomizeCharsInString,
    ...hasAdjacentDigits,
    ...rest,
};

export * from "./9-utils-cpp";
