import { atom } from "jotai";

export const createDialogOpenAtom = atom(false);

// Second page atoms

const enum SecondPage {
    none,
    grab,
    define,
    manual,
}

export const createDialogSecondOpenAtom = atom<SecondPage>(SecondPage.none);
