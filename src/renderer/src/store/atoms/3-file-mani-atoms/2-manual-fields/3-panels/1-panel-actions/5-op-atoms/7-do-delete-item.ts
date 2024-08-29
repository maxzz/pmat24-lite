import { atom } from "jotai";
import { gScriptState } from "../2-script-state";
import { selectedIdxAtom } from "./1-selected-item";

export const doDeleteItemAtom = atom(
    null,
    (get, set, idx: number) => {
        gScriptState.scriptItems.splice(idx, 1);

        const newIdx = Math.max(0, Math.min(idx + 1, gScriptState.scriptItems.length - 1));
        set(selectedIdxAtom, newIdx);
    }
);
