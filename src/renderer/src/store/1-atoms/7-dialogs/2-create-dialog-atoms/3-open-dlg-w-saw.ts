import { atom } from "jotai";
import { newManiContent } from "@/store";

const _isDlgOpenAtom = atom(false);

export const doOpenDlgNewManiSawAtom = atom(
    (get) => get(_isDlgOpenAtom),
    (get, set, open: boolean) => {
        if (open) {
            if (newManiContent.maniForCpassAtom) {
                return;
            }
        }
        set(_isDlgOpenAtom, open);
    }
);
