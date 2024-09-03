import { useCallback } from "react";
import type { Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { type ManualFormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./2-do-set-select-item-value";

export function useInitSelectedIdx(ctx: ManualFormAtoms) {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter) => {
                set(doSetSelectItemValueAtom, ctx, get(ctx.selectedIdxStoreAtom), true);
            }, []
        )
    );
    return cb;
}
