import { atom, type Atom, type PrimitiveAtom as PA } from "jotai";
import { type WizardPage } from "./8-step-items-data";
import { type DoInitNewManiCtxAtom, create_DoInitNewManiCtxAtom } from "./1-init-ctx";
import { type DoRefreshAppsAtom, create_DoRefreshAppsAtom } from "./1-refresh-apps";
import { type PageAndDirection, type DoAdvancePageAtom, create_CurrentPageAtom, create_PageAndDirectionAtom, create_DoAdvancePageAtom } from "./2-current-page";
import { type AppSelectedIdxAtom, create_AppSelectedIdxAtom } from "./4-selected-app";
import { FileUsAtom } from "@/store";

export class NewManiCtx {
    doInitAtom: DoInitNewManiCtxAtom;            // init state of the context

    currentPageAtom: Atom<WizardPage>;           // read only current page atom
    pageAndDirectionAtom: PA<PageAndDirection>;  // current page and direction

    doAdvancePageAtom: DoAdvancePageAtom;        // move wizard page

    appSelectedIdxAtom: AppSelectedIdxAtom;      // selected application index
    doRefreshAppsAtom: DoRefreshAppsAtom;        // refresh apps

    maniXmlAtom: PA<string | undefined>;         // xml of the selected application
    fileUsAtom: FileUsAtom | undefined;          // fileUs of the selected application

    constructor() {
        this.doInitAtom = create_DoInitNewManiCtxAtom();

        this.currentPageAtom = create_CurrentPageAtom();
        this.pageAndDirectionAtom = create_PageAndDirectionAtom();

        this.doAdvancePageAtom = create_DoAdvancePageAtom();

        this.appSelectedIdxAtom = create_AppSelectedIdxAtom();
        this.doRefreshAppsAtom = create_DoRefreshAppsAtom();

        this.maniXmlAtom = atom<string | undefined>(undefined);
        this.fileUsAtom = undefined;
    }
}

// export const newManiCtx = (() => new NewManiCtx())();
export const newManiCtx = new NewManiCtx();
