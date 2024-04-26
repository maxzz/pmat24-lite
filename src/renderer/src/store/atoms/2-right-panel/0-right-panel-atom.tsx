import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtom | null | undefined>(null);

export const rightPanelContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);

export const doSetRightPanelSelectedAtom = atom(null, // tree selection logic
    (get, set, newAtom: FileUsAtom) => {
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
