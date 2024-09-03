import { atom } from "jotai";
import { type ManualFormAtoms } from "@/store/atoms/3-file-mani-atoms";
import { deselectCurrent } from "./5-deselect-current";

export const doSetSelectItemValueAtom = atom(
    null,
    (get, set, ctx: ManualFormAtoms, idx: number, value: boolean | ((v: boolean) => boolean)) => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrent(ctx, get, set);
        }

        const chunks = get(ctx.chunksAtom);

        const currentAtom = chunks[idx]?.selectedAtom;
        if (currentAtom) {
            value = typeof value === "function" ? value(get(currentAtom)) : value;
            set(currentAtom, value);
            set(ctx.selectedIdxStoreAtom, value ? idx : -1);
        }
    }
);
