import { useState } from "react";
import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { appSettings } from "@/store/9-ui-state";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconCrossOnHover } from "@/components/2-main/0-all/2-welcome-page/5-ui-icon-delete-recent-item";
import { IconFolderClosed } from "@/ui/icons/normal/temp2";
import { IconTrash } from "@/ui/icons";
import { type PmatFolder } from "@/store/5-1-open-files";
import { doSetFilesFrom_MruFolder_Atom } from "@/store/0-serve-atoms/2-do-load-files";
import { asyncClearMruListDialogAtom, asyncRemoveMruItemDialogAtom } from "@/store/4-dialogs-atoms";

export function MenuItem_OpenRecent() {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Open Recent
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent className="text-xs max-w-56 text-foreground">

                    {!folders.length
                        ? (
                            <DropdownMenuItem>
                                No recently opened folders
                            </DropdownMenuItem>
                        )
                        : (<>
                            {folders.map(
                                (folder, idx) => (
                                    <MenuItem_MruItem folder={folder} key={idx} />
                                )
                            )}
                            <DropdownMenuSeparator />
                            <MenuItem_ClearMru disabled={folders.length === 0} />
                        </>)
                    }

                </DropdownMenuSubContent>
            </DropdownMenuPortal>
        </DropdownMenuSub>
    );
}

function MenuItem_MruItem({ folder }: { folder: PmatFolder; }) {
    const short = filenameWithoutPath(folder.fpath);
    const doSetFilesFrom_MruFolder = useSetAtom(doSetFilesFrom_MruFolder_Atom);
    const removeFromMru = useSetAtom(asyncRemoveMruItemDialogAtom);

    const [hover, setHover] = useState(false);

    function onCrossClick(event: React.MouseEvent): void {
        event.stopPropagation(); 
        removeFromMru(folder, false);
    }
    
    return (
        <DropdownMenuItem className="relative gap-1" title={folder.fpath} onClick={() => doSetFilesFrom_MruFolder({ folder })} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <IconFolderClosed className="shrink-0 size-4" />
            <div className="truncate">{short}</div>
            <IconCrossOnHover className="absolute right-2" onClick={onCrossClick} show={hover} />
        </DropdownMenuItem>
    );
}

function MenuItem_ClearMru({ disabled }: { disabled: boolean; }) {
    const clearMru = useSetAtom(asyncClearMruListDialogAtom);
    return (
        <DropdownMenuItem disabled={disabled} onClick={clearMru}>
            <IconTrash className="mr-1 size-4" />
            Clear Recently Opened
        </DropdownMenuItem>
    );
}
