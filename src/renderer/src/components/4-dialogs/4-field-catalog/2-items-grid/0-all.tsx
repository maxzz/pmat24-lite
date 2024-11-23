import { type HTMLAttributes, type ReactNode, type RefObject, useCallback, useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { doScrollToItemAtom, type FceCtx } from "@/store";
import { FldCatItemsBody } from "./1-body";

function FldCatItemsGridGuarded({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {

    const { ref: refRootCb, width, height } = useResizeObserver();

    // const refRoot = useRef<HTMLDivElement | null>(null);

    // const doScrollToSelected = useSetAtom(doScrollToItemAtom);

    // const [selectedItem, doSetSelectItem] = useAtom(fceCtx.selectedItemAtom);

    // useEffect(
    //     () => {
    //         doSetSelectItem(doScrollToSelected({ container: refRoot.current, fceCtx }));
    //     }, [refRoot.current]
    // );

    // useEffect(
    //     () => {
    //         doScrollToSelected({ container: refRoot.current, fceCtx });
    //     }, [selectedItem]
    // );
    const { ref: refRoot } = useScrollToSelected(fceCtx);

    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 py-px flex flex-col`} ref={(elm) => { refRootCb(elm); refRoot(elm); }}>
                <ScrollArea style={{ width, height }}>

                    {/* <FldCatItemsBody
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none select-none")}
                        tabIndex={0}
                        fceCtx={fceCtx}
                    /> */}
                    <GridBody fceCtx={fceCtx} />

                </ScrollArea>
            </div>
        </div>
    );
}

export function FldCatItemsGrid({ fceCtx, className, ...rest }: { fceCtx: FceCtx; } & HTMLAttributes<HTMLDivElement>) {
    return (
        <FldCatItemsGridGuard fceCtx={fceCtx} className={className} {...rest}>
            <GridBody fceCtx={fceCtx} />
        </FldCatItemsGridGuard>
    );
}

function FldCatItemsGridGuard({ fceCtx, className, children, ...rest }: { fceCtx: FceCtx; children: ReactNode; } & HTMLAttributes<HTMLDivElement>) {
    const { ref: refRootCb, width, height } = useResizeObserver();
    const { ref: refRoot } = useScrollToSelected(fceCtx);
    return (
        <div className={classNames("relative w-full", className)} {...rest}>
            <div className={`absolute inset-0 py-px flex flex-col`} ref={(elm) => { refRootCb(elm); refRoot(elm); }}>
                <ScrollArea style={{ width, height }}>
                    {children}
                </ScrollArea>
            </div>
        </div>
    );
}

function GridBody({ fceCtx }) {
    return (
        <FldCatItemsBody
            className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none select-none")}
            tabIndex={0}
            fceCtx={fceCtx}
        />
    );
}

//TODO: move to hook state from FldCatItemsGrid to reduce rerenders

function useScrollToSelected<T extends HTMLElement>(fceCtx: FceCtx): { ref: (elm: T | null) => void; } {
    const ref = useRef<T | null>(null);

    const doScrollToSelected = useSetAtom(doScrollToItemAtom);

    const [selectedItem, doSetSelectItem] = useAtom(fceCtx.selectedItemAtom);

    useEffect(
        () => {
            doSetSelectItem(doScrollToSelected({ container: ref.current, fceCtx }));
        }, [ref.current]
    );

    useEffect(
        () => {
            doScrollToSelected({ container: ref.current, fceCtx });
        }, [selectedItem]
    );

    const refCb = useCallback((elm: T | null) => {
        ref.current = elm;
    }, []);

    return { ref: refCb };
}
