import { atom, type Getter, type Setter } from "jotai";
import { type MFormCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { kbdToIndex } from "./b-kbd-to-index";

/**
 * select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, ctx: MFormCtx, idx: number) => {
        deselectCurrent(ctx, get, set);

        const chunks = get(ctx.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        currentAtom && set(currentAtom, true);

        set(ctx.selectedIdxStoreAtom, idx);
    }
);

/**
 * select item by index and set value
 */
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

/**
 * deselect current item
 */
export function deselectCurrent(ctx: MFormCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.chunksAtom);

    const current = chunks[currentIdx]?.selectedAtom;
    current && set(current, false);
}

/**
 * select item by keyboard
 */
export const doSelectByKbdAtom = atom(
    null,
    (get, set, ctx: MFormCtx, keyName: string) => {
        const idx = get(ctx.selectedIdxStoreAtom);
        const chunks = get(ctx.chunksAtom);

        const newIdx = kbdToIndex(idx, chunks.length, keyName);
        newIdx !== undefined && set(doSelectIdxAtom, ctx, newIdx);
    }
);
