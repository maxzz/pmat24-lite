import { useCallback } from "react";
import type { Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { type MFormCtx } from "@/store/atoms/3-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./1-select-atoms";

export function useInitSelectedIdx(ctx: MFormCtx) {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter) => {
                set(doSetSelectItemValueAtom, ctx, get(ctx.selectedIdxStoreAtom), true);
            }, []
        )
    );
    return cb;
}
