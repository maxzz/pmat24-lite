import { useCallback } from "react";
import type { Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./1-select-atoms";

export function useInitSelectedIdx(cnt: MFormCnt) {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter) => {
                set(doSetSelectItemValueAtom, cnt, get(cnt.selectedIdxStoreAtom), true);
            }, []
        )
    );
    return cb;
}
