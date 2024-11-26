import { atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "../../9-types";
import { setSelectedProps } from "./4-update-selected-props";

/**
 * Select item by index
 */
export const doSelectIdxAtom = atom(
    null,
    (get, set, ctx: FceCtx, idx: number, value: boolean | ((v: boolean) => boolean)): FceItem | undefined => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrentIdx(ctx, get, set);
        }

        const selectedName = ctx.isDlgCtx ? 'selectedDlg' : 'selectedView';

        const items = get(ctx.fceAtoms.shownAtom);

        const current = items[idx];
        if (current) {
            current.editor[selectedName] = typeof value === "function" ? value(current.editor[selectedName]) : value;
            set(ctx.selectedIdxStoreAtom, current.editor[selectedName] ? idx : -1);
            setSelectedProps({ fceCtx: ctx, selectedItem: current, get, set });
        }

        return current;
    }
);

/**
 * Deselect current idx
 */
function deselectCurrentIdx(ctx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.fceAtoms.shownAtom);

    const current = chunks[currentIdx];
    if (current) {
        const selectedName = ctx.isDlgCtx ? 'selectedDlg' : 'selectedView';

        current.editor[selectedName] = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}

/**
 * Set the initial selected item index
 */
export const doSetInitSelectedIdxAtom = atom(null,
    (get, set, { fceCtx }: { fceCtx: FceCtx; }) => {
        const items = get(fceCtx.fceAtoms.shownAtom);
        const idx = items.findIndex(item => item.editor.selectedDlg);
        set(fceCtx.selectedIdxStoreAtom, idx);
    }
);

/**
 * Has selected 
 */
export const hasSelectedItemAtom = atom(
    (get) => ({ fceCtx }: { fceCtx: FceCtx; }) => {
        const selectedItem = get(fceCtx.selectedItemAtom);
        return !!selectedItem;
    }
);
