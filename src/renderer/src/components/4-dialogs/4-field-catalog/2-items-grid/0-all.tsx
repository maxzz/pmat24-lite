import { useEffect, useRef, useState } from "react";
import { PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, fldCatTriggerAtom } from "@/store";
import { Scroller } from "@ui/scroller";
import { TableHeader } from "./1-header";
import { FldCatItem } from "./3-field-item";

type FldCatItemsGridProps = {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    onDoubleClick: (item: CatalogItem) => void;
};

export function FldCatItemsGrid({ selectedItemAtom, onDoubleClick }: FldCatItemsGridProps) {
    const fldCatItems = useAtomValue(fldCatItemsAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);

    const selectedIdxAtom = useState(() => atom(-1))[0];
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    const prevSelectedIdx = useRef(selectedIdx);

    const inData = useAtomValue(fldCatTriggerAtom);
    const needSelect = !!inData?.outBoxAtom;

    useEffect(
        () => {
            if (selectedIdx !== -1) {
                prevSelectedIdx.current = selectedIdx;
            }
            setSelectedItem(selectedIdx === -1 ? null : fldCatItems[selectedIdx]);
        }, [selectedIdx]
    );

    function itemClick(idx: number) {
        setSelectedIdx((currentIdx) => currentIdx === idx ? -1 : idx);
    }

    function itemDoubleClick() {
        setSelectedIdx(prevSelectedIdx.current); needSelect && onDoubleClick(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <Scroller className="pt-2 text-xs overflow-auto">
            <div className="grid grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)] text-primary-400">
                <TableHeader />

                {fldCatItems.map(
                    (item, idx) => (
                        <FldCatItem
                            item={item}
                            idx={idx}
                            selectedIdx={selectedIdx}
                            itemClick={itemClick}
                            itemDoubleClick={itemDoubleClick} key={idx}
                        />
                    )
                )}
            </div>
        </Scroller>
    );
}
