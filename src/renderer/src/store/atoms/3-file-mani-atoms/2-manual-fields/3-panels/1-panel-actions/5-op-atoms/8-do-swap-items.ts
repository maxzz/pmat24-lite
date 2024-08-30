import { atom } from "jotai";
import { swap } from "@/utils";
import { ManualEditorState } from "../../../9-types";
import { doSetSelectItemAtom } from "./2-do-set-select-item";

export const doSwapItemsAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idxCurrent: number, idxNew: number) => {
        const chuncks = get(ctx.chunksAtom);
        if (idxNew < 0 || idxNew >= chuncks.length) {
            return;
        }

        swap(chuncks, idxCurrent, idxNew);
        set(ctx.chunksAtom, chuncks);

        set(doSetSelectItemAtom, ctx, idxNew, true);
    }
);
