import { type Getter, type Setter, type PrimitiveAtom as PA, atom } from "jotai";
import { errorToString } from "@/utils";
import { FormIdx } from "@/store/manifest";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type AnyFormCtx, type ManiAtoms, fileUsChanges } from "../../9-types";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { doGetWindowManiAtom, maniXmlStrAtom, stateNapiAccess } from "../../../../7-napi-atoms";
import { createNewFileContent } from "@/store/store-utils";
import { showBuildErrorReason, showMessage } from "./2-ctx-create-messages";
import { doInitNewManiContentAtom, newManiContent } from "./0-ctx-content";
import { createManiAtoms } from "../0-create-mani-ctx-atoms";
import { createFileUsFromFileContent } from "../../../1-files";
import { doSetInitialRelationsAtom } from "../../3-cpass-links";
import { fileUsToXmlString } from "../2-do-save-mani-atom/0-save-atom/7-fileus-to-xml-string";
//import { printXmlManiFile } from "../2-do-save-mani-atom/0-save-atom/8-save-utils";
//import { printNewMani } from "./2-ctx-create-messages";

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
        const { maniForCpassAtom: fileUsAtom_ForCpass } = newManiContent;
        const fileUs_ForCpass = fileUsAtom_ForCpass && get(fileUsAtom_ForCpass);
        const maniAtoms_ForCpass = fileUs_ForCpass && get(fileUs_ForCpass.maniAtomsAtom);

        if (fileUsAtom_ForCpass && (!fileUs_ForCpass || !maniAtoms_ForCpass)) {
            throw new Error('cpass.wo.FileUs.or.ManiAtoms');
        }

        const fileContent: FileContent = createNewFileContent({ raw: sawManiXmlStr, newAsManual: manual });
        const fileUs: FileUs = createFileUsFromFileContent(fileContent, fileUs_ForCpass);
        const newFileUsAtom: FileUsAtom = fileUsAtom_ForCpass || atom(fileUs);

        const createdManiAtoms = createManiAtoms({ fileUs, fileUsAtom: newFileUsAtom, embeddTo: maniAtoms_ForCpass, get, set });

        if (fileUsAtom_ForCpass && fileUs_ForCpass && maniAtoms_ForCpass) {
            // const loginForm: AnyFormCtx | undefined = maniAtoms_ForCpass[FormIdx.login];
            // const cpassForm: AnyFormCtx | undefined = createdManiAtoms[FormIdx.login];

            // const newManiAtoms: ManiAtoms = [loginForm, cpassForm, loginForm?.fieldsAtom || atom([]), cpassForm?.fieldsAtom || atom([])];
            const newManiAtoms: ManiAtoms = createdManiAtoms;
            set(fileUs_ForCpass.maniAtomsAtom, newManiAtoms);

            set(doSetInitialRelationsAtom, newManiAtoms);

            fileUsChanges.setCpass({ fileUs: fileUs_ForCpass }, true);

            const xml = await fileUsToXmlString(fileUsAtom_ForCpass, false, get, set); //printXmlManiFile(xml);
            set(fileUs_ForCpass.rawCpassAtom, xml);

            //TODO: tweak xml, now or later on save?
        } else {
            set(fileUs.maniAtomsAtom, createdManiAtoms);
        }

        set(newManiContent.newFileUsAtomAtom, fileUs_ForCpass ? undefined : newFileUsAtom);

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

type MoveFromAppsToNextPageParams = {
    params: Omit<ManifestForWindowCreatorParams, 'wantXml' | 'passwordChange'>;
    showProgressAtom?: PA<boolean>; // show controls scan progress atom
    get: Getter;
    set: Setter;
};

// Utilities

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
