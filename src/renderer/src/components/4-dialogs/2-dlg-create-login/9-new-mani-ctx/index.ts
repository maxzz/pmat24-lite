import { atom, type Atom, type PrimitiveAtom } from "jotai";
import { clamp } from "@/utils";

export enum WizardPage {
    start,
    apps,
    fields,
    options,
}

export type NewManiCtx = {
    currentPageAtom: Atom<WizardPage>;  // current page
    appSelectedIdxAtom: PrimitiveAtom<number>;   // selected application index
};

export const newManiCtx = createNewManiCtx();

function createNewManiCtx(): NewManiCtx {
    const rv = {
        currentPageAtom: atom((get) => get(_currentPageAtom)),
        appSelectedIdxAtom: atom(0),
    };
    return rv;
}

const _currentPageAtom = atom<WizardPage>(WizardPage.start);

export const doSetWizardPageAtom = atom(
    null,
    (get, set, page: WizardPage) => {
        set(_currentPageAtom, page);
    }
);

export const doMoveWizardPageAtom = atom(
    null,
    (get, set, {next}:{next: boolean}) => {
        const currentPage = get(_currentPageAtom);
        const page = clamp(currentPage + (next ? 1 : -1), WizardPage.start, WizardPage.options);
        set(_currentPageAtom, page);
    }
);
