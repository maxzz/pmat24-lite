import { atom } from "jotai";

// Second page atoms

export const enum SecondPage {
    none,
    grab,
    define,
    manual,
}

export const doOpenCreateDialogSecondAtom = atom<SecondPage>(SecondPage.none);
