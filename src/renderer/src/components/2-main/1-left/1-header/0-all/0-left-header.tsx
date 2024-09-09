import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { classNames } from "@/utils";
import { SymbolFire } from "@/ui/icons";
import { allFileUsChanges } from "@/store/atoms/3-file-mani-atoms";
import { FilterFilesDialog } from "@/components/4-dialogs";
import { CurrentFilter } from "../2-filter-indicator";
import { L_PanelMenu } from "../3-menu";

export const panelHeaderClasses = "px-2 py-1 text-xs bg-muted border-border border-b group-focus-within:bg-background/30";

export function L_PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const hasChanges = !!useSnapshot(allFileUsChanges).size;

    return (
        <div className={classNames(panelHeaderClasses, "h-10 select-none flex items-center justify-between", className)} {...rest}>

            <div className="pl-2.5 flex items-center gap-2">
                Files
                {hasChanges && (
                    <SymbolFire className="mr-0.5 size-3 text-orange-600" colorize />
                )}
            </div>

            <div className="flex items-center">
                <div className="flex-1 flex items-center gap-1">
                    <CurrentFilter />
                    <FilterFilesDialog />
                </div>

                <L_PanelMenu />
            </div>
        </div>
    );
}
