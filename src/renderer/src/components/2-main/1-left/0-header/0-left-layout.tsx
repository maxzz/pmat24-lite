import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { FilterFilesDialog } from "./1-filter";
import { CurrentFilter } from "./2-filter-indicator";
import { L_PanelMenu } from "./3-menu";

export const panelHeaderClasses = "px-2 py-1 h-10 text-xs bg-muted border-border border-b group-focus-within:bg-background/30 select-none";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(panelHeaderClasses, "flex items-center gap-2", className)} {...rest}>

            <div className="pl-2.5">Files</div>

            <div className="flex-1 flex items-center gap-1">
                <FilterFilesDialog />
                <CurrentFilter />
            </div>

            <L_PanelMenu />
        </div>
    );
}
