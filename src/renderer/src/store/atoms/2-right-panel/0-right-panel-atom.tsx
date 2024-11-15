import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtom | null | undefined>(null);

export const rightPanelContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);

export const doSetRightPanelSelectedAtom = atom(null, // tree selection trigger logic
    (get, set, newAtom: FileUsAtom | null | undefined) => {
        const currentAtom = get(rightPanelAtom);

        if (currentAtom === newAtom) {
            set(rightPanelAtom, null);
            return;
        }

        set(rightPanelAtom, newAtom);
    }
);
