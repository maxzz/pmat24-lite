import { atom, type WritableAtom, type Atom, type PrimitiveAtom } from "jotai";
import { clamp } from "@/utils";
import { wizardFirstPage, wizardLastPage, type WizardPage } from "./8-step-items-data";

class NewManiCtx {
    currentPageAtom: Atom<WizardPage>;              // current page
    pageAndDirectionAtom: Atom<PageAndDirection>;
    doMoveWizardPageAtom: WritableAtom<null, [{ next: boolean; }], void>;

    appSelectedIdxAtom: PrimitiveAtom<number>;      // selected application index

    constructor() {
        this.currentPageAtom = createCurrentPageAtom();
        this.pageAndDirectionAtom = createPageAndDirectionAtom();
        this.doMoveWizardPageAtom = createDoMoveWizardPageAtom();
        
        this.appSelectedIdxAtom = atom(0);
    }
}

export const newManiCtx: NewManiCtx = new NewManiCtx();

export type PageAndDirection = [page: WizardPage, direction: number];

const _pageAndDirectionAtom = atom<PageAndDirection>([wizardFirstPage, 0]);

function createPageAndDirectionAtom() {
    return _pageAndDirectionAtom;
}

function createCurrentPageAtom() {
    return atom((get) => {
        return get(_pageAndDirectionAtom)[0];
    });
}

function createDoMoveWizardPageAtom() {
    return atom(
        null,
        (get, set, { next }: { next: boolean; }) => {
            const currentPage = get(_pageAndDirectionAtom)[0];
            const page = clamp(currentPage + (next ? 1 : -1), wizardFirstPage, wizardLastPage);
            set(_pageAndDirectionAtom, [page, next ? 1 : -1]);
        }
    );
}
