import { type ComponentPropsWithoutRef } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { appSettings } from "@/store";
import { R2MCalls } from "@/xternal-to-main";

export function CornerSelector({ className }: { className?: string; }) {
    return (
        <div className={classNames("grid grid-cols-2 grid-rows-2 gap-px text-xs", className)} title="The position of this monitor window on the screen">

            <Tile idx={0} className="absolute size-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md" />
            <Tile idx={1} className="rounded-tl-md" />
            <Tile idx={2} className="rounded-tr-md" />
            <Tile idx={3} className="rounded-bl-md" />
            <Tile idx={4} className="rounded-br-md" />
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

const tileClasses = "size-3.5 bg-background border border-border grid place-items-center select-none cursor-pointer";
