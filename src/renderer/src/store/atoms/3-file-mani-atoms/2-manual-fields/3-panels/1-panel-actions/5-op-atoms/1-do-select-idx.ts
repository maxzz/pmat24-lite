import { atom } from "jotai";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { deselectCurrent } from "./5-deselect-current";

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
