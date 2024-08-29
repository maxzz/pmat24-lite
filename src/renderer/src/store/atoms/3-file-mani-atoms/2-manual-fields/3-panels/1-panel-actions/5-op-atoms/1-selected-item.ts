import { atom } from "jotai";
import { ManualEditorState } from "../../../9-types";
import { deselectCurrent } from "./5-deselect-current";

export const selectedIdxAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idx: number) => {
        deselectCurrent(ctx, get, set);

        const chunks = get(ctx.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        currentAtom && set(currentAtom, true);

        set(ctx.selectedIdxStoreAtom, idx);
    }
);
