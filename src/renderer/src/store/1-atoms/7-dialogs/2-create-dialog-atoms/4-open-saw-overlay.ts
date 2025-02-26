import { atom } from "jotai";

// Open Saw monitor overlay atom

export const doOpenSawOverlayAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
    (get, set, open: boolean) => {
        if (open) {
            ;
        }
        set(_doOpenSawOverlayAtom, open);
    }
);

const _doOpenSawOverlayAtom = atom(false);
