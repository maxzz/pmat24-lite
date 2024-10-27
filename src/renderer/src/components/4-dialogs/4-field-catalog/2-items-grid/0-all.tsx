import { type HTMLAttributes, useRef } from "react";
import { type PrimitiveAtom } from "jotai";
import { type CatalogItem } from "@/store/manifest";
import { type FceItem } from "@/store/atoms/4-field-catalogs";
import { type FceCtx } from "../0-all/9-types";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
    selectedItemAtom: PrimitiveAtom<FceItem | null>;
    onItemDoubleClick?: (item: FceItem) => void;
};

export function FldCatItemsGrid({ fceCtx, selectedItemAtom, onItemDoubleClick, ...rest }: FldCatItemsGridProps) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    return (
        <div className="flex-shrink-0 relative w-full" {...rest}>
            <div ref={(elm) => { refRootCb(elm); refRoot.current = elm; }} className={`absolute inset-0 flex flex-col`}>

                <ScrollArea style={{ width, height }}>
                    <div
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none 1focus-within:ring ring-ring")}
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
