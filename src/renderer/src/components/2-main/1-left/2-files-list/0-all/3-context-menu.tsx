import { type ReactNode } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { hasMain } from "@/xternal-to-main";
import { appSettings } from "@/store/9-ui-state";
import { rightPanelAtomGetterAtom } from "@/store/1-atoms/3-right-panel";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/ui/shadcn";
import { toast } from "sonner";
import { doDeleteFileUsAtom, doRevealInExplorerAtom, doManiNameDlgAtom, doGetFileUsPathAtom } from "@/store/1-atoms/0-serve-atoms";

export function FilesTreeViewContextMenu({ children }: { children: ReactNode; }) {
    const { useTreeCtxMenu } = useSnapshot(appSettings.appUi.uiAdvanced);
    if (!useTreeCtxMenu) {
        return <>{children}</>;
    }
    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                <div className="size-full">
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

    const doManiNameDlg = useSetAtom(doManiNameDlgAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);
    const doGetFileUsPath = useSetAtom(doGetFileUsPathAtom);

    function onRename() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? doManiNameDlg(currentAtom) : toastError();
    }

    function onDelete() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? doDeleteFileUs(currentAtom) : toastError();
    }

    function onRevealInExplorer() {
        const currentAtom = rightPanelAtomGetter();
        currentAtom ? doRevealInExplorer(currentAtom) : toastError();
    }

    function onCopyPath() {
        const currentAtom = rightPanelAtomGetter();
        if (!currentAtom) {
            toastError();
            return;
        }
        const { fpath, fname } = doGetFileUsPath(currentAtom) || {};
        if (!fname) {
            toastError('The filename is not set');
            return;
        }
        navigator.clipboard.writeText(fname);
    }

    return (<>
        {/* <ContextMenuLabel className="text-xs">File name</ContextMenuLabel> */}

        <ContextMenuItem className="text-xs" onClick={onRename}>Rename</ContextMenuItem>
        <ContextMenuItem className="text-xs" onClick={onDelete}>Delete</ContextMenuItem>

        {hasMain()
            ? (
                <ContextMenuItem className="text-xs" onClick={onRevealInExplorer}>Reveal in File Explorer</ContextMenuItem>
            )
            : (
                <ContextMenuItem className="text-xs" onClick={onCopyPath}>Copy File Name</ContextMenuItem>
            )
        }
    </>);
}

function toastError(msg: string = 'No file selected') {
    toast.error(msg, { position: "top-center" });
}
