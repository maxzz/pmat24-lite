import { useEffect, useRef, type HTMLAttributes } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doSelectIdxAtom, type FceCtx } from "@/store";
import { FldCatItemRow, rowParentActiveClasses } from "./2-fld-cat-item-row";
import { classNames } from "@/utils";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

export function FldCatItemsBody({ fceCtx, className, ...rest }: FldCatItemsGridProps) {

    const filteredItems = useAtomValue(fceCtx.showAtom); // so far no, need to update other places //OK: const filteredItems = useAtomValue(filteredItemsAtom)(fceCtx);

    const doSelectIdx = useSetAtom(doSelectIdxAtom);
    const [focusGrid, setFocusGrid] = useAtom(fceCtx.focusGridAtom);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => ref.current?.focus(), [ref.current]
    );

    useEffect(
        () => {
            if (focusGrid) {
                setTimeout(() => ref.current?.focus(), 300); // "Add" button still has focus, so wait a bit. TODO: make it better on logn list.
                setFocusGrid(false);
            }
        }, [focusGrid]
    );

    function onClick(idx: number) {
        doSelectIdx(fceCtx, idx, false);
    }

    function onDoubleClick(idx: number) {
        doSelectIdx(fceCtx, idx, true);
        //fceCtx.onItemDoubleClick?.(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div ref={ref} className={classNames(rowParentActiveClasses, className)} {...rest}>
            {filteredItems.map(
                (item, idx) => (
                    <FldCatItemRow
                        idx={idx}
                        item={item}
                        isDlgCtx={fceCtx.isDlgCtx}
                        onClick={() => onClick(idx)}
                        onDoubleClick={() => onDoubleClick(idx)}
                        key={item.fceMeta.uuid}
                    />
                )
            )}
        </div>
    );
}
