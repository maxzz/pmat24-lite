import { type HTMLAttributes, useEffect, useRef } from "react";
import { atom, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";

const doScrollToSelectedAtom = atom(null,
    (get, set, { container, fceCtx }: { container: HTMLDivElement | null; fceCtx: FceCtx; }) => {
        if (!container) {
            return;
        }

        // console.log('Scroll to selected 1');

        const items = get(fceCtx.fceAtoms.itemsAtom);
        if (!items.length) {
            return;
        }

        // console.log('Scroll to selected 11');

        const selectedItem = items[get(fceCtx.selectedIdxStoreAtom)];
        if (!selectedItem) {
            return;
        }

        // console.log('Scroll to selected 2');

        const itemDom = container.querySelector(`[data-list-uiid="${selectedItem.uuid}"]`);
        if (!itemDom) {
            return;
        }

        console.log('Scroll to selected 3');

        const itemRect = itemDom.getBoundingClientRect();

        const parent = itemDom.parentElement;
        if (!parent) {
            return;
        }

        console.log('Scroll to selected 4');

        const parentRect = parent.getBoundingClientRect();
        if (!parentRect) {
            return;
        }

        console.log('Scroll to selected 5');

        container.scrollTo({
            top: itemRect.top - parentRect.top - container.clientHeight / 2,
            behavior: 'smooth',
        });
    }
);
//         container.scrollTo({
//             top: itemRect.top - container.clientHeight / 2,
//             behavior: 'smooth',
//         });
//     }
// );

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    const doScrollToSelected = useSetAtom(doScrollToSelectedAtom);

    useEffect(() => {
        try {
            doScrollToSelected({ container: refRoot.current, fceCtx });
        } catch (e) {
            console.error(e);
        }
    }, [refRoot.current]);

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
