import { atom } from "jotai";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { createManiAtoms } from "@/store/0-serve-atoms/0-create-mani-ctx-atoms";
import { printFileUsAtomLinks } from "./8-print-fileus-atom-links";

export const rightPanelAtomAtom = atom<FileUsAtom | undefined>(undefined);

/**
 * Non reactive getter for right panel atom
 */
export const rightPanelAtomGetterAtom = atom(
    null,
    (get): FileUsAtom | undefined => {
        return get(rightPanelAtomAtom);
    }
);

/**
 * set tree item to render in the right panel
 */
export const doTriggerRightPanelSelectedAtom = atom(
    null,
    (get, set, { newAtom }: { newAtom: FileUsAtom | undefined; }): void => {
        set(doPreloadManiAtomsAtom, newAtom);
        set(rightPanelAtomAtom, newAtom);
        //printFileUsAtomLinks(rightPanelAtomAtom, { get });
    }
);

/**
 * Preload mani/fce atoms for the right panel item
 */
export const doPreloadManiAtomsAtom = atom(
    null,
    (get, set, fileUsAtom: FileUsAtom | undefined): void => {
        if (fileUsAtom) {
            const fileUs = get(fileUsAtom);

            if (fileUs.parsedSrc.mani) { // no need to preload fceAtoms they are always created when fc loaded
                const maniAtoms = get(fileUs.maniAtomsAtom);
                !maniAtoms && set(fileUs.maniAtomsAtom, createManiAtoms({ fileUs, fileUsAtom }));
            }
        }
    }
);

/**
 * Get access to the fileUsAtom of the right panel item.
 */
export const fileUsOfRightPanelAtom = atom(
    (get): FileUs | undefined => {
        const currentAtom = get(rightPanelAtomAtom);
        return currentAtom ? get(currentAtom) : undefined;
    },
);

export const maniAtomsOfRightPanelAtom = atom(
    (get): ManiAtoms | undefined | null => {
        const fileUs = get(fileUsOfRightPanelAtom);
        return fileUs?.maniAtomsAtom && get(fileUs.maniAtomsAtom);
    },
);

/**
 * Return fileUsAtom if file has cpass form. Use it for cpass add/delete buttons.
 */
export const getCpassFileUsAtom = atom(
    (get): FileUsAtom | undefined => {
        const currentAtom = get(rightPanelAtomAtom);
        const fileUs = currentAtom && get(currentAtom);
        if (!fileUs || fileUs.parsedSrc.stats.isFCat) {
            return undefined;
        }
        const maniAtoms = get(fileUs.maniAtomsAtom);
        return maniAtoms?.[FormIdx.cpass] && currentAtom;
    },
);
