import { proxy } from "valtio";

// Filters state

export const shownManis = proxy({ // currently shown manifests
    normal: true,
    manual: true,
    empty: true,
});
