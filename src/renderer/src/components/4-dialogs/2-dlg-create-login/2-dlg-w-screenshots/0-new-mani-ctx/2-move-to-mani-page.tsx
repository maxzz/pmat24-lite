import { type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { type FileContent } from "@shared/ipc-types";
import { type FileUsAtom, type FileUs } from "@/store";
import { doGetWindowManiAtom, sawManiXmlAtom } from "@/store/7-napi-atoms";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms/1-files/1-do-set-files/2-create-fileus";
import { createManiAtoms } from "@/store/1-atoms/3-file-mani-atoms";
import { newManiCtx } from "./0-ctx";
import { ctxContent } from "./0-ctx-content";

/**
 * Create new manifest and allow to move to the next page.
 * @returns true if move to the next page is allowed
 */
export async function moveFromAppsToNextPage({ hwnd, get, set }: { hwnd: string; get: Getter; set: Setter; }): Promise<boolean> {
    // 0. Claen up the context before parsing
    ctxContent.clear(set);

    set(newManiCtx.showControlsScanProgressAtom, true);

    // 1. Get manifest as maniXml from the window
    await set(doGetWindowManiAtom, { hwnd, wantXml: true });
    const sawManiXml = get(sawManiXmlAtom);

    set(newManiCtx.showControlsScanProgressAtom, false);

    // 2. Save maniXml to the context
    if (!sawManiXml) {
        set(doAddNextToastIdAtom, toast.error('There are no input controls in the window.')); //TODO: you can define manifest content manually
        return false;
    }

    set(ctxContent.maniXmlAtom, sawManiXml);

    // 3. Parse maniXml to fileUs
    try {
        const fileContent: FileContent = createFileContent(sawManiXml);
        const fileUs: FileUs = createFileUsFromFileContent(fileContent);

        //TODO: check created manifest content manually checkbox

        set(ctxContent.fileUsAtom, fileUs);
        set(fileUs.maniAtomsAtom, createManiAtoms(fileUs, ctxContent.fileUsAtom as FileUsAtom)); // cast here to remove undefined, see previous line
    } catch (error) {
        ctxContent.clear(set);

        const msg = `Cannot parse manifest content.\n${errorToString(error)}`;
        console.error(msg);
        set(doAddNextToastIdAtom, toast.error(msg));
        return false;
    }

    return true;
}
