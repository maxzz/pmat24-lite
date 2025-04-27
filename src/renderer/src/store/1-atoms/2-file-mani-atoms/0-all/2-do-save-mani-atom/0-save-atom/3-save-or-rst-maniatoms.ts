import { type Getter, type Setter, atom } from "jotai";
import { type FileUsAtom, type FileUs, disposeFileUsManiAtoms, createManiAtoms, createParsedSrc, printDisposeManiAtomsAtom } from '@/store';

/**
 * @param fileUsAtom - fileUs to update
 * @param resetToPrev - if there is no reset to original content then newly saved file content will be parsed
 */
export const updateManiAtomsAfterSaveOrResetAtom = atom(null,
    (get, set, { fileUsAtom, resetToPrev }: { fileUsAtom: FileUsAtom; resetToPrev: boolean; }) => {
        const fileUs = get(fileUsAtom);

        if (fileUs.parsedSrc.fcat) {
            console.log('no update for FC');
            return;
        }

        updateManiAtomsAfterSaveOrReset(fileUsAtom, fileUs, resetToPrev, get, set);
    }
);

function updateManiAtomsAfterSaveOrReset(fileUsAtom: FileUsAtom, fileUs: FileUs, resetToPrev: boolean, get: Getter, set: Setter) {
    const treeNameAtom = fileUs.parsedSrc.stats.loginFormChooseNameAtom; // This atom is used by tree
    // const currentName = treeNameAtom ? get(treeNameAtom) : undefined;

    const cpassWasAdded = !!get(fileUs.rawCpassAtom);

    if (!resetToPrev || cpassWasAdded) {
        fileUs.parsedSrc = createParsedSrc({ fileCnt: fileUs.fileCnt, maniForCpass: undefined });
    }

    set(fileUs.rawCpassAtom, undefined);

    const savedManiAtomsAtom = fileUs.maniAtomsAtom; //TODO: it should be not atom but values
    const newManiAtoms = createManiAtoms({ fileUs, fileUsAtom });

    if (treeNameAtom) {
        // currentName && set(treeNameAtom, currentName);

        const loginForm = fileUs.parsedSrc.mani?.forms[0];
        loginForm?.options?.choosename && set(treeNameAtom, loginForm?.options?.choosename);

        fileUs.parsedSrc.stats.loginFormChooseNameAtom = treeNameAtom;
    }

    set(fileUs.maniAtomsAtom, newManiAtoms);

    printDisposeManiAtomsAtom(savedManiAtomsAtom, get, set);
    disposeFileUsManiAtoms(savedManiAtomsAtom, get, set); // after new atom set dispose old one
}
