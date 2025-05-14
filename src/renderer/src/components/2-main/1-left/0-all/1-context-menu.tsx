import { type ReactNode } from "react";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "@/ui/shadcn";

export function FilesTreeViewcontextMenu({children}: { children: ReactNode; }) {
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div className="">
                    {children}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuLabel className="text-xs">File</ContextMenuLabel>
                <ContextMenuItem className="text-xs">Reveal in File Explorer</ContextMenuItem>
                <ContextMenuItem className="text-xs">Delete</ContextMenuItem>
                <ContextMenuItem className="text-xs">Rename</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}

//05.12.25
//TODO: get tree item under cursor and show context menu
