import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store";
import { R2MCalls } from "@/xternal-to-main";

export function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-2 grid-rows-2 text-xs", className)} title="The position of this monitor window on the screen">

            <Tile idx={0} className="absolute size-5 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <Tile idx={1} />
            <Tile idx={2} />
            <Tile idx={3} />
            <Tile idx={4} />
        </div>
    );
}

function Tile({ idx, className, ...rest }: { idx: number; } & ComponentPropsWithoutRef<'div'>) {
    const { sawPosition } = useSnapshot(appSettings.appUi.uiGeneral);
    const isActive = sawPosition === idx;
    return (
        <div
            className={classNames(tileClasses, isActive && "!bg-accent", className)}
            onClick={() => setPoisition(idx)}
            {...rest}
        />
    );
}

function setPoisition(position: number) {
    appSettings.appUi.uiGeneral.sawPosition = position;
    R2MCalls.setSawPosition({ position });
}

const tileClasses = "size-4 bg-background border border-border grid place-items-center select-none cursor-pointer";
