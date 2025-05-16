import { type ReactNode } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { hasMain } from "@/xternal-to-main";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/ui/shadcn";
import { appSettings, doDeleteFileUsAtom, doRevealInExplorerAtom, doManiNameDlgAtom, rightPanelAtomGetterAtom } from "@/store";
import { toast } from "sonner";

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

            <ContextMenuContent className="data-[state=closed]:![animation:none]"> {/* data-... will fix wrong position of the context menu bug */}
                <ContextItems />
            </ContextMenuContent>
        </ContextMenu>
    );
}

function ContextItems() {
    const rightPanelAtomGetter = useSetAtom(rightPanelAtomGetterAtom);

    const renameFileUsAtom = useSetAtom(doManiNameDlgAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    function onRename() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? renameFileUsAtom(currentAtom) : toastError();
    }

    function onDelete() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? doDeleteFileUs(currentAtom) : toastError();
    }

    function onRevealInExplorer() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? doRevealInExplorer(currentAtom) : toastError();
    }

    return (<>
        {/* <ContextMenuLabel className="text-xs">File name</ContextMenuLabel> */}

        <ContextMenuItem className="text-xs" onClick={onRename}>Rename</ContextMenuItem>
        <ContextMenuItem className="text-xs" onClick={onDelete}>Delete</ContextMenuItem>
        
        {hasMain() && (
            <ContextMenuItem className="text-xs" onClick={onRevealInExplorer}>Reveal in File Explorer</ContextMenuItem>
        )}
    </>);
}

function toastError() {
    toast.error('No file selected', { position: "top-center" });
}
