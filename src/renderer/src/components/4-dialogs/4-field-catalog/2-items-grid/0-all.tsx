import { type HTMLAttributes, useEffect, useRef } from "react";
import { useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import useResizeObserver from "use-resize-observer";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui/shadcn";
import { FldCatItemsBody } from "./1-body";
import { doScrollToItemAtom } from "./4-do-scroll-to-item";

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    const doScrollToSelected = useSetAtom(doScrollToItemAtom);
    const doSetSelectItem = useSetAtom(fceCtx.selectedItemAtom);
    useEffect(
        () => doSetSelectItem(doScrollToSelected({ container: refRoot.current, fceCtx })), [refRoot.current]
    );

    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 py-px flex flex-col`} ref={(elm) => { refRootCb(elm); refRoot.current = elm; }}>
                <ScrollArea style={{ width, height }}>

                    <FldCatItemsBody
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none")}
                        tabIndex={0}
                        fceCtx={fceCtx}
                    />

                </ScrollArea>
            </div>
        </div>
    );
}
