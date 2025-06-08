import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-[auto,0px,auto] grid-rows-[auto,0px,auto] 1gap-1 text-xs", className)}>
            {/* <div className={classNames("grid grid-cols-3 grid-rows-3 1gap-1 text-xs", className)}> */}

            <div className="size-4 border border-border col-start-1 row-start-1 grid place-items-center">1</div>
            <div className="size-4 border border-border col-start-3 row-start-1 grid place-items-center">2</div>
            
            <div className="absolute -left-2 -top-2 bg-purple-500 size-4 border border-border col-start-2 row-start-2 grid place-items-center">3</div>
            
            <div className="bg-slate-500 size-4 border border-border col-start-1 row-start-3 grid place-items-center">4</div>
            <div className="size-4 border border-border col-start-3 row-start-3 grid place-items-center">5</div>
        </div>
    );
}

function Tile({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("bg-slate-500 size-4 border border-border col-start-1 row-start-3 grid place-items-center", className)} {...rest}>
            5
        </div>
    );
}
