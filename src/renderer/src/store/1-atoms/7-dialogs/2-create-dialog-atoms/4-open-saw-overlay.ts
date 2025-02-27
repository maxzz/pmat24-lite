import { atom } from "jotai";

// Open Saw monitor overlay atom

export const doOpenSawOverlayAtom = atom(
    (get) => get(_doOpenSawOverlayAtom),
    (get, set, open: boolean | ((prev: boolean) => boolean)) => {
        const valueOpen = typeof open === 'function' ? open(get(_doOpenSawOverlayAtom)) : open;
        if (valueOpen) {
            ;
        }
        set(_doOpenSawOverlayAtom, valueOpen);
    }
);

const _doOpenSawOverlayAtom = atom(false);
