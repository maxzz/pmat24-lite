import { type HTMLAttributes, useEffect, useRef, useState } from "react";
import { type PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, fldCatTriggerAtom } from "@/store";
//import { Scroller } from "@ui/scroller";
import { TableHeader } from "./1-header";
import { FldCatItem } from "./3-field-item";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui/shadcn";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    onItemDoubleClick: (item: CatalogItem) => void;
};

export function FldCatItemsGrid({ selectedItemAtom, onItemDoubleClick, className, ...rest }: FldCatItemsGridProps) {
    const fldCatItems = useAtomValue(fldCatItemsAtom);
    const setSelectedItem = useSetAtom(selectedItemAtom);

    const selectedIdxAtom = useState(() => atom(-1))[0];
    const [selectedIdx, setSelectedIdx] = useAtom(selectedIdxAtom);
    const prevSelectedIdx = useRef(selectedIdx);

    const inData = useAtomValue(fldCatTriggerAtom);
    const showSelectBtn = !!inData?.outBoxAtom;

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

    function onDoubleClick() {
        setSelectedIdx(prevSelectedIdx.current);
        showSelectBtn && onItemDoubleClick(fldCatItems[prevSelectedIdx.current]);
    }

    return (
        <div className={classNames("grid 1grid-cols-[minmax(0,1fr)_max-content_minmax(0,1fr)]", className)} {...rest}>
            {/* <TableHeader /> */}

            <ScrollArea className="h-full max-h-32">
                {fldCatItems.map(
                    (item, idx) => (
                        <FldCatItem
                            item={item}
                            idx={idx}
                            selectedIdx={selectedIdx}
                            itemClick={onClick}
                            itemDoubleClick={onDoubleClick} key={idx}
                        />
                    )
                )}
            </ScrollArea>
        </div>
    );
}
