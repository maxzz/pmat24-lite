import { type HTMLAttributes, useEffect, useRef } from "react";
import { atom, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";

const doScrollToSelectedAtom = atom(null,
    (get, set, { container, fceCtx }: { container: HTMLElement | null; fceCtx: FceCtx; }) => {
        if (!container) {
            return;
        }

        const items = get(fceCtx.fceAtoms.itemsAtom);
        const itemIdx = get(fceCtx.selectedIdxStoreAtom);
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
    }
);

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    const doScrollToSelected = useSetAtom(doScrollToSelectedAtom);

    useEffect(
        () => { doScrollToSelected({ container: refRoot.current, fceCtx }); }, [refRoot.current]
    );

    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 flex flex-col`} ref={(elm) => { refRootCb(elm); refRoot.current = elm; }}>
                <ScrollArea style={{ width, height }}>

                    <FldCatItemsBody
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none 1focus-within:ring ring-ring")}
                        tabIndex={0}
                        fceCtx={fceCtx}
                    />

                </ScrollArea>
            </div>
        </div>
    );
}
