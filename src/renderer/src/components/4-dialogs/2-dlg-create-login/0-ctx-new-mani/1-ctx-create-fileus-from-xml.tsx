import { type PrimitiveAtom as PA, type Getter, type Setter } from "jotai";
import { errorToString } from "@/utils";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, maniXmlStrAtom, napiBuildState, createNewFileContent } from "@/store";
import { createFileUsFromFileContent, createManiAtoms } from "@/store/1-atoms";
import { newManiContent } from "./0-ctx-content";
import { showBuildErrorReason, printNewMani, showMessage } from "./2-ctx-create-messages";

type MoveFromAppsToNextPageParams = {
    params: Omit<ManifestForWindowCreatorParams, 'wantXml'>;
    showProgressAtom?: PA<boolean>; // show controls scan progress atom
    get: Getter;
    set: Setter;
};

/**
 * Create new manifest inside newManiContent atoms and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function createFileUsFromNewXml({ params: { hwnd, manual, passwordChange }, showProgressAtom, get, set }: MoveFromAppsToNextPageParams): Promise<boolean> {
    
    // 0. Claen up the context before parsing
    newManiContent.clear(set);

    // 1. Call Napi to get manifest as maniXml from the window
    try {
        showProgressAtom && set(showProgressAtom, true);

        await set(doGetWindowManiAtom, { hwnd, manual, passwordChange, wantXml: true, });

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
    printNewMani(sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const fileContent: FileContent = createNewFileContent({ raw: sawManiXml, newAsManual: manual, newAsCpass: passwordChange });
        const fileUs: FileUs = createFileUsFromFileContent(fileContent, newManiContent.fileUsMasterAtom);

        set(newManiContent.fileUsAtom, fileUs);
        set(fileUs.maniAtomsAtom, createManiAtoms({ fileUs, fileUsAtom: newManiContent.fileUsAtom as FileUsAtom })); // Cast here to remove undefined type from newManiContent.fileUsAtom, see previous line
        
    } catch (error) {
        newManiContent.clear(set);

        const message = `Cannot parse manifest content\n${errorToString(error)}`;
        console.error(message);
        showMessage({ set, message, isError: true });
        return false;
    }

    return true;
}
