import { atom } from "jotai";
import { type FceItem, type FceCtx } from "@/store";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { hasFileUsChange, setFileUsChangeFlag } from "../../../3-file-mani-atoms";
import { doSelectIdxAtom } from "./1-do-set-selected";
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

        set(doSelectIdxAtom, {fceCtx, idx: newIdx, doubleClick: false});
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        setFileUsChangeFlag(fceCtx.fceAtoms, true, `add-${newItem.fceMeta.uuid}`);

        return newItem;
    }
);

export const doDeleteSelectedItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx) => {

        const fceAtoms = fceCtx.fceAtoms;
        const items = get(fceCtx.showAtom);
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

        set(doSelectIdxAtom, {fceCtx, idx: newIdx, doubleClick: false});
        set(fceCtx.selectedItemAtom, newItem);

        // update file changes

        const uuid = currentfceItem.fceMeta.uuid;

        if (hasFileUsChange(fceAtoms, `add-${uuid}`)) {
            setFileUsChangeFlag(fceAtoms, false, `add-${uuid}`);

            setFileUsChangeFlag(fceAtoms, false, `name-${uuid}`);
            setFileUsChangeFlag(fceAtoms, false, `note-${uuid}`);
            setFileUsChangeFlag(fceAtoms, false, `life-${uuid}`);
        } else {
            setFileUsChangeFlag(fceAtoms, true, `del-${uuid}`);
        }
    }
);
