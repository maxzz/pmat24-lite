import { atom } from "jotai";
import { type ChunkKey } from "@/store/manifest";
import { type MFormCtx } from "@/store/1-atoms/2-file-mani-atoms/9-types";
import { createScriptItem } from "../../../2-create-new-chunk";
import { clamp } from "@/utils";
import { deselectCurrent, doSelectIdxAtom } from "./1-select-atoms";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: MFormCtx, type: ChunkKey, password: boolean) => {
        const newItem = createScriptItem(type, password, ctx.onChangeItem);

        deselectCurrent(ctx, get, set);

        const chunks = get(ctx.chunksAtom);

        let selectedIdx = get(ctx.selectedIdxStoreAtom);
        selectedIdx = clamp(selectedIdx + 1, 0, chunks.length - 1);

        const newChunks = [...chunks];
        newChunks.splice(selectedIdx, 0, newItem);

        set(ctx.chunksAtom, newChunks);

        set(doSelectIdxAtom, ctx, selectedIdx);
    }
);
