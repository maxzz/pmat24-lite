import { atom, type Getter, type Setter } from "jotai";
import { type MFormCnt } from "@/store/1-atoms/2-file-mani-atoms";
import { kbdToIndex } from "./b-kbd-to-index";

/**
 * select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, cnt: MFormCnt, idx: number) => {
        deselectCurrent(cnt, get, set);

        const chunks = get(cnt.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        currentAtom && set(currentAtom, true);

        set(cnt.selectedIdxStoreAtom, idx);
    }
);

/**
 * select item by index and set value
 */
export const doSetSelectItemValueAtom = atom(
    null,
    (get, set, cnt: MFormCnt, idx: number, value: boolean | ((v: boolean) => boolean)) => {
        const currentIdx = get(cnt.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrent(cnt, get, set);
        }

        const chunks = get(cnt.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        if (currentAtom) {
            value = typeof value === "function" ? value(get(currentAtom)) : value;
            set(currentAtom, value);
            set(cnt.selectedIdxStoreAtom, value ? idx : -1);
        }
    }
);

/**
 * deselect current item
 */
export function deselectCurrent(cnt: MFormCnt, get: Getter, set: Setter) {
    const currentIdx = get(cnt.selectedIdxStoreAtom);
    const chunks = get(cnt.chunksAtom);

    const current = chunks[currentIdx]?.selectedAtom;
    current && set(current, false);
}

/**
 * select item by keyboard
 */
export const doSelectByKbdAtom = atom(
    null,
    (get, set, cnt: MFormCnt, keyName: string) => {
        const idx = get(cnt.selectedIdxStoreAtom);
        const chunks = get(cnt.chunksAtom);

        const newIdx = kbdToIndex(idx, chunks.length, keyName);
        newIdx !== undefined && set(doSelectIdxAtom, cnt, newIdx);
    }
);
