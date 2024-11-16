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
            current.editor.selectedView = typeof value === "function" ? value(current.editor.selectedView) : value;
            set(ctx.selectedIdxStoreAtom, current.editor.selectedView ? idx : -1);
        }
    }
);

function deselectCurrent(ctx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.fceAtoms.itemsAtom);

    const current = chunks[currentIdx];
    if (current) {
        current.editor.selectedView = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}
