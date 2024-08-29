import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";
import { kbdToIndex } from "./b-kbd-to-index";
import { selectedIdxAtom } from "./1-selected-item";

export const doSelectByKbdAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, keyName: string) => {
        const idx = get(ctx.selectedIdxStoreAtom);
        const chunks = get(ctx.chunksAtom);
        
        const newIdx = kbdToIndex(idx, chunks.length, keyName);
        newIdx !== undefined && set(selectedIdxAtom, ctx, newIdx);
    }
);
