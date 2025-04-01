import { type PrimitiveAtom as PA, type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, maniXmlStrAtom, napiBuildState, setBuildState, splitTypedError, typedErrorToString, type TypedError, createNewFileContent } from "@/store";
import { createFileUsFromFileContent, createManiAtoms } from "@/store/1-atoms";
import { newManiContent } from "./0-ctx-content";

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

        await set(doGetWindowManiAtom, { hwnd, wantXml: true, manual, passwordChange, });

        if (napiBuildState.buildError) {
            showReason(set);
            return false;
        }
    } finally {
        showProgressAtom && set(showProgressAtom, false);
    }

    // 2. Save maniXml to the context
    const sawManiXml = get(maniXmlStrAtom);
    if (!sawManiXml) {
        showReason(set);
        return false;
    }

    set(newManiContent.maniXmlAtom, sawManiXml);
    printNewMani(sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const fileContent: FileContent = createNewFileContent(sawManiXml, manual, passwordChange);
        const fileUs: FileUs = createFileUsFromFileContent(fileContent);

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

function printNewMani(newMani: string) {
    console.log(`%cNew mani:\n${newMani}`, "color:dimgray");
}

function showReason(set: Setter) {
    if (!napiBuildState.buildError) {
        return;
    }

    const typedError = splitTypedError(napiBuildState.buildError);

    console.error(`'getXmlCreateFileUs' ${typedErrorToString(typedError)}`);

    if (typedError.typed === 'canceled-by-user') {
        showMessage({ set, message: 'Canceled' }); // OK but no need to show toast
    }
    else if (typedError.typed === 'too-many-controls') {
        showMessage({ set, message: 'Too many controls' });
    }
    else if (typedError.typed === 'build-error') {
        showMessage({ set, message: getErrorSubMessage(typedError) });
    }
    else if (typedError.extra) {
        showMessage({ set, message: typedError.extra, isError: true });
    } else {
        showMessage({ set, message: 'There are no input controls in the window' });
    }

    setBuildState({ error: '' });
}

function getErrorSubMessage(error: TypedError): string {
    switch (error.sub) {
        case 'incompatiblePM': {
            return 'HID Password Manager is not installed';
        }
        case 'noBrExt': {
            return 'HID Password Manager extension is not installed';
        }
        case 'obsoleteBrExt': {
            return 'Update HID Password Manager extension';
        }
        case 'noControls':
        default: {
            return 'Cannot access application content';
        }
    }
}

function showMessage({ set, message, isError }: { set: Setter; message: string; isError?: boolean; }) {
    set(doAddNextToastIdAtom, toast[isError ? 'error' : 'info'](message, { position: "top-center" }));
}
