import { type HTMLAttributes, useEffect, useRef, useState } from "react";
import { type PrimitiveAtom, atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { fldCatItemsAtom, fldCatTriggerAtom } from "@/store";
import { FldCatItemRow } from "./1-fld-cat-item-row";
import { classNames } from "@/utils";
import { ScrollArea } from "@/ui/shadcn";
import useResizeObserver from "use-resize-observer";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    onItemDoubleClick: (item: CatalogItem) => void;
};

export function FldCatItemsGrid({ selectedItemAtom, onItemDoubleClick, ...rest }: FldCatItemsGridProps) {
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

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    console.log('FldCatItemsGrid render', width, height);

    return (
        <div className="flex-none relative w-full h-full min-h-80">
            <div ref={(elm) => { refRootCb(elm); refRoot.current = elm; }} className={`absolute inset-0 flex flex-col outline-none`}>
                <ScrollArea style={{ width, height }} className="1h-full 1max-h-32">
                    <div className={classNames("grid grid-cols-[auto_auto_220px]")} tabIndex={0}>
                        {fldCatItems.map(
                            (item, idx) => (
                                <FldCatItemRow
                                    item={item}
                                    idx={idx}
                                    selectedIdx={selectedIdx}
                                    itemClick={onClick}
                                    itemDoubleClick={onDoubleClick} key={idx}
                                />
                            )
                        )}
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
