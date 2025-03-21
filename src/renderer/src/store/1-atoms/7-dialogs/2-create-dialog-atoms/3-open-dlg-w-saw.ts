import { atom } from "jotai";

const _isDlgOpenAtom = atom(false);

export const doOpenDlgNewManiSawAtom = atom(
    (get) => get(_isDlgOpenAtom),
    (get, set, open: boolean) => {
        if (open) {
            // do additional stuff
        }
        set(_isDlgOpenAtom, open);
    }
);
