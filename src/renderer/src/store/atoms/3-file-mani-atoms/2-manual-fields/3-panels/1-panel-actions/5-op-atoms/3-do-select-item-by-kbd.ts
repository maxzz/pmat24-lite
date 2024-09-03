import { atom } from "jotai";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { kbdToIndex } from "./b-kbd-to-index";
import { doSelectIdxAtom } from "./1-do-select-idx";

export const doSelectByKbdAtom = atom(
    null,
    (get, set, ctx: MFormCtx, keyName: string) => {
        const idx = get(ctx.selectedIdxStoreAtom);
        const chunks = get(ctx.chunksAtom);

        const newIdx = kbdToIndex(idx, chunks.length, keyName);
        newIdx !== undefined && set(doSelectIdxAtom, ctx, newIdx);
    }
);
