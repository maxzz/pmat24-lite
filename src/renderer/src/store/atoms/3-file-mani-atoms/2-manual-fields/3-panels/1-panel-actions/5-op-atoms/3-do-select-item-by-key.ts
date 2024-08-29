import { atom } from "jotai";
import { gScriptState } from "../2-script-state";
import { _selectedIdxStoreAtom } from "./0-selected-idx-store-atom";
import { keyToIndex } from "../../1-script-list-ops";
import { selectedIdxAtom } from "./1-selected-item";

export const doSelectByKeyAtom = atom(
    null,
    (get, set, keyName: string) => {
        const idx = get(_selectedIdxStoreAtom).selectedIdx;
        const newIdx = keyToIndex(idx, gScriptState.scriptItems.length, keyName);
        newIdx !== undefined && set(selectedIdxAtom, newIdx);
    }
);
