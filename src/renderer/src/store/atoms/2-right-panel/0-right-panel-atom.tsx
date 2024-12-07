import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { createManiAtoms } from "../3-file-mani-atoms";

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const doTriggerRightPanelSelectedAtom = atom(null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }) => {
        const currentAtom = get(rightPanelAtom);

        if (currentAtom === newAtom) { // tree selection trigger logic
            set(rightPanelAtom, undefined);
            return;
        }

        // preload mani/fce atoms for the right panel item
        // if (newAtom) {
        //     const fileUs = get(newAtom);
        //     const maniAtoms = get(fileUs.maniAtomsAtom);
        //     if (fileUs.parsedSrc.mani && !maniAtoms) {
        //         set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, newAtom));
        //     }
        //     //TODO: preload fields catalogs as well
        // }
        set(doPreloadEditorCtxAtom, newAtom);

        set(rightPanelAtom, newAtom);
    }
);

export const fileUsOfRightPanelAtom = atom(
    (get) => {
        const selectedAtom = get(rightPanelAtom);
        return selectedAtom ? get(selectedAtom) : undefined;
    },
);

/**
 * Preload mani/fce atoms for the right panel item
 */
export const doPreloadEditorCtxAtom = atom(null,
    (get, set, fileUsAtom: FileUsAtom | undefined) => {
        if (fileUsAtom) {
            const fileUs = get(fileUsAtom);
            const maniAtoms = get(fileUs.maniAtomsAtom);
            if (fileUs.parsedSrc.mani && !maniAtoms) {
                set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, fileUsAtom));
            }
            //TODO: preload fields catalogs as well
        }
    }
);
