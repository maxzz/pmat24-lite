import { type ReactNode } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { hasMain } from "@/xternal-to-main";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/ui/shadcn";
import { appSettings, doDeleteFileUsAtom, doRevealInExplorerAtom, doVerifyManiNameAtom, rightPanelAtomGetterAtom } from "@/store";

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
    const renameFileUsAtom = useSetAtom(doVerifyManiNameAtom); // Add custom dialog title for rename // update dialog overlay blur // smaller size

    function onRename() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom && renameFileUsAtom(currentAtom);
    }

    function onDelete() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom && doDeleteFileUs(currentAtom);
    }

    function onRevealInExplorer() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom && doRevealInExplorer(currentAtom);
    }

    return (<>
        {/* <ContextMenuLabel className="text-xs">File name</ContextMenuLabel> */}

        {hasMain() && (
            <ContextMenuItem className="text-xs" onClick={onRevealInExplorer}>Reveal in File Explorer</ContextMenuItem>
        )}
        <ContextMenuItem className="text-xs" onClick={onDelete}>Delete</ContextMenuItem>
        <ContextMenuItem className="text-xs" onClick={onRename}>Rename</ContextMenuItem>
    </>);
}
