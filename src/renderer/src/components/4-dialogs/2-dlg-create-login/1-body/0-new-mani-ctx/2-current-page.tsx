import { type Atom, atom } from "jotai";
import { clamp, doAddNextToastIdAtom, doDissmissNextToastsAtom } from "@/utils";
import { toast } from "sonner";
import { napiBuildState } from "@/store/7-napi-atoms";
import { WizardPage, wizardFirstPage, wizardLastPage } from "./8-step-items-data";
import { moveFromAppsToNextPage } from "./2-move-to-mani-page";

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
