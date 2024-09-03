import { atom } from "jotai";
import { type ChunkKey } from "@/store/manifest";
import { type ManualFormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { createScriptItem } from "../../../2-create-new-chunk";
import { doSelectIdxAtom } from "./1-do-select-idx";

export const doCreateItemAtom = atom(
    null,
    (get, set, ctx: ManualFormAtoms, type: ChunkKey, password: boolean) => {
        const newItem = createScriptItem(type, password, ctx.onChangeItem);

        const chunks = get(ctx.chunksAtom);
        const newChunks = [...chunks];
        newChunks.push(newItem);
        set(ctx.chunksAtom, newChunks);

        set(doSelectIdxAtom, ctx, newChunks.length - 1);
    }
);
