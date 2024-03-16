import { proxy } from "valtio";

// Filters state

// export const showManiAtoms = {
//     normalAtom: atom(true),
//     manualAtom: atom(true),
//     emptyAtom: atom(true),
// };

// export const totalManiAtoms = {
//     manualAtom: atom(0),
//     normalAtom: atom(0),
//     emptyAtom: atom(0),
// };

export const shownManis = proxy({ // currently shown manifests
    normal: true,
    manual: true,
    empty: true,
});

export const totalManis = proxy({ // total manifests
    manual: 0,
    normal: 0,
    empty: 0,
});
