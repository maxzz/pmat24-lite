import { atom } from "jotai";
import { type FceItem, type FceCtx } from "@/store";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { doSelectIdxAtom } from "./1-do-set-selected";
import { hasManiChange, setManiChanges } from "../../../3-file-mani-atoms";

export const doAddItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx, fType: FieldTyp): FceItem | undefined => {
        const newItem = createEmptyFceItem(fType);

        const newItems = [...get(fceCtx.fceAtoms.allAtom), newItem];
        set(fceCtx.fceAtoms.allAtom, newItems);

        const newIdx = newItems.length - 1;
        const newName = `New ${fType === FieldTyp.edit ? 'text' : 'password'} ${newIdx + 1}`;

        newItem.fceMeta.index = newIdx;
        newItem.beforeEdit.displayname = newName;
        newItem.fieldValue.displayname = newName;

        set(doSelectIdxAtom, fceCtx, newIdx);
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
        const items = get(fceCtx.showAtom);
        const idx = get(fceCtx.selectedIdxStoreAtom);
        const currentItem = items[idx];

        if (!currentItem) {
            return;
        }

        const allItems = get(fceAtoms.allAtom);
        const newItems = allItems.filter((item) => item.fceMeta.uuid !== currentItem.fceMeta.uuid);
        set(fceAtoms.allAtom, newItems);

        // select previous item if exists, otherwise select the next item or select nothing

        const newIdx = idx > 0
            ? idx - 1
            : idx <= newItems.length - 1
                ? idx
                : -1;
                
        const newItem = newItems[newIdx];

        set(doSelectIdxAtom, fceCtx, newIdx);
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        const uuid = currentItem.fceMeta.uuid;

        if (hasManiChange(fceAtoms, `add-${uuid}`)) {
            setManiChanges(fceAtoms, false, `add-${uuid}`);

            setManiChanges(fceAtoms, false, `name-${uuid}`);
            setManiChanges(fceAtoms, false, `note-${uuid}`);
            setManiChanges(fceAtoms, false, `life-${uuid}`);
        } else {
            setManiChanges(fceAtoms, true, `del-${uuid}`);
        }
    }
);
