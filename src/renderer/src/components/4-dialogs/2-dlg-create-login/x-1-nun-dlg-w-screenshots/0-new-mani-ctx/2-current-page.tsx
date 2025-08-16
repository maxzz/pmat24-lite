import { type Atom, atom } from "jotai";
import { clamp, doAddNextToastIdAtom, doDissmissNextToastsAtom } from "@/utils";
import { toast } from "sonner";
import { stateNapiAccess } from "@/store/7-napi-atoms";
import { createFileUsFromNewXml, newManiContent } from "@/store/0-serve-atoms";
import { checkboxCreateManualModeAtom } from "@/store/4-dialogs-atoms/2-create-dialog-atoms";
import { appSelectedAppAtom } from "./4-selected-app";
import { WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { newManiCtx } from "./0-ctx";

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

            if (stateNapiAccess.buildRunning) {
                set(doAddNextToastIdAtom, toast.info('Build running...'));
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
                        set(doAddNextToastIdAtom, toast.error('First, select the application window.'));
                        return false;
                    }

                    const maniXml = get(newManiContent.maniXmlStrAtom); // Move beetwen pages freally in case if xml has been created already
                    if (maniXml) {
                        return;
                    }

                    const created = await createFileUsFromNewXml({
                        params: { hwnd: selectedApp.item.hwnd, manual: get(checkboxCreateManualModeAtom), },
                        showProgressAtom: newManiCtx.showProgressAtom,
                        getset: { get, set },
                    });
                    if (!created) {
                        return;
                    }

                } else if (newPage === wizardLastPage) {
                    //TODO: save
                    //TODO: update loaded counters in the files list on the left
                }
            }

            set(_pageAndDirectionAtom, [newPage, next ? 1 : -1]);
        }
    );
}
