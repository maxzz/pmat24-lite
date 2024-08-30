import { useCallback } from "react";
import type { Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { doSetSelectItemAtom } from "./2-do-set-select-item";
import { ManualEditorState } from "../../../9-types";

export function useInitSelectedIdx(ctx: ManualEditorState.ScriptAtoms) {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter) => {
                set(doSetSelectItemAtom, ctx, get(ctx.selectedIdxStoreAtom), true);
            }, []
        )
    );
    return cb;
}
