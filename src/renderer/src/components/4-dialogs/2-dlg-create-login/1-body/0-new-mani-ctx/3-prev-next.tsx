import { atom } from "jotai";
import { newManiCtx } from "./0-ctx";
import { allScreenshotAtom } from "@/store/7-napi-atoms";
import { WizardPage } from "./8-step-items-data";

const _nextEnabledAtom = atom(
    (get) => {
        const ctx = newManiCtx;
        const currentPage = get(ctx.currentPageAtom);

        const appCurrentIdx = get(ctx.appSelectedIdxAtom);

        if (appCurrentIdx === -1) {
            return false;
        }

        //TODO: check other conditions

        
        if (currentPage === WizardPage.save) {

            //TODO: if we are on the last page, then save if always enabled. we need to check if we can move to the next page instead

            return false;
        }

        return true;
    }
);

export function create_NextEnabledAtom() {
    return _nextEnabledAtom;
}

export type NextEnabledAtom = ReturnType<typeof create_NextEnabledAtom>;
