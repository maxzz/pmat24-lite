import { atom, type Getter, type Setter } from "jotai";
import { MFormCtx } from "@/store/atoms/3-file-mani-atoms";

export const doSetSelectItemValueAtom = atom(
    null,
    (get, set, ctx: MFormCtx, idx: number, value: boolean | ((v: boolean) => boolean)) => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrent(ctx, get, set);
        }

        const chunks = get(ctx.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        if (currentAtom) {
            value = typeof value === "function" ? value(get(currentAtom)) : value;
            set(currentAtom, value);
            set(ctx.selectedIdxStoreAtom, value ? idx : -1);
        }
    }
);

export function deselectCurrent(ctx: MFormCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.chunksAtom);

    const current = chunks[currentIdx]?.selectedAtom;
    current && set(current, false);
}
