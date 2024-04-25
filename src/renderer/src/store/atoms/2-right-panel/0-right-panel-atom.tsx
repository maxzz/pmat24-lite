import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtomType | null | undefined>(null);

export const rightPanelSelectedContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);

export const doSetRightPanelSelectedAtom = atom(null, // tree selection logic
    (get, set, arg: FileUsAtomType) => {
        const current = get(rightPanelAtom);

        if (!arg) {
            return;
        }

        if (current === arg) {
            set(rightPanelAtom, null);
            return;
        }

        set(rightPanelAtom, arg);
    }
);
