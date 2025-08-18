import { type HTMLAttributes, type ReactNode, useCallback, useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { type FceCtx, doScrollToItemAtom } from "@/store/3-field-catalog-atoms";
import { FldCatItemsBody } from "./1-body";

export function FldCatItemsGrid(props: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <FceScrollArea {...props}>
            <FldCatItemsBody
                className={classNames("grid grid-cols-[minmax(32px,auto)_auto_minmax(0px,1fr)] outline-none select-none")}
                tabIndex={0}
                fceCtx={props.fceCtx}
            />
        </FceScrollArea>
    );
}

function FceScrollArea({ fceCtx, className, children, ...rest }: { fceCtx: FceCtx; children: ReactNode; } & HTMLAttributes<HTMLDivElement>) {
    const { ref: refForSize, width, height } = useResizeObserver();
    const { ref: refForScroll } = useScrollToSelected(fceCtx);
    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 py-px flex flex-col`} ref={(elm) => { refForSize(elm); refForScroll(elm); }}>
                <ScrollArea style={{ width, height }}>
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}

function useScrollToSelected<T extends HTMLElement>(fceCtx: FceCtx): { ref: (elm: T | null) => void; } {
    const ref = useRef<T | null>(null);
    const doScrollToSelected = useSetAtom(doScrollToItemAtom);
    const [selectedItem, doSetSelectItem] = useAtom(fceCtx.selectedItemAtom);

    useEffect(
        () => {
            const newItem = doScrollToSelected({ container: ref.current, fceCtx });
            doSetSelectItem(newItem);
        }, [ref.current]
    );

    useEffect(
        () => {
            doScrollToSelected({ container: ref.current, fceCtx }); //TODO: we can do it inside specialized fceCtx.selectedItemAtom
        }, [selectedItem]
    );

    const refCb = useCallback((elm: T | null) => {
        ref.current = elm;
    }, []);

    return { ref: refCb };
}
