import { atom } from "jotai";

// Open Saw monitor overlay atom

const _doOpenSawOverlayAtom = atom(false);

export const isOpenSawOverlayAtom = atom(
    (get) => get(_doOpenSawOverlayAtom)
);

export const doOpenSawOverlayAtom = atom(
    null,
    (get, set, open: boolean) => {
        if (open) {
            ;
        }
        set(_doOpenSawOverlayAtom, open);
    }
);
