import { type HTMLAttributes, useEffect, useRef, useState } from "react";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FceCtx } from "@/store";
import { FldCatItemRow } from "./2-fld-cat-item-row";
import { classNames } from "@/utils";
import { doSelectFceItemAtom } from "./3-do-set-selected";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

const parentActiveClasses = "[--parent-active:0] focus-within:[--parent-active:1]";

export function FldCatItemsBody({ fceCtx, className, ...rest }: FldCatItemsGridProps) {
    const fldCatItems = useAtomValue(fceCtx.fceAtoms.itemsAtom);

    // const setSelectedItem = useSetAtom(fceCtx.selectedItemAtom);

    // const selectedIdxAtom = useState(() => atom(-1))[0];
    // const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    // const prevSelectedIdx = useRef(selectedIdx);

    // useEffect(
    //     () => {
    //         if (selectedIdx !== -1) {
    //             if (fldCatItems[prevSelectedIdx.current]) {
    //                 fldCatItems[prevSelectedIdx.current].editor.selected = false;
    //             }

    //             prevSelectedIdx.current = selectedIdx;
    //         }
    //         setSelectedItem(selectedIdx === -1 ? null : fldCatItems[selectedIdx]);

    //         if (fldCatItems[selectedIdx]) {
    //             fldCatItems[selectedIdx].editor.selected = true;
    //         }
    //     }, [selectedIdx]
    // );

    const doSelectFceItem = useSetAtom(doSelectFceItemAtom);

    function onClick(idx: number) {
        doSelectFceItem(fceCtx, idx, true);
        //setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx);
    }

    function onDoubleClick(idx: number) {
        // setSelectedIdx(prevSelectedIdx.current);
        // fceCtx.onItemDoubleClick?.(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div className={classNames(parentActiveClasses, className)} {...rest}>
            {fldCatItems.map(
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
