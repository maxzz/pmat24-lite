import { atom, type Getter, type Setter } from "jotai";
import { type FceItem, type FceCtx } from "@/store";

export const doSelectIdxAtom = atom(
    null,
    (get, set, ctx: FceCtx, idx: number, value: boolean | ((v: boolean) => boolean)): FceItem | undefined => {
        const currentIdx = get(ctx.selectedIdxStoreAtom);
        if (currentIdx !== idx) {
            deselectCurrentIdx(ctx, get, set);
        }

        const selectedName = ctx.isDlgCtx ? 'selectedDlg' : 'selectedView';

        const items = get(ctx.fceAtoms.itemsAtom);

        const current = items[idx];
        if (current) {
            current.editor[selectedName] = typeof value === "function" ? value(current.editor[selectedName]) : value;
            set(ctx.selectedIdxStoreAtom, current.editor[selectedName] ? idx : -1);
        }

        return current;
    }
);

function deselectCurrentIdx(ctx: FceCtx, get: Getter, set: Setter) {
    const currentIdx = get(ctx.selectedIdxStoreAtom);
    const chunks = get(ctx.fceAtoms.itemsAtom);

    const current = chunks[currentIdx];
    if (current) {
        const selectedName = ctx.isDlgCtx ? 'selectedDlg' : 'selectedView';

        current.editor[selectedName] = false;
        set(ctx.selectedIdxStoreAtom, -1);
    }
}
