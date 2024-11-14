import { atom, type Getter, type Setter } from "jotai";
import { type FceCtx } from "@/store";

export const doSelectFceItemAtom = atom(
    null,
    (get, set, ctx: FceCtx, idx: number, value: boolean | ((v: boolean) => boolean)) => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrent(ctx, get, set);
        }

        const chunks = get(ctx.fceAtoms.itemsAtom);

        const current = chunks[idx];
        if (current) {
            current.editor.selected = typeof value === "function" ? value(current.editor.selected) : value;
            set(ctx.selectedIdxStoreAtom, current.editor.selected ? idx : -1);
        }
    }
);

function deselectCurrent(ctx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.fceAtoms.itemsAtom);

    const current = chunks[currentIdx];
    if (current) {
        current.editor.selected = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}
