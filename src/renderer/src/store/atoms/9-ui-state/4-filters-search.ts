import { atom } from "jotai";

// Filters search data

export const searchFilterData = {
    textAtom: atom(''),                 // search text
    caseSensitiveAtom: atom(false),     // search case sensitive
};
