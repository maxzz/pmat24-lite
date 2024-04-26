import { atom } from "jotai";
import { FileUsAtomType } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtomType | null | undefined>(null);

export type RightPanelAtomType = typeof rightPanelAtom;
export type RightPanelContentAtomType = typeof rightPanelSelectedContentAtom;
// export type RightPanelAtomAtomType = typeof rightPanelSelectedAtomAtom;

export const rightPanelSelectedContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);

export const rightPanelSelectedAtomAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        if (!selectedAtom) {
            throw new Error('No selected atom');
        }
        return selectedAtom;
    },
);

export const doSetRightPanelSelectedAtom = atom(null, // tree selection logic
    (get, set, newAtom: FileUsAtomType) => {
        const current = get(rightPanelAtom);

        if (!newAtom) {
            return;
        }

        if (current === newAtom) {
            set(rightPanelAtom, null);
            return;
        }

        set(rightPanelAtom, newAtom);
    }
);
