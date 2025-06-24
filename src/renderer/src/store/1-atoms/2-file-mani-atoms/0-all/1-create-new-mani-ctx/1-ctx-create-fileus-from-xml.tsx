import { type Getter, type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { errorToString } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, maniXmlStrAtom, stateNapiAccess, createNewFileContent, fileUsChanges, doInitNewManiContentAtom, ManiAtoms } from "@/store";
import { createFileUsFromFileContent, createManiAtoms } from "@/store/1-atoms";
import { showBuildErrorReason, printNewMani, showMessage } from "./2-ctx-create-messages";
import { newManiContent } from "./0-ctx-content";
import { fileUsToXmlString } from "../2-do-save-mani-atom/0-save-atom/7-fileus-to-xml-string";
import { printXmlManiFile } from "../2-do-save-mani-atom/0-save-atom/8-save-utils";

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
    set(doInitNewManiContentAtom);

    // 1. Call Napi to get manifest as maniXml from the window
    try {
        showProgressAtom && set(showProgressAtom, true);

        await set(doGetWindowManiAtom, { hwnd, manual, passwordChange: !!newManiContent.maniForCpassAtom, wantXml: true, });

        if (stateNapiAccess.buildError) {
            showBuildErrorReason(set);
            return false;
        }
    } finally {
        showProgressAtom && set(showProgressAtom, false);
    }

    // 2. Save maniXml to the context
    const sawManiXmlStr = get(maniXmlStrAtom);
    if (!sawManiXmlStr) {
        showBuildErrorReason(set);
        return false;
    }

    set(newManiContent.maniXmlStrAtom, sawManiXmlStr);
    //printNewMani(sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const mainForCpassFileUs = newManiContent.maniForCpassAtom && get(newManiContent.maniForCpassAtom);

        const fileContent: FileContent = createNewFileContent({ raw: sawManiXmlStr, newAsManual: manual });
        const fileUs: FileUs = createFileUsFromFileContent(fileContent, mainForCpassFileUs);
        const newFileUsAtom: FileUsAtom = newManiContent.maniForCpassAtom || atom(fileUs);

        const createdManiAtoms = createManiAtoms({ fileUs, fileUsAtom: newFileUsAtom });

        if (mainForCpassFileUs && newManiContent.maniForCpassAtom) {
            const cpassManiAtoms = get(mainForCpassFileUs.maniAtomsAtom);
            if (!cpassManiAtoms) {
                throw new Error('cpass wo/ ManiAtoms');
            }

            const loginForm = cpassManiAtoms[FormIdx.login];
            const cpassForm = createdManiAtoms[FormIdx.login];

            const newManiAtoms: ManiAtoms = [loginForm, cpassForm, loginForm?.formFieldsAtom || atom([]), cpassForm?.formFieldsAtom || atom([])];
            set(mainForCpassFileUs.maniAtomsAtom, newManiAtoms);
            fileUsChanges.setCpass({ fileUs: mainForCpassFileUs }, true);

            const xml = await fileUsToXmlString(newManiContent.maniForCpassAtom, false, get, set); //printXmlManiFile(xml);
            set(mainForCpassFileUs.rawCpassAtom, xml);

            //TODO: tweak xml, now or later on save?
        } else {
            set(fileUs.maniAtomsAtom, createdManiAtoms);
        }

        set(newManiContent.newFileUsAtomAtom, mainForCpassFileUs ? undefined : newFileUsAtom);

        printNewFileUsCreated(newFileUsAtom, get);
        return true;
    } catch (error) {
        set(doInitNewManiContentAtom);

        const message = `Cannot parse manifest content\n${errorToString(error)}`;
        console.error(message);
        showMessage({ set, message, isError: true });
        return false;
    }
}

function printNewFileUsCreated(fileUsAtom: FileUsAtom | undefined, get: Getter) {
    const atomStr = fileUsAtom ? fileUsAtom.toString() : 'null';
    const fileUs = fileUsAtom ? get(fileUsAtom) : null;
    const maniAtomsAtom = fileUs?.maniAtomsAtom;
    const maniAtomsStr = maniAtomsAtom ? maniAtomsAtom.toString() : 'null';
    console.groupCollapsed(
        `%c ⭐⭐⭐⭐⭐⭐⭐  created.new fileUsAtom:%c${atomStr}%c, maniAtomsAtoms:%c${maniAtomsStr}%c`,
        'font-weight: semibold; background-color: lightgoldenrodyellow; color: forestgreen',
        'font-weight: normal; color: magenta',
        'font-weight: normal; color: gray',
        'font-weight: normal; color: darkmagenta',
        'font-weight: normal; color: gray',
    );
    console.trace();
    console.groupEnd();
}

//04.19.25
//TODO: update xml after cpass created - done
//TODO: password change form has duplicated fields
//TODO: delete file at least for debug version
//TODO: displayname="Forgot your Password?" is stored as button instead of checkbox
//TODO: update modified date after save
