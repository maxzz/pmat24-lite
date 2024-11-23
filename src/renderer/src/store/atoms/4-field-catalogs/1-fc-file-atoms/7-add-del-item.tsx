import { atom } from "jotai";
import { type FceItem, type FceCtx } from "@/store";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { doSelectIdxAtom } from "./4-do-set-selected";
import { hasManiChange, setManiChanges } from "../../3-file-mani-atoms";

export const doAddItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx, fType: FieldTyp): FceItem | undefined => {
        const newItem = createEmptyFceItem(fType);

        const newItems = [...get(fceCtx.fceAtoms.itemsAtom), newItem];
        set(fceCtx.fceAtoms.itemsAtom, newItems);

        const newIdx = newItems.length - 1;
        const newName = `New ${fType === FieldTyp.edit ? 'text' : 'password'} ${newIdx + 1}`;

        newItem.fceMeta.index = newIdx;
        newItem.beforeEdit.displayname = newName;
        newItem.fieldValue.displayname = newName;

        set(doSelectIdxAtom, fceCtx, newIdx, true);
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        setManiChanges(fceCtx.fceAtoms, true, `add-${newItem.fceMeta.uuid}`);

        return newItem;
    }
);

export const doDeleteSelectedItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx) => {

        const fceAtoms = fceCtx.fceAtoms;
        const items = get(fceAtoms.itemsAtom);
        const idx = get(fceCtx.selectedIdxStoreAtom);
        const currentItem = items[idx];

        if (!currentItem) {
            return;
        }

        const newItems = items.filter((item) => item.fceMeta.uuid !== currentItem.fceMeta.uuid);
        set(fceAtoms.itemsAtom, newItems);

        // select previous item if exists, otherwise select the next item or select nothing

        const newIdx = idx > 0
            ? idx - 1
            : idx <= newItems.length - 1
                ? idx
                : -1;
                
        const newItem = newItems[newIdx];

        set(doSelectIdxAtom, fceCtx, newIdx, true);
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        const uuid = currentItem.fceMeta.uuid;

        if (hasManiChange(fceAtoms, `add-${uuid}`)) {
            setManiChanges(fceAtoms, false, `add-${uuid}`);
        } else {
            setManiChanges(fceAtoms, true, `del-${uuid}`);
        }
    }
);
