import { useEffect, useRef, type HTMLAttributes } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { doScrollToItemAtom, doSelectIdxAtom, type FceCtx } from "@/store";
import { FldCatItemRow } from "./2-fld-cat-item-row";
import { classNames } from "@/utils";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

const listSelectionLightClasses = "\
[--selected-fg:hsl(var(--foreground))] \
[--selected-fg-hover:hsl(var(--foreground))] \
[--selected-bg:hsl(var(--muted))] \
[--selected-bg-active:hsl(var(--accent))] \
[--selected-outline:#3b3b3b] \
";

const listSelectionDarkClasses = "\
dark:[--selected-fg:hsl(var(--foreground))] \
dark:[--selected-fg-hover:hsl(var(--foreground))] \
[--selected-bg:hsl(var(--muted))] \
dark:[--selected-bg-active:#04395e] \
dark:[--selected-outline:#007fd4] \
";

const parentActiveClasses = "\
[--parent-active:0] focus-within:[--parent-active:1] \
[--parent-selected-bg:var(--selected-bg)] focus-within:[--parent-selected-bg:var(--selected-bg-active)] \
";

export function FldCatItemsBody({ fceCtx, className, ...rest }: FldCatItemsGridProps) {
    const items = useAtomValue(fceCtx.fceAtoms.itemsAtom);
    
    const setSelectedItem = useSetAtom(fceCtx.selectedItemAtom);
    const doSelectIdx = useSetAtom(doSelectIdxAtom);

    const refRoot = useRef<HTMLDivElement | null>(null);

    useEffect(
        () => refRoot.current?.focus(), [refRoot.current]
    );

    function onClick(idx: number) {
        setSelectedItem(doSelectIdx(fceCtx, idx, true));
    }

    function onDoubleClick(idx: number) {
        setSelectedItem(doSelectIdx(fceCtx, idx, true));
        // fceCtx.onItemDoubleClick?.(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div ref={refRoot} className={classNames(listSelectionLightClasses, listSelectionDarkClasses, parentActiveClasses, className)} {...rest}>
            {items.map(
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
