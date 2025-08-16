import { useCallback } from "react";
import { useAtomCallback } from "jotai/utils";
import { type MFormCnt } from "@/store/2-file-mani-atoms";
import { doSetSelectItemValueAtom } from "./1-select-atoms";

export function useInitSelectedIdx(cnt: MFormCnt) {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter): void => {
                set(doSetSelectItemValueAtom, cnt, get(cnt.selectedIdxStoreAtom), true);
            }, []
        )
    );
    return cb;
}
