import { type Atom, type PrimitiveAtom as PA } from "jotai";
import { type WizardPage } from "./8-step-items-data";
import { type DoInitNewManiCtxAtom, create_DoInitNewManiCtxAtom } from "./1-init-ctx";
import { type PageAndDirection, type DoAdvancePageAtom, create_CurrentPageAtom, create_PageAndDirectionAtom, create_DoAdvancePageAtom } from "./2-current-page";
import { type AppSelectedIdxAtom, create_AppSelectedIdxAtom } from "./4-selected-app";
import { type NextEnabledAtom, create_NextEnabledAtom } from "./3-prev-next";

export class NewManiCtx {
    doInitAtom: DoInitNewManiCtxAtom;            // init state of the context

    currentPageAtom: Atom<WizardPage>;           // read only current page atom
    pageAndDirectionAtom: PA<PageAndDirection>;  // current page and direction

    doAdvancePageAtom: DoAdvancePageAtom;        // move wizard page
    nextEnabledAtom: NextEnabledAtom;            // is next button enabled

    appSelectedIdxAtom: AppSelectedIdxAtom;      // selected application index

    constructor() {
        this.doInitAtom = create_DoInitNewManiCtxAtom();
        
        this.currentPageAtom = create_CurrentPageAtom();
        this.pageAndDirectionAtom = create_PageAndDirectionAtom();
        
        this.doAdvancePageAtom = create_DoAdvancePageAtom();
        this.nextEnabledAtom = create_NextEnabledAtom();

        this.appSelectedIdxAtom = create_AppSelectedIdxAtom();
    }
}

// export const newManiCtx = (() => new NewManiCtx())();
export const newManiCtx = new NewManiCtx();
