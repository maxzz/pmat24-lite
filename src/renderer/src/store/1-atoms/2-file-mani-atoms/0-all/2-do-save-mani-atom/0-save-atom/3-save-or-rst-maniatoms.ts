import { type Getter, type Setter, atom } from "jotai";
import { type FileUsAtom, type FileUs, disposeFileUsManiAtoms, createManiAtoms, createParsedSrc, printDisposeManiAtomsAtom, fileUsChanges } from '@/store';

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
    const cpassChanged = fileUsChanges.hasCpassChange({ fileUs });

    if (!resetToPrev || cpassChanged) {
        fileUs.parsedSrc = createParsedSrc({ fileCnt: fileUs.fileCnt, maniForCpass: undefined });
    }

    set(fileUs.rawCpassAtom, undefined);

    const savedManiAtoms = get(fileUs.maniAtomsAtom); //TODO: it should be not atom but values
    const newManiAtoms = createManiAtoms({ fileUs, fileUsAtom });

    const treeNameAtom = fileUs.parsedSrc.stats.loginFormChooseNameAtom; // This atom is used by tree
    if (treeNameAtom) {
        const loginForm = fileUs.parsedSrc.mani?.forms[0];
        loginForm?.options?.choosename && set(treeNameAtom, loginForm?.options?.choosename);
        fileUs.parsedSrc.stats.loginFormChooseNameAtom = treeNameAtom;
    }

    set(fileUs.maniAtomsAtom, newManiAtoms);

    printDisposeManiAtomsAtom(fileUs.maniAtomsAtom, get, set);
    console.log('%cdisposeFileUsManiAtoms temp not disposing', 'color: magenta');
    //disposeFileUsManiAtoms(savedManiAtoms); // after new atom set dispose old one
}
