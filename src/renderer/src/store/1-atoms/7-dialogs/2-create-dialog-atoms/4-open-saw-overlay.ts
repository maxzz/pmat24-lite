import { atom } from "jotai";
import { rightPanelAtom, type FileUsAtom } from "@/store";
import { newManiContent } from "@/components/4-dialogs";

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

export const doOpenSawOverlayForCpassAtom = atom(
    null,
    (get, set) => {
        const mainForCpassAtom = get(rightPanelAtom);
        if (!mainForCpassAtom) {
            console.log('There is no mainForCpassAtom for password change form');
            return;
        }
        newManiContent.mainForCpassAtom = mainForCpassAtom;
        set(doOpenSawOverlayAtom, true);
    }
);
