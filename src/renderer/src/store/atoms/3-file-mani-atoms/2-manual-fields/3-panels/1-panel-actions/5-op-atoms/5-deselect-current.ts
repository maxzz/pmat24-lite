import type { Getter, Setter } from "jotai";
import { ManualEditorState } from "../../../9-types";

export function deselectCurrent(ctx: ManualEditorState.ScriptAtoms, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.chunksAtom);

    const current = chunks[currentIdx]?.selectedAtom;
    current && set(current, false);
}
