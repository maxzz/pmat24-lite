import { atom } from "jotai";
import { type FceCtx, type FceItem } from "@/store/1-atoms/4-field-catalogs";

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

        const itemIdx = scrollToIdx ?? get(fceCtx.selectedIdxStoreAtom);
        
        const shownItems = get(fceCtx.shownAtom);
        const selectedItem = shownItems[itemIdx];

        if (itemIdx === -1 || !selectedItem) {
            return;
        }

        const parent = container.querySelector(`[data-radix-scroll-area-viewport]`);
        const itemDom = container.querySelector(`[data-list-uiid="${selectedItem.fceMeta.uuid}"]`);

        if (!parent || !itemDom) {
            return;
        }

        const itemTop = itemIdx * itemDom.clientHeight;

        // already visible; reduce parent height to fit the last item
        const parentTop = parent.scrollTop;
        if (itemTop >= parentTop && itemTop <= parentTop + parent.clientHeight - itemDom.clientHeight) {
            return selectedItem;
        }

        // item is below the viewport
        if (itemTop > parent.clientHeight - itemDom.clientHeight) {
            parent.scrollTop = itemIdx * itemDom.clientHeight - parent.clientHeight / 2;
        }

        return selectedItem;
    }
);

// TODO: we can use this to scroll to the selected item, but not used since we need to track the container size change and activation moment
const doScrollToOffsetAtom = atom(null,
    (get, set, { container, fceCtx }: Omit<doScrollToItemAtomProps, 'scrollToIdx'>): void => {
        if (!container) {
            return;
        }

        const items = get(fceCtx.shownAtom);
        if (!items.length) {
            return;
        }

        const parent = container.querySelector(`[data-radix-scroll-area-viewport]`);
        if (!parent) {
            return;
        }

        parent.scrollTop = fceCtx.scrollTo;
    }
);

//TODO: when the last (or first when list is scrolled) in view item is selected, we scroll hit to the middle, but this is wrong
