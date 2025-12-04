import { type Atom, atom } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { createEmptyValueLife } from "@/store/8-manifest";
import { FieldTyp } from "@/store/8-manifest";

/**
 * Select item by index
 */
export const doSelectIdxFcAtom = atom(
    null,
    (get, set, { fceCtx, idx, doubleClick }: { fceCtx: FceCtx, idx: number, doubleClick: boolean; }): FceItem | undefined => {

        const previousIdx = get(fceCtx.selectedIdxStoreAtom);
        if (previousIdx !== idx) {
            deselectPreviousIdx(fceCtx, { get, set });
        }

        const shownItems = get(fceCtx.shownAtom);

        const newItem = shownItems[idx];
        if (newItem) {
            newItem.editor[fceCtx.isPicker ? 'isSelectedInPicker' : 'isSelectedInView'] = true;
            set(fceCtx.selectedIdxStoreAtom, idx);
            set(fceCtx.selectedItemAtom, newItem);
            setSelectedProps({ fceCtx, selectedItem: newItem, setOnly: { set } });
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
function deselectPreviousIdx(fceCtx: FceCtx, { get, set }: GetSet) {
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

function setSelectedProps({ fceCtx, selectedItem, setOnly: { set } }: { fceCtx: FceCtx; selectedItem: FceItem | undefined; setOnly: SetOnly; }) {
    const { dispNameAtom: nameAtom, ownernoteAtom/*, valueLifeAtom*/ } = fceCtx.fcePropAtoms;

    set(nameAtom, selectedItem?.fieldValue.displayname || '');
    set(ownernoteAtom, selectedItem?.fieldValue.ownernote || '');
    // set(valueLifeAtom, selectedItem?.fieldValue || emptyValueLife); // Here instead of setting ValueLife only we set FceItemValue that contains ValueLife. // this not part of fc anymore
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

        const shownItems = get(fceCtx.shownAtom);

        const openMainDlg = !fceCtx.inData?.openItemPickerDlg;
        const dbid = fceCtx.inData?.dbid;

        let idx: number | undefined;

        if (openMainDlg || !dbid) {
            idx = shownItems.findIndex(item => (item.editor[fceCtx.isPicker ? 'isSelectedInPicker' : 'isSelectedInView']));
        } else {
            idx = shownItems.findIndex(item => item.fieldValue.dbname === dbid);

            shownItems.forEach((item) => item.editor.isSelectedInPicker = false); // deselect all
        }

        set(doSelectIdxFcAtom, { fceCtx, idx, doubleClick: false });
    }
);
