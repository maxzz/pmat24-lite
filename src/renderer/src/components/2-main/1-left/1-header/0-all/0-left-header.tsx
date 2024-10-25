import { type HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { allFileUsChanges } from "@/store/atoms/3-file-mani-atoms";
import { FilterFilesDialog } from "@/components/4-dialogs";
import { L_PanelMenu } from "../3-menu";
import { CurrentFilter } from "./1-filter-indicator";
import { SymbolFire } from "@/ui/icons";
import { classNames } from "@/utils";

export const panelHeaderClasses = "px-2 py-1 text-xs bg-muted border-border border-b group-focus-within:bg-background/30";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, "h-10 select-none flex items-center justify-between gap-1", className)} {...rest}>

            <div className="pl-2.5 flex items-center gap-2">
                Files
                <ChangeIndicator />
            </div>

            <div className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center">
                <CurrentFilter />
                <FilterFilesDialog />

                <L_PanelMenu />
            </div>
        </div>
    );
}

function ChangeIndicator() {
    const changed = useSnapshot(allFileUsChanges).size;
    if (!changed) {
        return null;
    }

    return (
        <div className="px-1.5 py-0.5 text-orange-800 bg-orange-400 border-border border rounded flex items-center">

            <SymbolFire className="mr-0.5 size-3 text-orange-800 opacity-70" colorize />
            <span className="text-[0.65rem] w-max">
                {changed} unsaved
            </span>

        </div>
    );
}
