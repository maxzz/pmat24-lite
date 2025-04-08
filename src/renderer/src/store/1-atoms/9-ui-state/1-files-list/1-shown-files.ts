// Filters state

export type ShownManis = { // currently shown manifests
    showNormal: boolean;
    showManual: boolean;
    showEmpty: boolean;
    fcAllowed: boolean;    // Allow field catalog access
};

export const defaultShownManis: ShownManis = {
    showNormal: true,
    showManual: true,
    showEmpty: true,
    fcAllowed: false,
};
