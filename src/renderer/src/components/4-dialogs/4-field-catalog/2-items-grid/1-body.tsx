import { type HTMLAttributes } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { doSelectFceItemAtom } from "./3-do-set-selected";
import { FldCatItemRow } from "./2-fld-cat-item-row";
import { classNames } from "@/utils";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

const parentActiveClasses = "[--parent-active:0] focus-within:[--parent-active:1]";

const parentActiveColorClasses = "\
[--parent-active-color:#37373d] \
\
[--parent-active-color-name:#909090] dark:[--parent-active-color-name:#04395e] \
\
[--outline-color:#007fd4] dark:[--outline-color:#f00] \
\
focus-within:[--parent-active-color:var(--parent-active-color-name)] \
1focus-within:[--parent-active-color:#04395e] \
";

export function FldCatItemsBody({ fceCtx, className, ...rest }: FldCatItemsGridProps) {
    const items = useAtomValue(fceCtx.fceAtoms.itemsAtom);
    const doSelectFceItem = useSetAtom(doSelectFceItemAtom);
    const setSelectedItem = useSetAtom(fceCtx.selectedItemAtom);

    function onClick(idx: number) {
        doSelectFceItem(fceCtx, idx, true);
        setSelectedItem(items[idx]);
        //setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx);
    }

    function onDoubleClick(idx: number) {
        setSelectedItem(items[idx]); 
        // setSelectedIdx(prevSelectedIdx.current);
        // fceCtx.onItemDoubleClick?.(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div className={classNames(parentActiveClasses, parentActiveColorClasses, className)} {...rest}>
            {items.map(
                (item, idx) => (
                    <FldCatItemRow
                        idx={idx}
                        item={item}
                        onClick={() => onClick(idx)}
                        onDoubleClick={() => onDoubleClick(idx)}
                        key={item.uuid}
                    />
                )
            )}
        </div>
    );
}
