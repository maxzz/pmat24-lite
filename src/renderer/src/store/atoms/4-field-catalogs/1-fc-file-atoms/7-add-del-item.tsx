import { atom } from "jotai";
import { type FceItem, type FceCtx } from "@/store";
import { createEmptyFceItem, FieldTyp } from "@/store/manifest";
import { doSelectIdxAtom } from "./4-do-set-selected";
import { setManiChanges } from "../../3-file-mani-atoms";

export const doAddItemAtom = atom(
    null,
    (get, set, fceCtx: FceCtx, fType: FieldTyp): FceItem | undefined => {
        const newItem = createEmptyFceItem(fType);

        let items = [...get(fceCtx.fceAtoms.itemsAtom), newItem];

        newItem.fceMeta.index = items.length - 1;
        newItem.beforeEdit.displayname = `New ${fType === FieldTyp.edit ? 'text' : 'password'} ${newItem.fceMeta.index + 1}`;
        newItem.fieldValue.displayname = newItem.beforeEdit.displayname;

        set(fceCtx.fceAtoms.itemsAtom, items);

        set(doSelectIdxAtom, fceCtx, items.length - 1, true);
        set(fceCtx.selectedItemAtom, newItem);

        setManiChanges(fceCtx.fceAtoms, true, `add-${newItem.fceMeta.uuid}`);

        return newItem;
    }
);

export const doDeleteItemIdxAtom = atom(
    null,
    (get, set, fceCtx: FceCtx, idx: number) => {
        let items = get(fceCtx.fceAtoms.itemsAtom);
        const item = items[idx];

        if (!item) {
            return;
        }

        items = items.slice(idx, idx + 1);

        set(fceCtx.fceAtoms.itemsAtom, items);

        const newIdx = idx > 0 ? idx - 1 : 0;
        set(doSelectIdxAtom, fceCtx, newIdx, true);
        set(fceCtx.selectedItemAtom, undefined);

        const changesSet = fceCtx.fceAtoms.fileUs.fileCnt.changesSet;
        const hasAdd = changesSet.has(`add-${item.fceMeta.uuid}`);
        if (hasAdd) {
            changesSet.delete(`add-${item.fceMeta.uuid}`);
        } else {
            changesSet.add(`del-${item.fceMeta.uuid}`);
        }
    }
);
