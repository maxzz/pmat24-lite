import { atom } from "jotai";
import { type FceCtx, type FceItem } from "@/store";

type doScrollToItemAtomProps = {
    container: HTMLElement | null;
    fceCtx: FceCtx;
    scrollToIdx?: number; // scrool to item, if not provided, then scroll to selected item
};

export const doScrollToItemAtom = atom(null,
    (get, set, { container, fceCtx, scrollToIdx }: doScrollToItemAtomProps): FceItem | undefined => {
        if (!container) {
            return;
        }

        const items = get(fceCtx.fceAtoms.itemsAtom);
        const itemIdx = scrollToIdx ?? get(fceCtx.selectedIdxStoreAtom);
        const selectedItem = items[itemIdx];

        if (!items.length || itemIdx === -1 || !selectedItem) {
            return;
        }

        const parent = container.querySelector(`[data-radix-scroll-area-viewport]`);
        const itemDom = container.querySelector(`[data-list-uiid="${selectedItem.uuid}"]`);

        if (!parent || !itemDom) {
            return;
        }

        const top = itemIdx * itemDom.clientHeight;
        if (top > parent.clientHeight - itemDom.clientHeight) {
            parent.scrollTop = itemIdx * itemDom.clientHeight - parent.clientHeight / 2;
        }

        return selectedItem;
    }
);
