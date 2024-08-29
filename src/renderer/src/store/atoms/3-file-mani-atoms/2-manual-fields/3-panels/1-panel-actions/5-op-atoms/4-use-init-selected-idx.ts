import { useCallback } from "react";
import type { Getter, Setter } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { selectedIdxAtom } from "./1-selected-item";
import { doSelectItemAtom } from "./2-do-select-item-atom";

export function useInitSelectedIdx() {
    const cb = useAtomCallback(
        useCallback(
            (get: Getter, set: Setter) => {
                set(doSelectItemAtom, get(selectedIdxAtom), true);
            }, []
        )
    );
    return cb;
}
