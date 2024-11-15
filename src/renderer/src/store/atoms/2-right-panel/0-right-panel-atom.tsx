import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const rightPanelContentAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : null;
    },
);

export const doSetRightPanelSelectedAtom = atom(null, // tree selection trigger logic
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }) => {
        const currentAtom = get(rightPanelAtom);

        if (currentAtom == newAtom) { // '==' to take care of null and undefined
            set(rightPanelAtom, undefined);
            return;
        }

        set(rightPanelAtom, newAtom);
    }
);
