import { atom } from "jotai";

// Filters search data

export const searchFilterData = {
    textAtom: atom(''),
    caseSensitiveAtom: atom(false), // search case sensitive
};
