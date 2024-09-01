import { atom } from "jotai";
import { swap, swapImmutable } from "@/utils";
import { ManualEditorState } from "../../../9-types";
import { doSetSelectItemValueAtom } from "./2-do-set-select-item-value";

export const doSwapItemsAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idxCurrent: number, idxNew: number) => {
        const chuncks = get(ctx.chunksAtom);
        if (idxNew < 0 || idxNew >= chuncks.length) {
            return;
        }

        const newChunks = swapImmutable(chuncks, idxCurrent, idxNew);
        set(ctx.chunksAtom, newChunks);

        set(doSetSelectItemValueAtom, ctx, idxNew, true);
    }
);
