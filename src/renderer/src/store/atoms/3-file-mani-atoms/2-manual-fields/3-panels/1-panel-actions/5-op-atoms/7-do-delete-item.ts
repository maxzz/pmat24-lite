import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";

export const doDeleteItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idx: number) => {
        const chunks = get(ctx.chunksAtom);
        const newChunks = [...chunks];
        newChunks.splice(idx, 1);
        set(ctx.chunksAtom, newChunks);

        const newIdx = Math.max(0, Math.min(idx + 1, newChunks.length - 1));
        set(ctx.selectedIdxStoreAtom, newIdx);
    }
);
