import { type Atom, atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { createEmptyValueLife } from "@/store/manifest";
import { FieldTyp } from "@/store/manifest";

/**
 * Select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, { fceCtx, idx, doubleClick }: { fceCtx: FceCtx, idx: number, doubleClick: boolean; }): FceItem | undefined => {
        const currentIdx = get(fceCtx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrentIdx(fceCtx, get, set);
        }

        const items = get(fceCtx.showAtom);

        const newItem = items[idx];
        if (newItem) {
            newItem.editor[fceCtx.isDlgCtx ? 'isSelectedInDlg' : 'isSelectedInView'] = true;
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
function deselectCurrentIdx(ctx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.showAtom);

    const current = chunks[currentIdx];
    if (current) {
        current.editor[ctx.isDlgCtx ? 'isSelectedInDlg' : 'isSelectedInView'] = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}

/**
 * Set selected item properties
 */
type SetSelectedPropsProps = {
    fceCtx: FceCtx;
    selectedItem: FceItem | undefined;
    get: Getter;
    set: Setter;
};

const emptyValueLife = createEmptyValueLife({ fType: FieldTyp.edit }); // This should not be changed since UI will be hidden

export function setSelectedProps({ fceCtx, selectedItem, get, set }: SetSelectedPropsProps) {
    const { nameAtom, valueAtom, ownernoteAtom, valueLifeAtom } = fceCtx.fcePropAtoms;

    set(nameAtom, selectedItem?.fieldValue.displayname || '');
    set(valueAtom, selectedItem?.fieldValue.value || '');
    set(ownernoteAtom, selectedItem?.fieldValue.ownernote || '');
    set(valueLifeAtom, selectedItem?.fieldValue || emptyValueLife);
}

/**
 * Set the initial selected item index
 */
export const doSetInitSelectedItemAtom = atom(null,
    (get, set, { fceCtx }: { fceCtx: FceCtx; }) => {
        const openMainDlg = !fceCtx.inData?.openSelectItemDlg; //TODO: implement logic item.editor.isSelectedInDlg or item.editor.isSelectedInView

        const items = get(fceCtx.showAtom);
        const idx = items.findIndex(item => item.editor.isSelectedInDlg);
        set(fceCtx.selectedIdxStoreAtom, idx);
    }
);

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
