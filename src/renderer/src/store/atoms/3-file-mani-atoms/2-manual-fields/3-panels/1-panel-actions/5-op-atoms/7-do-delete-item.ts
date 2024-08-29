import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";

export const doDeleteItemAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idx: number) => {
        const chunks = get(ctx.chunksAtom);
        chunks.splice(idx, 1);
        set(ctx.chunksAtom, chunks);

        const newIdx = Math.max(0, Math.min(idx + 1, chunks.length - 1));
        set(ctx.selectedIdxStoreAtom, newIdx);
    }
);
