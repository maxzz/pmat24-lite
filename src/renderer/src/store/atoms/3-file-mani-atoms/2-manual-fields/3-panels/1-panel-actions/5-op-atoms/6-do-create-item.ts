import { atom } from "jotai";
import { type ChunkKey } from "@/store/manifest";
import { deselectCurrent, type MFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { createScriptItem } from "../../../2-create-new-chunk";
import { doSelectIdxAtom } from "./1-do-select-idx";
import { clamp } from "@/utils";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: MFormCtx, type: ChunkKey, password: boolean) => {
        const newItem = createScriptItem(type, password, ctx.onChangeItem);

        let selectedIdx = get(ctx.selectedIdxStoreAtom);

        deselectCurrent(ctx, get, set);

        const chunks = get(ctx.chunksAtom);

        //selectedIdx = Math.min(selectedIdx + 1, Math.max(0, chunks.length - 1));
        selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

        const newChunks = [...chunks];
        newChunks.splice(selectedIdx, 0, newItem);

        set(ctx.chunksAtom, newChunks);

        set(doSelectIdxAtom, ctx, selectedIdx);
    }
);

// export const doCreateItemAtom = atom(
//     null,
//     (get, set, ctx: MFormCtx, type: ChunkKey, password: boolean) => {
//         const newItem = createScriptItem(type, password, ctx.onChangeItem);

//         const chunks = get(ctx.chunksAtom);
//         const newChunks = [...chunks];
//         newChunks.push(newItem);
//         set(ctx.chunksAtom, newChunks);

//         set(doSelectIdxAtom, ctx, newChunks.length - 1);
//     }
// );
