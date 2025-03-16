import { type PrimitiveAtom as PA, type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { type ManifestForWindowCreatorParams, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, sawManiXmlAtom, napiBuildState, setBuildState, splitTypedError, typedErrorToString } from "@/store";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms";
import { createManiAtoms } from "@/store/1-atoms/3-file-mani-atoms";
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
export async function getXmlCreateFileUs({ params: { hwnd, manual, passwordChange }, showProgressAtom, get, set }: MoveFromAppsToNextPageParams): Promise<boolean> {
    // 0. Claen up the context before parsing
    newManiContent.clear(set);

    // 1. Get manifest as maniXml from the window
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

    //TODO: add handle: you can define manifest content manually
    //TODO: check created manifest content manually checkbox

    // 2. Save maniXml to the context
    const sawManiXml = get(sawManiXmlAtom);
    if (!sawManiXml) {
        showReason(set);
        return false;
    }

    set(newManiContent.maniXmlAtom, sawManiXml);

    console.log(`%cNew mani:\n${sawManiXml}`, "color:dimgray");

    // 3. Parse maniXml to fileUs
    try {
        const fileContent: FileContent = createFileContent(sawManiXml);
        const fileUs: FileUs = createFileUsFromFileContent(fileContent);

        //TODO: add handle: you can define manifest content manually
        //TODO: check created manifest content manually checkbox

        set(newManiContent.fileUsAtom, fileUs);
        set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, newManiContent.fileUsAtom as FileUsAtom)); // cast here to remove undefined type from newManiContent.fileUsAtom, see previous line
    } catch (error) {
        newManiContent.clear(set);

        const message = `Cannot parse manifest content\n${errorToString(error)}`;
        console.error(message);
        showMessage({ set, message, isError: true });
        return false;
    }

    return true;
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
        showMessage({ set, message: typedError.extra || 'Access error', isError: true });
    }
    else if (typedError.extra) {
        showMessage({ set, message: typedError.extra, isError: true });
    } else {
        showMessage({ set, message: 'There are no input controls in the window' });
    }

    setBuildState({ error: '' });
}

function showMessage({ set, message, isError }: { set: Setter; message: string; isError?: boolean; }) {
    set(doAddNextToastIdAtom, toast[isError ? 'error' : 'info'](message, { position: "top-center" }));
}
