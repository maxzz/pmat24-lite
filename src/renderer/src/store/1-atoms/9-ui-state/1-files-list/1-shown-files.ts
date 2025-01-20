// Filters state

export type ShownManis = { // currently shown manifests
    showNormal: boolean;
    showManual: boolean;
    showEmpty: boolean;
    showFldCat: boolean;
};

export const defaultShownManis: ShownManis = {
    showNormal: true,
    showManual: true,
    showEmpty: true,
    showFldCat: true,
};
