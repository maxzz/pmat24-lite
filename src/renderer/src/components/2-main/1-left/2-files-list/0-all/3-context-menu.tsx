import { type ReactNode } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "@/ui/shadcn";
import { appSettings, doDeleteFileUsAtom, doRevealInExplorerAtom, doVerifyManiNameAtom } from "@/store";

export function FilesTreeViewcontextMenu({ children }: { children: ReactNode; }) {

    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    const renameFileUsAtom = useSetAtom(doVerifyManiNameAtom);

    const { useTreeCtxMenu } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!useTreeCtxMenu) {
        return <>{children}</>;
    }

    function onRename() {
        //TODO: get atom from tree item and
        //TODO: click may happen on different tree item, i.e. not only on selected one
        //currentAtom && doVerifyNameBeforeSave(currentAtom)
        console.log('onRename');
    }

    function onDelete() {
        //TODO: get atom from tree item and
        //TODO: click may happen on different tree item, i.e. not only on selected one
        //currentAtom && doDeleteFileUs(currentAtom)
        console.log('onDelete');
    }

    function onRevealInExplorer() {
        //TODO: get atom from tree item and
        //TODO: click may happen on different tree item, i.e. not only on selected one
        //fileUsAtom && doRevealInExplorer(fileUsAtom)
        console.log('onRevealInExplorer');
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div>
                    {children}
                </div>
            </ContextMenuTrigger>

            {/* <ContextMenuContent className="abc data-[state=closed]:duration-0 data-[state=closed]:[animation-name=none]"> */}
            <ContextMenuContent className="abc data-[state=closed]:![animation:none]">
            {/* <ContextMenuContent className="abc data-[state=open]:![animation:none]"> */}
                <ContextMenuLabel className="text-xs">File name</ContextMenuLabel>
                <ContextMenuItem className="text-xs">Reveal in File Explorer</ContextMenuItem>
                <ContextMenuItem className="text-xs" onClick={onDelete}>Delete</ContextMenuItem>
                <ContextMenuItem className="text-xs" onClick={onRename}>Rename</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
}
