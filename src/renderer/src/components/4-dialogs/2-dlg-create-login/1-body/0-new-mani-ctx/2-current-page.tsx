import { type Atom, atom } from "jotai";
import { WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { clamp } from "@/utils";
import { appSelectedAppAtom } from "./4-selected-app";
import { toast } from "sonner";

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
        (get, set, { next }: { next: boolean; }) => {
            const currentPage = get(_pageAndDirectionAtom)[0];

            if (next && currentPage === wizardLastPage) {
                toast.error('Cannot save yet.');
                return;
            }

            const newPage = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);

            if (next) {
                if (newPage === WizardPage.fields) {
                    const selectedApp = get(appSelectedAppAtom);
                    if (!selectedApp) {
                        toast.error('Select application window first.');
                        return;
                    }
                } else if (newPage === WizardPage.options) {
                }
            }

            set(_pageAndDirectionAtom, [newPage, next ? 1 : -1]);
        }
    );
}

export type DoAdvancePageAtom = ReturnType<typeof create_DoAdvancePageAtom>;
