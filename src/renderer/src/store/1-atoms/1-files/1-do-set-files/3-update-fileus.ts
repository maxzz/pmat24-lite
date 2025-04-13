import { type Getter, type Setter, atom } from "jotai";
import { type FileUsAtom, type FileUs, discardFileUsManiAtoms, createManiAtoms } from '@/store';
import { createParsedSrc } from './4-create-parsed-src';

/**
 * @param fileUsAtom - fileUs to update
 * @param resetToPrev - if there is no reset to original content then newly saved file content will be parsed
 */
export const updateFileUsAfterSaveOrResetAtom = atom(null,
    (get, set, { fileUsAtom, resetToPrev: reset }: { fileUsAtom: FileUsAtom; resetToPrev: boolean; }) => {
        const fileUs = get(fileUsAtom);

        if (fileUs.parsedSrc.fcat) {
            console.log('no update for FC');
            return;
        }

        updateFileUsAfterSaveOrReset(fileUsAtom, fileUs, reset, get, set);
    }
);

function updateFileUsAfterSaveOrReset(fileUsAtom: FileUsAtom, fileUs: FileUs, reset: boolean, get: Getter, set: Setter) {
    const treeNameAtom = fileUs.parsedSrc.stats.loginFormChooseNameAtom;
    const currentName = treeNameAtom ? get(treeNameAtom) : undefined;

    if (!reset) {
        fileUs.parsedSrc = createParsedSrc({ fileCnt: fileUs.fileCnt, masterFileUs: undefined });
    }

    discardFileUsManiAtoms(fileUs, get, set);

    const newManiAtoms = createManiAtoms({ fileUs, fileUsAtom });

    if (treeNameAtom) {
        currentName && set(treeNameAtom, currentName);
        fileUs.parsedSrc.stats.loginFormChooseNameAtom = treeNameAtom;
    }

    set(fileUs.maniAtomsAtom, newManiAtoms);
}
