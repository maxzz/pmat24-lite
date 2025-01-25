import { atom, type Atom, type PrimitiveAtom } from "jotai";
import { type WizardPage } from "./8-step-items-data";
import { type PageAndDirection, type CreateDoMoveWizardPageAtom, createCurrentPageAtom, createPageAndDirectionAtom, createDoMoveWizardPageAtom } from "./2-current-page";

class NewManiCtx {
    currentPageAtom: Atom<WizardPage>;                  // current page
    pageAndDirectionAtom: Atom<PageAndDirection>;       // current page and direction
    doMoveWizardPageAtom: CreateDoMoveWizardPageAtom;   // move wizard page

    appSelectedIdxAtom: PrimitiveAtom<number>;      // selected application index

    constructor() {
        this.currentPageAtom = createCurrentPageAtom();
        this.pageAndDirectionAtom = createPageAndDirectionAtom();
        this.doMoveWizardPageAtom = createDoMoveWizardPageAtom();

        this.appSelectedIdxAtom = atom(0);
    }
}

export const newManiCtx: NewManiCtx = new NewManiCtx();
