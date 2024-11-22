import { atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "@/store";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { doSelectIdxAtom } from "./4-do-set-selected";

export const doAddItemAtom = atom(
    null,
    (get, set, ctx: FceCtx, fType: FieldTyp): FceItem | undefined => {
        const newItem = createEmptyFceItem(fType);

        let items = [...get(ctx.fceAtoms.itemsAtom), newItem];

        newItem.fceMeta.index = items.length - 1;
        newItem.beforeEdit.displayname = `New ${fType === FieldTyp.edit ? 'text' : 'password'} ${newItem.fceMeta.index}`;
        newItem.fieldValue.displayname = newItem.beforeEdit.displayname;

        set(ctx.fceAtoms.itemsAtom, items);

        set(doSelectIdxAtom, ctx, items.length - 1, true);
        set(ctx.selectedItemAtom, newItem);
        
        return newItem;
    }
);
