import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";
import { doSelectIdxAtom } from "./1-do-select-idx";

export const doDeleteItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idx: number) => {
        const chunks = get(ctx.chunksAtom);
        const newChunks = [...chunks];
        newChunks.splice(idx, 1);
        set(ctx.chunksAtom, newChunks);

        const newIdx = Math.max(0, Math.min(idx, newChunks.length - 1));
        set(doSelectIdxAtom, ctx, newIdx);
    }
);
