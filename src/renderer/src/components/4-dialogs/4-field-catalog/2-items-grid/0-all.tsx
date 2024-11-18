import { type HTMLAttributes, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";
import { doScrollToSelectedAtom } from "./4-do-scroll-to-selected";
import { doSelectFceItemAtom } from "./3-do-set-selected";

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    const doScrollToSelected = useSetAtom(doScrollToSelectedAtom);
    const doSetSelectItem = useSetAtom(fceCtx.selectedItemAtom);
    useEffect(
        () => {
            const selectedItem = doScrollToSelected({ container: refRoot.current, fceCtx });
            selectedItem && doSetSelectItem(selectedItem);
        }, [refRoot.current]
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
