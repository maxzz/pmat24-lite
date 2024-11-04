import { type HTMLAttributes, useRef } from "react";
import { type FceCtx } from "@/store";
import useResizeObserver from "use-resize-observer";
import { ScrollArea } from "@/ui/shadcn";
import { classNames } from "@/utils";
import { FldCatItemsBody } from "./1-body";

type FldCatItemsGridProps = HTMLAttributes<HTMLDivElement> & {
    fceCtx: FceCtx;
};

export function FldCatItemsGrid({ fceCtx, ...rest }: FldCatItemsGridProps) {

    const refRoot = useRef<HTMLDivElement | null>(null);
    const { ref: refRootCb, width, height } = useResizeObserver();

    return (
        <div className="flex-shrink-0 relative w-full" {...rest}>
            <div ref={(elm) => { refRootCb(elm); refRoot.current = elm; }} className={`absolute inset-0 flex flex-col`}>

                <ScrollArea style={{ width, height }}>
                    <FldCatItemsBody
                        className={classNames("grid grid-cols-[auto_auto_minmax(0px,1fr)] outline-none 1focus-within:ring ring-ring")}
                        tabIndex={0}

                        fceCtx={fceCtx}
                        selectedItemAtom={fceCtx.selectedItemAtom}
                        onItemDoubleClick={fceCtx.onItemDoubleClick}
                    />
                </ScrollArea>

            </div>
        </div>
    );
}
