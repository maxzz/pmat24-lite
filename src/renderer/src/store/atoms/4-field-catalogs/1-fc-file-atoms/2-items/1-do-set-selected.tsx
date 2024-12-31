import { type Atom, atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { createEmptyValueLife } from "@/store/manifest";
import { FieldTyp } from "@/store/manifest";
import { printFceItems } from "../../3-fc-mru";

/**
 * Select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, { fceCtx, idx, doubleClick }: { fceCtx: FceCtx, idx: number, doubleClick: boolean; }): FceItem | undefined => {

        const previousIdx = get(fceCtx.selectedIdxStoreAtom);
        if (previousIdx !== idx) {
            deselectPreviousIdx(fceCtx, get, set);
        }

        const shownItems = get(fceCtx.shownAtom);

        const newItem = shownItems[idx];
        if (newItem) {
            newItem.editor[fceCtx.isPicker ? 'isSelectedInPicker' : 'isSelectedInView'] = true;
            set(fceCtx.selectedIdxStoreAtom, idx);
            set(fceCtx.selectedItemAtom, newItem);
            setSelectedProps({ fceCtx: fceCtx, selectedItem: newItem, get, set });
        }

        if (doubleClick) {
            fceCtx.onItemDoubleClick?.(newItem);
        }

        return newItem;
    }
);

/**
 * Deselect current idx
 */
function deselectPreviousIdx(fceCtx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(fceCtx.selectedIdxStoreAtom);
    const shownItems = get(fceCtx.shownAtom);

    const currentItem = shownItems[currentIdx];
    if (currentItem) {
        currentItem.editor[fceCtx.isPicker ? 'isSelectedInPicker' : 'isSelectedInView'] = false;
        set(fceCtx.selectedIdxStoreAtom, -1);
    }
}

/**
 * Set selected item properties
 */
const emptyValueLife = createEmptyValueLife({ fType: FieldTyp.edit }); // This should not be changed since UI will be hidden

function setSelectedProps({ fceCtx, selectedItem, get, set }: { fceCtx: FceCtx; selectedItem: FceItem | undefined; get: Getter; set: Setter; }) {
    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    set(nameAtom, selectedItem?.fieldValue.displayname || '');
    set(valueAtom, selectedItem?.fieldValue.value || '');
    set(ownernoteAtom, selectedItem?.fieldValue.ownernote || '');
    set(valueLifeAtom, selectedItem?.fieldValue || emptyValueLife);
}

/**
 * Has selected 
 */
export const createHasSelectedScopedAtom = (fceCtx: FceCtx): Atom<boolean> => {
    return atom(
        (get) => {
            const selectedItem = get(fceCtx.selectedItemAtom);
            return !!selectedItem;
        }
    );
};

/**
 * Set the initial selected item index
 */
export const doSetInitSelectedItemAtom = atom(null,
    (get, set, { fceCtx }: { fceCtx: FceCtx; }) => {

        const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
        if (!openMainDlg) {
            const dbid = fceCtx.inData?.dbid;
            if (dbid) {
                const shownItems = get(fceCtx.shownAtom);
                const idx = shownItems.findIndex(item => item.fieldValue.dbname === dbid);
                console.log('doSetInitSelectedItemAtom. idx', idx);
                printFceItems('shownItems', [shownItems[idx]]);

                set(doSelectIdxAtom, { fceCtx, idx, doubleClick: false });
                return;
            }
        }

        const shownItems = get(fceCtx.shownAtom);
        const idx = shownItems.findIndex(item => (item.editor[fceCtx.isPicker ? 'isSelectedInPicker' : 'isSelectedInView']));
        set(doSelectIdxAtom, { fceCtx, idx, doubleClick: false });
    }
);
