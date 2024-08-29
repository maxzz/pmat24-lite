import { atom } from "jotai";
import { swap } from "@/utils";
import { ManualEditorState } from "../../../9-types";
import { doSelectItemAtom } from "./2-do-select-item";

export const doSwapItemsAtom = atom(
    null,
    (get, set, ctx: ManualEditorState.ScriptAtoms, idxCurrent: number, idxNew: number) => {
        const chuncks = get(ctx.chunksAtom);
        if (idxNew < 0 || idxNew >= chuncks.length) {
            return;
        }

        swap(chuncks, idxCurrent, idxNew);
        set(ctx.chunksAtom, chuncks);

        set(doSelectItemAtom, ctx, idxNew, true);
    }
);
