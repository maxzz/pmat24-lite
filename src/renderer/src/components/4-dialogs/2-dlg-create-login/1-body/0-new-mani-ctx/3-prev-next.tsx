import { atom } from "jotai";
import { newManiCtx } from "./0-ctx";
import { WizardPage } from "./8-step-items-data";
import { appSelectedAppAtom } from "./4-selected-app";

const _nextEnabledAtom = atom(
    (get) => {
        // const ctx = newManiCtx;
        // const currentPage = get(ctx.currentPageAtom);

        // const currentApp = get(appSelectedAppAtom);
        // if (!currentApp) {
        //     return false;
        // }

        // if (currentPage === WizardPage.apps) {
        // }

        // if (currentPage === WizardPage.fields) {
        //     return true;
        // }

        // if (currentPage === WizardPage.options) {
        //     return true;
        // }
        
        // if (currentPage === WizardPage.save) {

        //     //TODO: if we are on the last page, then save if always enabled. we need to check if we can move to the next page instead

        //     return false;
        // }

        return true;
    }
);

export function create_NextEnabledAtom() {
    return _nextEnabledAtom;
}

export type NextEnabledAtom = ReturnType<typeof create_NextEnabledAtom>;
