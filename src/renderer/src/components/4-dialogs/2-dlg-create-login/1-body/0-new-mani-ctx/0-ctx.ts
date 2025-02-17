import { atom, type Atom, type PrimitiveAtom as PA } from "jotai";
import { type PositionStorage, createVarStorage } from "@/ui";
import { type FileUs } from "@/store";
import { type WizardPage } from "./8-step-items-data";
import { type DoInitNewManiCtxAtom, create_DoInitNewManiCtxAtom } from "./1-init-ctx";
import { type DoRefreshAppsAtom, create_DoRefreshAppsAtom } from "./1-refresh-apps";
import { type PageAndDirection, type DoAdvancePageAtom, create_CurrentPageAtom, create_PageAndDirectionAtom, create_DoAdvancePageAtom } from "./2-current-page";
import { type AppSelectedIdxAtom, create_AppSelectedIdxAtom } from "./4-selected-app";

export class NewManiCtx {
    doInitAtom: DoInitNewManiCtxAtom;            // init state of the context

    currentPageAtom: Atom<WizardPage>;           // read only current page atom
    pageAndDirectionAtom: PA<PageAndDirection>;  // current page and direction

    doAdvancePageAtom: DoAdvancePageAtom;        // move wizard page

    appSelectedIdxAtom: AppSelectedIdxAtom;      // selected application index
    doRefreshAppsAtom: DoRefreshAppsAtom;        // refresh apps

    maniXmlAtom: PA<string | undefined>;         // xml of the selected application
    fileUsAtom: PA<FileUs | undefined>;          // fileUs of the selected application

    showControlsScanProgressAtom: PA<boolean>;   // show window content detection progress bar
    
    // UI state
    appsScrollPos: PositionStorage;              // scroll position of the apps grid
    lastSelectedHwnd: string | undefined;        // when dlg closed and opened again, this hwnd will be selected if exists after apps scan

    constructor() {
        this.doInitAtom = create_DoInitNewManiCtxAtom();

        this.currentPageAtom = create_CurrentPageAtom();
        this.pageAndDirectionAtom = create_PageAndDirectionAtom();

        this.doAdvancePageAtom = create_DoAdvancePageAtom();

        this.appSelectedIdxAtom = create_AppSelectedIdxAtom();
        this.doRefreshAppsAtom = create_DoRefreshAppsAtom();

        this.maniXmlAtom = atom<string | undefined>(undefined);
        this.fileUsAtom = atom<FileUs | undefined>(undefined);

        this.showControlsScanProgressAtom = atom(false);
    
        this.appsScrollPos = createVarStorage();
        this.lastSelectedHwnd = undefined; //TODO: not really good idea, because we need to scroll to the selected item as well. Not working yet.
    }
}

export const newManiCtx = new NewManiCtx();
