import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store";

export function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-2 grid-rows-2 text-xs", className)}>

            <Tile idx={0} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">0</Tile>

            <Tile idx={1} className="">1</Tile>
            <Tile idx={2} className="">2</Tile>
            <Tile idx={3} className="">3</Tile>
            <Tile idx={4} className="">4</Tile>
        </div>
    );
}

function Tile({ idx, children, className, ...rest }: { idx: number; } & ComponentPropsWithoutRef<'div'>) {
    const { sawPosition } = useSnapshot(appSettings.appUi.uiGeneral);
    const isActive = sawPosition === idx;
    return (
        <div className={classNames(tileClasses, isActive && "!bg-accent", className)} {...rest} onClick={() => appSettings.appUi.uiGeneral.sawPosition = idx}>
            {children}
        </div>
    );
}

const tileClasses = "size-6 bg-background border border-border grid place-items-center select-none cursor-pointer";
