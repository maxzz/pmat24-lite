import { type HTMLAttributes, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { ScrollArea } from "@/ui/shadcn";
import useResizeObserver from "use-resize-observer";
import { classNames } from "@/utils";
import { doScrollToItemAtom, type FceCtx } from "@/store";
import { FldCatItemsBody } from "./1-body";

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    const doScrollToSelected = useSetAtom(doScrollToItemAtom);
    const doSetSelectItem = useSetAtom(fceCtx.selectedItemAtom);
    useEffect(
        () => {
            doSetSelectItem(doScrollToSelected({ container: refRoot.current, fceCtx }));
        }, [refRoot.current]
    );

    const selectedItem = useAtomValue(fceCtx.selectedItemAtom);
    useEffect(
        () => {
            doScrollToSelected({ container: refRoot.current, fceCtx });
        }, [selectedItem]
    );

    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 py-px flex flex-col`} ref={(elm) => { refRootCb(elm); refRoot.current = elm; }}>
                <ScrollArea style={{ width, height }}>

                    <FldCatItemsBody
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none select-none")}
                        tabIndex={0}
                        fceCtx={fceCtx}
                    />

                </ScrollArea>
            </div>
        </div>
    );
}
