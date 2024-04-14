import { atom } from "jotai";

export const doOpenCreateDialogAtom = atom(false);

// Second page atoms

export const enum SecondPage {
    none,
    grab,
    define,
    manual,
}

export const doOpenCreateDialogSecondAtom = atom<SecondPage>(SecondPage.none);
