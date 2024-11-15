import { type HTMLAttributes } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { doSelectFceItemAtom } from "./3-do-set-selected";
import { FldCatItemRow } from "./2-fld-cat-item-row";
import { classNames } from "@/utils";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

const listSelectionLightClasses = "\
[--selected-fg:hsl(var(--foreground))] \
[--selected-fg-hover:hsl(var(--foreground))] \
[--outline-color:#3b3b3b] \
[--parent-active-bg:hsl(var(--accent))] \
";

const listSelectionDarkClasses = "\
dark:[--selected-fg:hsl(var(--foreground))] \
dark:[--selected-fg-hover:hsl(var(--foreground))] \
dark:[--outline-color:#007fd4] \
dark:[--parent-active-bg:#04395e] \
";

const parentActiveClasses = "\
[--parent-active:0] focus-within:[--parent-active:1] \
[--parent-active-color:hsl(var(--muted))] focus-within:[--parent-active-color:var(--parent-active-bg)] \
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
        <div className={classNames(listSelectionLightClasses, listSelectionDarkClasses, parentActiveClasses, className)} {...rest}>
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
