import { type Atom, atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { setSelectedProps } from "./4-update-selected-props";

/**
 * Select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, ctx: FceCtx, idx: number): FceItem | undefined => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrentIdx(ctx, get, set);
        }

        const items = get(ctx.showAtom);

        const newItem = items[idx];
        if (newItem) {
            newItem.editor[ctx.isDlgCtx ? 'selectedDlg' : 'selectedView'] = true;
            set(ctx.selectedIdxStoreAtom, idx);

            set(ctx.selectedItemAtom, newItem);
            setSelectedProps({ fceCtx: ctx, selectedItem: newItem, get, set });
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
        current.editor[ctx.isDlgCtx ? 'selectedDlg' : 'selectedView'] = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}

/**
 * Set the initial selected item index
 */
export const doSetInitSelectedIdxAtom = atom(null,
    (get, set, { fceCtx }: { fceCtx: FceCtx; }) => {
        const items = get(fceCtx.showAtom);
        const idx = items.findIndex(item => item.editor.selectedDlg);
        set(fceCtx.selectedIdxStoreAtom, idx);
    }
);

/**
 * Has selected 
 */
export const createHasSelectedItemAtom = (fceCtx: FceCtx): Atom<boolean> => {
    return atom(
        (get) => {
            const selectedItem = get(fceCtx.selectedItemAtom);
            return !!selectedItem;
        }
    );
};
