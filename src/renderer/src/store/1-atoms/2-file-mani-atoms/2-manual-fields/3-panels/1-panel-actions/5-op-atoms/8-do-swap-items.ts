import { atom } from "jotai";
import { type MFormCtx } from "@/store/1-atoms/2-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./1-select-atoms";
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
