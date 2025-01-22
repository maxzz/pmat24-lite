import { atom, type Atom } from "jotai";

export type NewManiCtx = {
    appSelectedIdxAtom: Atom<number>; // selected application index
};

export const newManiCtx = createNewManiCtx();

function createNewManiCtx() {
    const rv = {
        appSelectedIdxAtom: atom(0),
    };
    return rv;
}
