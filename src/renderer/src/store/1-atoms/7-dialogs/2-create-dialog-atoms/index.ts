import { atom } from "jotai";
import { newManiCtx } from "@/components/4-dialogs/2-dlg-create-login/1-body/9-new-mani-ctx";

export const doOpenCreateDialogAtom = atom(false);

// Second page atoms

export const enum SecondPage {
    none,
    grab,
    define,
    manual,
}

export const doOpenCreateDialogSecondAtom = atom<SecondPage>(SecondPage.none);

// Drawer atoms

//export const doOpenDrawerAtom = atom(false);

const _doOpenDrawerAtom = atom(false);

export const doOpenDrawerAtom = atom(
    (get) => get(_doOpenDrawerAtom),
    (get, set, open: boolean) => {
        if (open) {
            set(newManiCtx.initAtom, {ctx: newManiCtx});
        }
        set(_doOpenDrawerAtom, open);
    }
);
