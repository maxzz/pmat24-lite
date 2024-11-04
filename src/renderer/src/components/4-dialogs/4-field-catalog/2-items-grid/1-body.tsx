import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { type PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type FceCtx, type FceItem, fldCatItemsAtom } from "@/store";
import { FldCatItemRow } from "./2-fld-cat-item-row";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;
};

export function FldCatItemsBody({ fceCtx, selectedItemAtom, onItemDoubleClick, ...rest }: FldCatItemsGridProps) {
    const fldCatItems = useAtomValue(fldCatItemsAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);

    const selectedIdxAtom = useState(() => atom(-1))[0];
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    const prevSelectedIdx = useRef(selectedIdx);

    useEffect(
        () => {
            if (selectedIdx !== -1) {
                prevSelectedIdx.current = selectedIdx;
            }
            setSelectedItem(selectedIdx === -1 ? null : fldCatItems[selectedIdx]);
        }, [selectedIdx]
    );

    function onClick(idx: number) {
        setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx);
    }

    function onDoubleClick(idx: number) {
        setSelectedIdx(prevSelectedIdx.current);
        onItemDoubleClick?.(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div {...rest}>
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
