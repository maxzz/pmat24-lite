import { type Atom, atom, type Getter, type Setter } from "jotai";
import { clamp, doAddNextToastIdAtom, doDissmissNextToastsAtom, errorToString } from "@/utils";
import { toast } from "sonner";
import { doGetWindowManiAtom, napiBuildState, sawManiXmlAtom } from "@/store/7-napi-atoms";
import { WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { appSelectedAppAtom } from "./4-selected-app";
import { newManiCtx } from "./0-ctx";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms/1-files/1-do-set-files/2-create-fileus";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs } from "@/store";

// Page and direction

export type PageAndDirection = [page: WizardPage, direction: number];

const _pageAndDirectionAtom = atom<PageAndDirection>([wizardFirstPage, 0]);

export function create_PageAndDirectionAtom() {
    return _pageAndDirectionAtom;
}

// Current page

export function create_CurrentPageAtom(): Atom<WizardPage> {
    return atom((get) => get(_pageAndDirectionAtom)[0]);
}

// Advance page

export type DoAdvancePageAtom = ReturnType<typeof create_DoAdvancePageAtom>;

export function create_DoAdvancePageAtom() {
    return atom(
        null,
        async (get, set, { next }: { next: boolean; }) => {

            if (napiBuildState.buildRunning) {
                return;
            }

            set(doDissmissNextToastsAtom);

            const currentPage = get(_pageAndDirectionAtom)[0];

            if (next && currentPage === wizardLastPage) {
                set(doAddNextToastIdAtom, toast.error('Cannot save yet.'));
                return;
            }

            const newPage = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);

            if (next) {
                if (newPage === WizardPage.fields) {
                    const move = await moveFromAppsToNextPage(get, set);
                    if (!move) {
                        return;
                    }
                } else if (newPage === WizardPage.options) {
                }
            }

            set(_pageAndDirectionAtom, [newPage, next ? 1 : -1]);
        }
    );
}

async function moveFromAppsToNextPage(get: Getter, set: Setter): Promise<boolean> {
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
            set(doAddNextToastIdAtom, toast.error('There are no input controls in the window.'));
            return false;
        }

        set(newManiCtx.maniXmlAtom, sawManiXml);

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
            toast.error(msg);
            return false;
        }

        // 4. done

        console.log('sawManiXml', sawManiXml);
    }

    return true;
}
