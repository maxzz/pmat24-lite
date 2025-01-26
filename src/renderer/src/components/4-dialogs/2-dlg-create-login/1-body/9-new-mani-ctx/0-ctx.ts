
import { atom, type Atom, type PrimitiveAtom } from "jotai";
import { type WizardPage } from "./8-step-items-data";
import { type DoInitNewManiCtxAtom, createDoInitNewManiCtxAtom  } from "./1-init-ctx";
import { type PageAndDirection, type CreateDoAdvancePageAtom, createCurrentPageAtom, createPageAndDirectionAtom, createDoAdvancePageAtom } from "./2-current-page";
import { createAppSelectedIdxAtom } from "./3-selected-app";

export class NewManiCtx {
    doInitAtom: DoInitNewManiCtxAtom;                       // init state of the context

    currentPageAtom: Atom<WizardPage>;                      // read only current page atom
    pageAndDirectionAtom: PrimitiveAtom<PageAndDirection>;  // current page and direction
    doAdvancePageAtom: CreateDoAdvancePageAtom;             // move wizard page

    appSelectedIdxAtom: PrimitiveAtom<number>;              // selected application index

    constructor() {
        this.doInitAtom = createDoInitNewManiCtxAtom();
        
        this.currentPageAtom = createCurrentPageAtom();
        this.pageAndDirectionAtom = createPageAndDirectionAtom();
        this.doAdvancePageAtom = createDoAdvancePageAtom();

        this.appSelectedIdxAtom = createAppSelectedIdxAtom();
    }
}

export const newManiCtx: NewManiCtx = new NewManiCtx();
