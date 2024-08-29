import { atom } from "jotai";
import { gScriptState } from "../2-script-state";
import { _selectedIdxStoreAtom } from "./0-selected-idx-store-atom";
import { deselectCurrent } from "./5-deselect-current";

export const selectedIdxAtom = atom(
    (get) => get(_selectedIdxStoreAtom).selectedIdx,
    (get, set, idx: number) => {
        deselectCurrent(get, set);

        const current = gScriptState.scriptItems[idx]?.unsaved.selectedAtom;
        current && set(current, true);

        const _selectedIdxStore = get(_selectedIdxStoreAtom);
        set(_selectedIdxStoreAtom, { ..._selectedIdxStore, selectedIdx: idx });
    }
);
