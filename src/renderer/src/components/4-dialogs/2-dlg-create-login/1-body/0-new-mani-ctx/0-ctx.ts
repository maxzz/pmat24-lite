import { type Atom, type PrimitiveAtom } from "jotai";
import { type WizardPage } from "./8-step-items-data";
import { type DoInitNewManiCtxAtom, createDoInitNewManiCtxAtom } from "./1-init-ctx";
import { type PageAndDirection, type CreateDoAdvancePageAtom, createCurrentPageAtom, createPageAndDirectionAtom, createDoAdvancePageAtom } from "./2-current-page";
import { type CreateAppSelectedIdxAtom, createAppSelectedIdxAtom } from "./4-selected-app";
import { type CreateNextEnabledAtom, createNextEnabledAtom } from "./3-prev-next";

export class NewManiCtx {
    doInitAtom: DoInitNewManiCtxAtom;                       // init state of the context

    currentPageAtom: Atom<WizardPage>;                      // read only current page atom
    pageAndDirectionAtom: PrimitiveAtom<PageAndDirection>;  // current page and direction

    doAdvancePageAtom: CreateDoAdvancePageAtom;             // move wizard page
    nextEnabledAtom: CreateNextEnabledAtom;                 // is next button enabled

    appSelectedIdxAtom: CreateAppSelectedIdxAtom;           // selected application index

    constructor() {
        this.doInitAtom = createDoInitNewManiCtxAtom();
        
        this.currentPageAtom = createCurrentPageAtom();
        this.pageAndDirectionAtom = createPageAndDirectionAtom();
        
        this.doAdvancePageAtom = createDoAdvancePageAtom();
        this.nextEnabledAtom = createNextEnabledAtom();

        this.appSelectedIdxAtom = createAppSelectedIdxAtom();
    }
}

// export const newManiCtx = (() => new NewManiCtx())();
export const newManiCtx = new NewManiCtx();
