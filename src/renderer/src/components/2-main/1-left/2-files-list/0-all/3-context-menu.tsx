import { type ReactNode } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuTrigger } from "@/ui/shadcn";
import { appSettings, doDeleteFileUsAtom, doRevealInExplorerAtom, doVerifyManiNameAtom, rightPanelAtomAtom, rightPanelAtomGetterAtom } from "@/store";

export function FilesTreeViewcontextMenu({ children }: { children: ReactNode; }) {

    const { useTreeCtxMenu } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!useTreeCtxMenu) {
        return <>{children}</>;
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div>
                    {children}
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="data-[state=closed]:![animation:none]">
                <ContextItems />
            </ContextMenuContent>
        </ContextMenu>
    );
}

function ContextItems() {
    const rightPanelAtomGetter = useSetAtom(rightPanelAtomGetterAtom);

    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    const renameFileUsAtom = useSetAtom(doVerifyManiNameAtom); // Add custom dialog title for rename // update dialog overlay blur

    function onRename() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom && renameFileUsAtom(currentAtom)
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

    return (<>
        <ContextMenuLabel className="text-xs">File name</ContextMenuLabel>
        <ContextMenuItem className="text-xs">Reveal in File Explorer</ContextMenuItem>
        <ContextMenuItem className="text-xs" onClick={onDelete}>Delete</ContextMenuItem>
        <ContextMenuItem className="text-xs" onClick={onRename}>Rename</ContextMenuItem>
    </>);
}
