import { atom } from "jotai";
import { type FileUsAtom } from "@/store/store-types";
import { createManiAtoms } from "../3-file-mani-atoms";
import { createFceAtomsInFileUs } from "../4-field-catalogs/1-fc-file-atoms/1-create-fce/2-create-fce-atoms";

export const rightPanelAtom = atom<FileUsAtom | undefined>(undefined);

export const doTriggerRightPanelSelectedAtom = atom(null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }) => {
        const currentAtom = get(rightPanelAtom);

        if (currentAtom === newAtom) { // tree selection trigger logic is provided by the tree
            set(rightPanelAtom, undefined);
            return;
        }

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

            if (fileUs.parsedSrc.mani) {
                const maniAtoms = get(fileUs.maniAtomsAtom);
                !maniAtoms && set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, fileUsAtom));
            } else if (fileUs.parsedSrc.fcat) {
                // preload fields catalogs as well
                createFceAtomsInFileUs(fileUs);
            }
        }
    }
);
