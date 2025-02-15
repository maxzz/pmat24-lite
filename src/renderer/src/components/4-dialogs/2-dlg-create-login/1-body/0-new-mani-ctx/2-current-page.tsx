import { type Atom, atom } from "jotai";
import { clamp } from "@/utils";
import { toast } from "sonner";
import { doGetWindowManiAtom, napiBuildState, sawManiXmlAtom } from "@/store/7-napi-atoms";
import { WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { doAddNextToastIdAtom, doDissmissNextToastsAtom } from "./8-next-toast";
import { appSelectedAppAtom } from "./4-selected-app";
import { newManiCtx } from "./0-ctx";
import { createFileContent, createFileUsFromFileContent } from "@/store/1-atoms/1-files/1-do-set-files/2-create-fileus";
import { type FileContent } from "@shared/ipc-types";
import { type FileUs } from "@/store";

export type PageAndDirection = [page: WizardPage, direction: number];

const _pageAndDirectionAtom = atom<PageAndDirection>([wizardFirstPage, 0]);

//

export function create_PageAndDirectionAtom() {
    return _pageAndDirectionAtom;
}

export function create_CurrentPageAtom(): Atom<WizardPage> {
    return atom(
        (get) => {
            return get(_pageAndDirectionAtom)[0];
        }
    );
}

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
                    const selectedApp = get(appSelectedAppAtom);
                    if (!selectedApp) {
                        set(doAddNextToastIdAtom, toast.error('Select application window first.'));
                        return;
                    }

                    const maniXml = get(newManiCtx.maniXmlAtom);
                    if (!maniXml) {
                        // 0. claen up the context before parsing
                        set(newManiCtx.maniXmlAtom, undefined);
                        set(newManiCtx.fileUsAtom, undefined); //TODO: should it be always atom?

                        // 1. get manifest as maniXml from the window
                        await set(doGetWindowManiAtom, { hwnd: selectedApp.item.hwnd, wantXml: true });
                        const sawManiXml = get(sawManiXmlAtom);

                        // 2. save maniXml to the context
                        if (!sawManiXml) {
                            set(doAddNextToastIdAtom, toast.error('Cannot access window content.'));
                            return;
                        }

                        set(newManiCtx.maniXmlAtom, sawManiXml);

                        // 3. parse maniXml to fileUs
                        try {
                            const fileContent: FileContent = createFileContent(sawManiXml);
                            const fileUs: FileUs = createFileUsFromFileContent(fileContent);

                            set(newManiCtx.fileUsAtom, fileUs);

                            console.log('fileUs', fileUs);

                            //TODO: update loaded counters in the files list on the left
                        } catch (error) {
                            console.error(`'doAdvancePageAtom' ${error instanceof Error ? error.message : `${error}`}`);
                            toast.error(`'doAdvancePageAtom' ${error instanceof Error ? error.message : `${error}`}`);
                            return;
                        }

                        // 4. done

                        console.log('sawManiXml', sawManiXml);
                    }

                } else if (newPage === WizardPage.options) {
                }
            }

            set(_pageAndDirectionAtom, [newPage, next ? 1 : -1]);
        }
    );
}

export type DoAdvancePageAtom = ReturnType<typeof create_DoAdvancePageAtom>;
