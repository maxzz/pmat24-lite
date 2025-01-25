import { atom, type Atom, type PrimitiveAtom } from "jotai";
import { clamp } from "@/utils";
import { wizardFirstPage, wizardLastPage, type WizardPage } from "./8-step-items-data";

class NewManiCtx {
    currentPageAtom: Atom<WizardPage>;  // current page
    appSelectedIdxAtom: PrimitiveAtom<number>;   // selected application index

    constructor() {
        this.currentPageAtom = atom((get) => {
            return get(_currentPageAtom)[0];
        });
        this.appSelectedIdxAtom = atom(0);
    }
}

export const newManiCtx: NewManiCtx = new NewManiCtx();

type CurrentPage = [page: WizardPage, direction: number];

const _currentPageAtom = atom<[page: WizardPage, direction: number]>([wizardFirstPage, 0]);

// export const doSetWizardPageAtom = atom(
//     null,
//     (get, set, page: WizardPage) => {
//         set(_currentPageAtom, page);
//     }
// );

export const doMoveWizardPageAtom = atom(
    null,
    (get, set, { next }: { next: boolean; }) => {
        const currentPage = get(_currentPageAtom)[0];
        const page = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);
        set(_currentPageAtom, [page, next ? 1 : -1]);
    }
);
