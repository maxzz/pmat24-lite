import { atom, type WritableAtom, type Atom, type PrimitiveAtom } from "jotai";
import { clamp } from "@/utils";
import { wizardFirstPage, wizardLastPage, type WizardPage } from "./8-step-items-data";
import { PageAndDirection, createCurrentPageAtom, createPageAndDirectionAtom, createDoMoveWizardPageAtom } from "./1-current-page";

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
