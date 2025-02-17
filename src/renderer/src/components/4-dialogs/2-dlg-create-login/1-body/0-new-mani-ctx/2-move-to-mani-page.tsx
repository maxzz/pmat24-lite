import { type Getter, type Setter } from "jotai";
import { doAddNextToastIdAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { doGetWindowManiAtom, sawManiXmlAtom } from "@/store/7-napi-atoms";
import { appSelectedAppAtom } from "./4-selected-app";
import { newManiCtx } from "./0-ctx";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms/1-files/1-do-set-files/2-create-fileus";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs } from "@/store";

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

    if (!maniXml) {
        // 0. Claen up the context before parsing
        set(newManiCtx.maniXmlAtom, undefined);
        set(newManiCtx.fileUsAtom, undefined);

        // 1. Get manifest as maniXml from the window
        await set(doGetWindowManiAtom, { hwnd: selectedApp.item.hwnd, wantXml: true });
        const sawManiXml = get(sawManiXmlAtom);

        // 2. Save maniXml to the context
        if (!sawManiXml) {
            set(doAddNextToastIdAtom, toast.error('There are no input controls in the window.')); //TODO: you can define manifest content manually
            return false;
        }

        set(newManiCtx.maniXmlAtom, sawManiXml);

        //TODO: check created manifest content manually checkbox

        // 3. Parse maniXml to fileUs
        try {
            const fileContent: FileContent = createFileContent(sawManiXml);
            const fileUs: FileUs = createFileUsFromFileContent(fileContent);

            set(newManiCtx.fileUsAtom, fileUs);

            console.log('fileUs', fileUs);

            //TODO: update loaded counters in the files list on the left
        } catch (error) {
            const msg = `Cannot parse manifest content.\n${errorToString(error)}`;
            console.error(msg);
            set(doAddNextToastIdAtom, toast.error(msg));
            return false;
        }

        // 4. done

        console.log('sawManiXml', sawManiXml);
    }

    return true;
}
