import { type Getter, type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { errorToString } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, maniXmlStrAtom, napiBuildState, createNewFileContent, ManiAtoms, fileUsChanges } from "@/store";
import { createFileUsFromFileContent, createManiAtoms } from "@/store/1-atoms";
import { showBuildErrorReason, printNewMani, showMessage } from "./2-ctx-create-messages";
import { newManiContent } from "./0-ctx-content";

type MoveFromAppsToNextPageParams = {
    params: Omit<ManifestForWindowCreatorParams, 'wantXml' | 'passwordChange'>;
    showProgressAtom?: PA<boolean>; // show controls scan progress atom
    get: Getter;
    set: Setter;
};

/**
 * Create new manifest inside newManiContent atoms and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function createFileUsFromNewXml({ params: { hwnd, manual }, showProgressAtom, get, set }: MoveFromAppsToNextPageParams): Promise<boolean> {

    // 0. Claen up the context before parsing
    newManiContent.init(set);

    // 1. Call Napi to get manifest as maniXml from the window
    try {
        showProgressAtom && set(showProgressAtom, true);

        await set(doGetWindowManiAtom, { hwnd, manual, passwordChange: !!newManiContent.maniForCpassAtom, wantXml: true, });

        if (napiBuildState.buildError) {
            showBuildErrorReason(set);
            return false;
        }
    } finally {
        showProgressAtom && set(showProgressAtom, false);
    }

    // 2. Save maniXml to the context
    const sawManiXml = get(maniXmlStrAtom);
    if (!sawManiXml) {
        showBuildErrorReason(set);
        return false;
    }

    set(newManiContent.maniXmlAtom, sawManiXml);
    //printNewMani(sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const mainForCpass = newManiContent.maniForCpassAtom && get(newManiContent.maniForCpassAtom);

        const fileContent: FileContent = createNewFileContent({ raw: sawManiXml, newAsManual: manual });
        const fileUs: FileUs = createFileUsFromFileContent(fileContent, mainForCpass);
        const newFileUsAtom: FileUsAtom = atom(fileUs);

        newManiContent.newFileUsAtom = newFileUsAtom;

        const createdManiAtoms = createManiAtoms({ fileUs, fileUsAtom: newManiContent.newFileUsAtom });

        if (mainForCpass) {
            const cpassManiAtoms = get(mainForCpass.maniAtomsAtom);

            if (cpassManiAtoms && createdManiAtoms) {
                set(mainForCpass.maniAtomsAtom, [cpassManiAtoms[FormIdx.login], createdManiAtoms[FormIdx.login]]);
                fileUsChanges.setCpass({ fileUs: mainForCpass }, true);
            }

            //TODO: tweak xml, now or later on save?
        } else {
            set(fileUs.maniAtomsAtom, createdManiAtoms);
        }

        return true;
    } catch (error) {
        newManiContent.init(set);

        const message = `Cannot parse manifest content\n${errorToString(error)}`;
        console.error(message);
        showMessage({ set, message, isError: true });
        return false;
    }
}
