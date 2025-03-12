import { type PrimitiveAtom as PA, type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs, doGetWindowManiAtom, sawManiXmlAtom, napiBuildState, setBuildState, splitTypedError } from "@/store";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms";
import { createManiAtoms } from "@/store/1-atoms/3-file-mani-atoms";
import { newManiContent } from "./0-ctx-content";

type MoveFromAppsToNextPageParams = {
    hwnd: string;
    showProgressAtom?: PA<boolean>; // show controls scan progress atom
    get: Getter;
    set: Setter;
};

/**
 * Create new manifest inside newManiContent atoms and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function getXmlCreateFileUs({ hwnd, showProgressAtom, get, set }: MoveFromAppsToNextPageParams): Promise<boolean> {
    // 0. Claen up the context before parsing
    newManiContent.clear(set);

    // 1. Get manifest as maniXml from the window
    try {
        showProgressAtom && set(showProgressAtom, true);
        await set(doGetWindowManiAtom, { hwnd, wantXml: true });
    } finally {
        showProgressAtom && set(showProgressAtom, false);
    }

    // 2. Save maniXml to the context
    const sawManiXml = get(sawManiXmlAtom);
    if (!sawManiXml) {
        const typedError = splitTypedError(napiBuildState.buildError);

        if (typedError.typed === 'canceled-by-user') {
            //set(doAddNextToastIdAtom, toast.info('Canceled', { position: "top-center" })); // OK but no need to show toast
            setBuildState({ error: '' });
            return false;
        }

        if (typedError.typed === 'too-many-controls') {
            set(doAddNextToastIdAtom, toast.info('Too many controls', { position: "top-center" }));
            setBuildState({ error: '' });
            return false;
        }

        if (typedError.extra) {
            set(doAddNextToastIdAtom, toast.error(typedError.extra, { position: "top-center" }));
            setBuildState({ error: '' });
            return false;
        }

        set(doAddNextToastIdAtom, toast.info('There are no input controls in the window', { position: "top-center" })); //TODO: you can define manifest content manually
        return false;
    }

    set(newManiContent.maniXmlAtom, sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const fileContent: FileContent = createFileContent(sawManiXml);
        const fileUs: FileUs = createFileUsFromFileContent(fileContent);

        //TODO: check created manifest content manually checkbox

        set(newManiContent.fileUsAtom, fileUs);
        set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, newManiContent.fileUsAtom as FileUsAtom)); // cast here to remove undefined, see previous line
    } catch (error) {
        newManiContent.clear(set);

        const msg = `Cannot parse manifest content\n${errorToString(error)}`;
        console.error(msg);
        set(doAddNextToastIdAtom, toast.error(msg));
        return false;
    }

    return true;
}
