import { atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "@/store";

export const doAddItemAtom = atom(
    null,
    (get, set, ctx: FceCtx, idx: number, value: boolean | ((v: boolean) => boolean)): FceItem | undefined => {
        const items = get(ctx.fceAtoms.itemsAtom);
        const item = items[idx];
        if (!item) {
            return;
        }
        const newItem = createEmptyFceItem();
        items.splice(idx, 0, newItem);
        set(ctx.fceAtoms.itemsAtom, items);
        return newItem;
    }
);
