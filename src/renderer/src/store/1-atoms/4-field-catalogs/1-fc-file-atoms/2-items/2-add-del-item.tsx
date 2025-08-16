import { atom } from "jotai";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { type FceItem, type FceCtx } from "@/store/1-atoms/4-field-catalogs";
import { fileUsChanges } from "@/store/2-file-mani-atoms";
import { doSelectIdxFcAtom } from "./1-do-set-selected";
import { removeLinksToFceItemAtom } from "./5-file-us-refs-to-fc";

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

        set(doSelectIdxFcAtom, {fceCtx, idx: newIdx, doubleClick: false});
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        fileUsChanges.set(fceCtx.fceAtoms, true, `add-${newItem.fceMeta.uuid}`);

        return newItem;
    }
);

export const doDeleteSelectedItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx) => {

        const fceAtoms = fceCtx.fceAtoms;
        const items = get(fceCtx.shownAtom);
        const idx = get(fceCtx.selectedIdxStoreAtom);
        const currentfceItem = items[idx];

        if (!currentfceItem) {
            return;
        }

        set(removeLinksToFceItemAtom, { fceItem: currentfceItem });

        const allItems = get(fceAtoms.allAtom);
        const newItems = allItems.filter((item) => item.fceMeta.uuid !== currentfceItem.fceMeta.uuid);
        set(fceAtoms.allAtom, newItems);

        // select previous item if exists, otherwise select the next item or select nothing

        const newIdx = idx > 0
            ? idx - 1
            : idx <= newItems.length - 1
                ? idx
                : -1;

        const newItem = newItems[newIdx];

        set(doSelectIdxFcAtom, {fceCtx, idx: newIdx, doubleClick: false});
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        const uuid = currentfceItem.fceMeta.uuid;

        if (fileUsChanges.hasChange(fceAtoms, `add-${uuid}`)) {
            fileUsChanges.set(fceAtoms, false, `add-${uuid}`);

            fileUsChanges.set(fceAtoms, false, `name-${uuid}`);
            fileUsChanges.set(fceAtoms, false, `note-${uuid}`);
            fileUsChanges.set(fceAtoms, false, `life-${uuid}`);
        } else {
            fileUsChanges.set(fceAtoms, true, `del-${uuid}`);
        }
    }
);
