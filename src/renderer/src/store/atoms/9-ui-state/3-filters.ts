import { proxy } from "valtio";

export const totalManis = proxy({ // total manifests
    manual: 0,
    normal: 0,
    empty: 0,
});

// Filters state

export const shownManis = proxy({ // currently shown manifests
    normal: true,
    manual: true,
    empty: true,
});
