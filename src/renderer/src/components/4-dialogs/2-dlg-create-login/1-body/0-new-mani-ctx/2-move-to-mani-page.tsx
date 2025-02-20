import { type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { type ManifestCreationDataResult, type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs } from "@/store";
import { doGetWindowManiAtom, sawManiXmlAtom } from "@/store/7-napi-atoms";
import { appSelectedAppAtom } from "./4-selected-app";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms/1-files/1-do-set-files/2-create-fileus";
import { createManiAtoms } from "@/store/1-atoms/3-file-mani-atoms";
import { newManiCtx } from "./0-ctx";
import { clearManiCtxManiData } from "./1-init-ctx";

/**
 * Create new manifest and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function moveFromAppsToNextPage(get: Getter, set: Setter): Promise<boolean> {
    const selectedApp = get(appSelectedAppAtom);
    if (!selectedApp) {
        set(doAddNextToastIdAtom, toast.error('First, select the application window.'));
        return false;
    }

    const maniXml = get(newManiCtx.maniXmlAtom);
    if (maniXml) {
        return true;
    }

    // 0. Claen up the context before parsing
    clearManiCtxManiData(newManiCtx, set);

    set(newManiCtx.showControlsScanProgressAtom, true);

    // 1. Get manifest as maniXml from the window
    await set(doGetWindowManiAtom, { hwnd: selectedApp.item.hwnd, wantXml: true });
    const sawManiXml = get(sawManiXmlAtom);

    set(newManiCtx.showControlsScanProgressAtom, false);

    // 2. Save maniXml to the context
    if (!sawManiXml) {
        set(doAddNextToastIdAtom, toast.error('There are no input controls in the window.')); //TODO: you can define manifest content manually
        return false;
    }

    set(newManiCtx.maniXmlAtom, sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const sawManiXmlResult = JSON.parse(sawManiXml || '{}') as ManifestCreationDataResult;

        const fileContent: FileContent = createFileContent(sawManiXmlResult.xml);
        const fileUs: FileUs = createFileUsFromFileContent(fileContent);

        //TODO: check created manifest content manually checkbox

        set(newManiCtx.fileUsAtom, fileUs);
        set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, newManiCtx.fileUsAtom as FileUsAtom)); // cast here to remove undefined, see previous line
    } catch (error) {
        clearManiCtxManiData(newManiCtx, set);

        const msg = `Cannot parse manifest content.\n${errorToString(error)}`;
        console.error(msg);
        set(doAddNextToastIdAtom, toast.error(msg));
        return false;
    }

    return true;
}
