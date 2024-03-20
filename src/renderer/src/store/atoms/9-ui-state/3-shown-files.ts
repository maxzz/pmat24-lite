import { proxy } from "valtio";

// Filters state

export type ShownManis = { // currently shown manifests
    normal: boolean;
    manual: boolean;
    empty: boolean;
};

export const defaultShownManis: ShownManis = {
    normal: true,
    manual: true,
    empty: true,
};
