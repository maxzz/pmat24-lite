import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { createManiAtoms } from "../2-file-mani-atoms";

export const rightPanelAtomAtom = atom<FileUsAtom | undefined>(undefined);

export const doTriggerRightPanelSelectedAtom = atom(null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }) => {
        // const currentAtom = get(rightPanelAtom);
        // No need trigger logic here, it's done by the tree
        // if (currentAtom === newAtom) { // tree selection trigger logic is provided by the tree
        //     set(rightPanelAtom, undefined);
        //     return;
        // }

        set(doPreloadManiAtomsAtom, newAtom);
        set(rightPanelAtomAtom, newAtom);
    }
);

export const fileUsOfRightPanelAtom = atom(
    (get) => {
        const currentAtom = get(rightPanelAtomAtom);
        return currentAtom ? get(currentAtom) : undefined;
    },
);

/**
 * Preload mani/fce atoms for the right panel item
 */
export const doPreloadManiAtomsAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom | undefined) => {
        if (fileUsAtom) {
            const fileUs = get(fileUsAtom);

            if (fileUs.parsedSrc.mani) { // no need to preload fceAtoms they are always created when fc loaded
                const maniAtoms = get(fileUs.maniAtomsAtom);
                !maniAtoms && set(fileUs.maniAtomsAtom, createManiAtoms({ fileUs, fileUsAtom }));
            }
        }
    }
);
