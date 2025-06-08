import { type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";

export function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-[auto,0px,auto] grid-rows-[auto,0px,auto] 1gap-1 text-xs", className)}>
            {/* <div className={classNames("grid grid-cols-3 grid-rows-3 1gap-1 text-xs", className)}> */}

            <Tile className="absolute -left-2 -top-2 bg-purple-500 col-start-2 row-start-2">0</Tile>

            <Tile className="col-start-1 row-start-1">1</Tile>
            <Tile className="col-start-3 row-start-1">2</Tile>
            
            <Tile className="bg-slate-500 col-start-1 row-start-3">3</Tile>
            <Tile className="col-start-3 row-start-3">4</Tile>
        </div>
    );
}

function Tile({ children, className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    return (
        <div className={classNames("size-4 border border-border grid place-items-center", className)} {...rest}>
            {children}
        </div>
    );
}
