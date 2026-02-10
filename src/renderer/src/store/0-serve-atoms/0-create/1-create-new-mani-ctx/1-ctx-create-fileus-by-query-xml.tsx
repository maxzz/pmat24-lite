import { atom } from "jotai";
import { errorToString } from "@/utils";
import { FieldTyp, FormIdx } from "@/store/8-manifest";
import { fileUsChanges } from "@/store/2-file-mani-atoms/9-types";
import { type FileUs, type FileUsAtom } from "@/store/store-types";
import { type ManiAtoms, cFieldsIdx, lFieldsIdx, doSetInitialRelationsAtom } from "@/store/2-file-mani-atoms";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { doGetWindowManiAtom, maniXmlStrAtom, stateNapiAccess } from "@/store/7-napi-atoms";
import { createEmptyFileContent } from "@/store/store-utils";
import { showBuildErrorReason, showMessage } from "./2-ctx-create-messages";
import { doInitNewManiContentAtom, newManiContent } from "./0-ctx-content";
import { createManiAtoms } from "../0-create-mani-ctx-atoms";
import { createParsedFileUsFromFileContent } from "@/store/0-serve-atoms/1-do-set-files";
import { fileUsToXmlString } from "../../3-do-save-mani-atom/0-save-atom/2-fileus-to-xml-string";
import { print_ManiAtomsForms } from "@/store/2-file-mani-atoms/8-print/8-print-fields";
import { print_XmlManiFile } from "@/store/2-file-mani-atoms/8-print/8-print-mani";

/**
 * Create new manifest inside newManiContent atoms and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function createFileUsByQueryXml({ params: { hwnd, manual }, showProgressAtom, getset }: { params: CreateParams; showProgressAtom?: PA<boolean>; getset: GetSet; }): Promise<boolean> {
    const { get, set } = getset;

    // 0. Claen up the context before parsing
    set(doInitNewManiContentAtom);

    // 1. Call Napi to get manifest as maniXml from the window
    try {
        showProgressAtom && set(showProgressAtom, true); // show controls scan progress atom

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
    print_XmlManiFile(sawManiXmlStr, { label: 'XML from NAPI:', labelCss: 'color: mediumvioletred; font-size: 0.65rem;', bodyCss: 'color: firebrick; font-size: 0.5rem;', expandBody: false });

    // 3. Parse maniXml to fileUs
    try {
        const { maniForCpassAtom: fileUsAtom_ForCpass } = newManiContent;
        const fileUs_ForCpass = fileUsAtom_ForCpass && get(fileUsAtom_ForCpass);
        const maniAtoms_ForCpass = fileUs_ForCpass && get(fileUs_ForCpass.maniAtomsAtom);

        if (fileUsAtom_ForCpass && (!fileUs_ForCpass || !maniAtoms_ForCpass)) {
            throw new Error('cpass.wo.FileUs.or.ManiAtoms');
        }

        const fileContent: FileContent = createEmptyFileContent({ raw: sawManiXmlStr, newAsManual: manual });
        const fileUs: FileUs = createParsedFileUsFromFileContent(fileContent, fileUs_ForCpass);
        const newFileUsAtom: FileUsAtom = fileUsAtom_ForCpass || atom(fileUs);

        if (!fileUs.parsedSrc.meta?.[FormIdx.login]) { // login form should be always when creating login or cpass form
            showMessage({ set, message: `No fields were found to create ${maniAtoms_ForCpass ? 'the password change' : 'login'} form.`, isError: false });
            return false;
        }

        const createdManiAtoms = createManiAtoms({ fileUs, fileUsAtom: newFileUsAtom, embeddTo: maniAtoms_ForCpass });

        //print_ManiAtomsForms(createdManiAtoms, { label: '💻 createFileUsByQueryXml.createdManiAtoms' });

        if (!validManiAtomsToContinue(createdManiAtoms, !!newManiContent.maniForCpassAtom, manual, getset)) {
            return false;
        }

        if (fileUsAtom_ForCpass && fileUs_ForCpass && maniAtoms_ForCpass) {
            set(fileUs_ForCpass.maniAtomsAtom, createdManiAtoms);
            set(doSetInitialRelationsAtom, createdManiAtoms);

            fileUsChanges.setCpass({ fileUs: fileUs_ForCpass }, true);

            const xml = await fileUsToXmlString(fileUsAtom_ForCpass, false, getset); //print_XmlManiFile(xml, { label: 'XML for cpass from fileUs:', labelCss: 'color: mediumvioletred; font-size: 0.65rem;', bodyCss: 'color: firebrick; font-size: 0.5rem;', expandBody: false });
            set(fileUs_ForCpass.rawCpassAtom, xml);

            //TODO: tweak xml, now or later on save?
        } else {
            set(fileUs.maniAtomsAtom, createdManiAtoms);
        }

        set(newManiContent.newFileUsAtomAtom, fileUs_ForCpass ? undefined : newFileUsAtom);

        print_NewFileUsCreated(newFileUsAtom, getset);
        return true;
    } catch (error) {
        set(doInitNewManiContentAtom);

        const message = `Unable to retrieve page content.\n${errorToString(error)}`;
        console.error(message);
        showMessage({ set, message, isError: true });
        return false;
    }
}

function validManiAtomsToContinue(maniAtoms: ManiAtoms, passwordChange: boolean, manual: boolean, getset: GetSet): boolean {
    const { get, set } = getset;

    if (manual) {
        return true; // No need to check number of fields for manual mode
    }

    print_ManiAtomsForms(maniAtoms, { label: '💻 validManiAtomsToContinue' });

    let message: string | undefined;

    if (!passwordChange) {
        const loginFields = get(maniAtoms[lFieldsIdx]);
        const passwordFields = loginFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        if (!loginFields.length) {
            message = 'No fields detected.';
        } else if (passwordFields.length !== 1) {
            message = 'The login form must contain one password field.';
        }
    } else { // cpass
        const cpassFields = get(maniAtoms[cFieldsIdx]);
        const passwordFields = cpassFields.filter((field) => get(field.typeAtom) === FieldTyp.psw);
        if (!cpassFields.length) {
            message = 'No fields detected.';
        } else if (passwordFields.length !== 2 && passwordFields.length !== 3) { // 2 or 3 password fields are allowed
            message = 'The password change form must contain exactly 2 or 3 password fields.';
        }
    }

    if (message) {
        showMessage({ set, message, isError: false });
        return false;
    }

    return true;
}

type CreateParams = Pick<ManifestForWindowCreatorParams, 'hwnd' | 'manual'>;

// Utilities

function print_NewFileUsCreated(fileUsAtom: FileUsAtom | undefined, { get }: GetSet) {
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
