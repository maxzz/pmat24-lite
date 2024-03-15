import { atom } from "jotai";

// Filters state

export const showManiAtoms = {
    normalAtom: atom(true),
    manualAtom: atom(true),
    emptyAtom: atom(true),
};

export const totalManiAtoms = {
    manualAtom: atom(0),
    normalAtom: atom(0),
    emptyAtom: atom(0),
};
