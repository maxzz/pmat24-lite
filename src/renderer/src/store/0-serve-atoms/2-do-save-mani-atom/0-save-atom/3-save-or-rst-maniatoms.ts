import { atom } from "jotai";
import { type FileUsAtom, type FileUs } from "@/store/store-types";
import { createParsedSrc } from "@/store/1-files-atoms/1-do-set-files";
import { disposeFileUsManiAtoms, printDisposeManiAtomsAtom } from "@/store/store-utils/1-file-system-utils";
import { fileUsChanges } from "@/store/2-file-mani-atoms/9-types";
import { createManiAtoms } from "../../0-create-mani-ctx-atoms";

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

        updateManiAtomsAfterSaveOrReset(fileUsAtom, fileUs, resetToPrev, { get, set });
    }
);

function updateManiAtomsAfterSaveOrReset(fileUsAtom: FileUsAtom, fileUs: FileUs, resetToPrev: boolean, { get, set }: GetSet) {
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

    printDisposeManiAtomsAtom(fileUs.maniAtomsAtom);
    console.log('%cdisposeFileUsManiAtoms temp not disposing', 'color: magenta');
    //disposeFileUsManiAtoms(savedManiAtoms); // after new atom set dispose old one
}
