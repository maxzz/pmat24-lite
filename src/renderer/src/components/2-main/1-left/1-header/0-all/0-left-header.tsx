import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { FilterFilesDialog } from "../1-filter";
import { CurrentFilter } from "../2-filter-indicator";
import { L_PanelMenu } from "../3-menu";
import { SymbolFire } from "@/ui/icons";

export const panelHeaderClasses = "px-2 py-1 text-xs bg-muted border-border border-b group-focus-within:bg-background/30";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {

    //TODO: we need to get changed from all loaded files; it is important to show that some files have changes due to scrolling

    return (
        <div className={classNames(panelHeaderClasses, "h-10 select-none flex items-center gap-2", className)} {...rest}>
            {/* 
            <div className="pl-2.5 flex items-center gap-2">
                <SymbolFire className="mr-0.5 size-3 text-orange-600" colorize />
                Files
            </div>
            */}
            <div className="pl-2.5">
                Files
            </div>

            <div className="flex-1 flex items-center gap-1">
                <FilterFilesDialog />
                <CurrentFilter />
            </div>

            <L_PanelMenu />
        </div>
    );
}
