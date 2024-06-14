import * as charSets from "./1-char-sets";
import * as randonValues from "./2-random-values";
import * as rest from "./8-utils";
import * as removeDuplicateChars from "./3-remove-duplicates";


export const genUtils = {
    ...charSets,
    ...randonValues,
    ...removeDuplicateChars,
    ...rest,
};

export * from "./9-utils-cpp";
