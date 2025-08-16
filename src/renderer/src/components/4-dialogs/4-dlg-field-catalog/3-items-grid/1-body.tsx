import { useEffect, useRef, type HTMLAttributes } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { classNames } from "@/utils";
import { type FceCtx, doSelectIdxFcAtom } from "@/store/3-field-catalog-atoms";
import { FldCatItemRow, rowParentActiveClasses } from "./2-fld-cat-item-row";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

export function FldCatItemsBody({ fceCtx, className, ...rest }: FldCatItemsGridProps) {

    const filteredItems = useAtomValue(fceCtx.shownAtom); // so far no, need to update other places //OK: const filteredItems = useAtomValue(filteredItemsAtom)(fceCtx);

    const doSelectIdxFc = useSetAtom(doSelectIdxFcAtom);
    const [focusGrid, setFocusGrid] = useAtom(fceCtx.focusGridAtom);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => ref.current?.focus(), [ref.current]
    );

    useEffect(
        () => {
            if (focusGrid) {
                setTimeout(() => ref.current?.focus(), 300); // "Add" button still has focus, so wait a bit. TODO: make it better on logon list.
                setFocusGrid(false);
            }
        }, [focusGrid]
    );

    function onClick(idx: number) {
        doSelectIdxFc({ fceCtx, idx, doubleClick: false });
    }

    function onDoubleClick(idx: number) {
        doSelectIdxFc({ fceCtx, idx, doubleClick: true });
    }

    return (
        <div ref={ref} className={classNames(rowParentActiveClasses, className)} {...rest}>
            {filteredItems.map(
                (fceItem, idx) => (
                    <FldCatItemRow
                        idx={idx}
                        fceItem={fceItem}
                        fceCtx={fceCtx}
                        onClick={() => onClick(idx)}
                        onDoubleClick={() => onDoubleClick(idx)}
                        key={fceItem.fceMeta.uuid}
                    />
                )
            )}
        </div>
    );
}
