import { type HTMLAttributes, useRef } from "react";
import { type PrimitiveAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    selectedItemAtom: PrimitiveAtom<CatalogItem | null>;
    onItemDoubleClick: (item: CatalogItem) => void;
};

export function FldCatItemsGrid({ selectedItemAtom, onItemDoubleClick, ...rest }: FldCatItemsGridProps) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    return (
        <div className="flex-shrink-0 relative w-full min-h-80" {...rest}>
            <div ref={(elm) => { refRootCb(elm); refRoot.current = elm; }} className={`absolute inset-0 flex flex-col`}>

                <ScrollArea style={{ width, height }} className="">
                    <div
                        className={classNames("grid grid-cols-[auto_auto_minmax(220px,1fr)] outline-none 1focus-within:ring ring-ring")}
                        tabIndex={0}
                    >
                        <FldCatItemsBody
                            selectedItemAtom={selectedItemAtom}
                            onItemDoubleClick={onItemDoubleClick}
                        />
                    </div>
                </ScrollArea>
                
            </div>
        </div>
    );
}
