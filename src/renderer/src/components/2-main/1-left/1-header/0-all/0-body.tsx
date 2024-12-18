import { type HTMLAttributes } from "react";
import { FilterFilesDialog } from "@/components/4-dialogs";
import { L_PanelMenu } from "../3-menu";
import { CurrentFilter } from "./1-filter-indicator";
import { classNames } from "@/utils";
import { ChangeIndicator } from "./2-change-indicator";

export const panelHeaderClasses = "px-2 py-1 text-xs bg-muted border-border border-b group-focus-within:bg-background/30";

export function L_PanelHeaderBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
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
