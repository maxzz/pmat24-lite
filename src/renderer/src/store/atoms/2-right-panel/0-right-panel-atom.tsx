import { atom } from "jotai";
import { FileUsAtom } from "@/store/store-types";

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const doTriggerRightPanelSelectedAtom = atom(null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }) => {
        const currentAtom = get(rightPanelAtom);

        if (currentAtom === newAtom) { // tree selection trigger logic
            set(rightPanelAtom, undefined);
            return;
        }

        set(rightPanelAtom, newAtom);
    }
);

export const fileUsOfRightPanelAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : undefined;
    },
);
