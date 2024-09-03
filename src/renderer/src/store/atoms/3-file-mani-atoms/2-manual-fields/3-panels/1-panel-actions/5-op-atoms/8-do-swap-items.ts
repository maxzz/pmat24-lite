import { atom } from "jotai";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./2-do-set-select-item-value";
import { swapImmutable } from "@/utils";

export const doSwapItemsAtom = atom(
    null,
    (get, set, ctx: MFormCtx, idxCurrent: number, idxNew: number) => {
        const chuncks = get(ctx.chunksAtom);
        if (idxNew < 0 || idxNew >= chuncks.length) {
            return;
        }

        const newChunks = swapImmutable(chuncks, idxCurrent, idxNew);
        set(ctx.chunksAtom, newChunks);

        set(doSetSelectItemValueAtom, ctx, idxNew, true);
    }
);
