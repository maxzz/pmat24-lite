import { atom, type PrimitiveAtom } from "jotai";

export enum WizardPage {
    start,
    apps,
    fields,
    options,
}

export type NewManiCtx = {
    currentPageAtom: PrimitiveAtom<WizardPage>;  // current page
    appSelectedIdxAtom: PrimitiveAtom<number>;   // selected application index
};

export const newManiCtx = createNewManiCtx();

function createNewManiCtx(): NewManiCtx {
    const rv = {
        currentPageAtom: atom(WizardPage.start),
        appSelectedIdxAtom: atom(0),
    };
    return rv;
}

export const doSetWizardPage = atom(
    null,
    (get, set, page: WizardPage) => {
        set(newManiCtx.currentPageAtom, page);
    }
);
