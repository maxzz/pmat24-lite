import type { Getter, Setter } from "jotai";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";

export function deselectCurrent(ctx: MFormCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.chunksAtom);

    const current = chunks[currentIdx]?.selectedAtom;
    current && set(current, false);
}
