import { type HTMLAttributes } from "react";
import { FilterFilesDialogTrigger } from "@/components/4-dialogs";
import { ChangeIndicator } from "./1-change-indicator";
import { CurrentFilter } from "./2-filter-indicator";
import { L_PanelMenuTrigger } from "../1-menu-main/0-body/0-trigger";
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
                <FilterFilesDialogTrigger />
                <L_PanelMenuTrigger />
            </div>
        </div>
    );
}
