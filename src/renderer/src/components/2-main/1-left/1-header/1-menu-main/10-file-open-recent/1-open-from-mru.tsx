import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconFolderClosed } from "@/ui/icons/normal/temp2";
import { IconTrash } from "@/ui/icons";
import { appSettings } from "@/store/9-ui-state";
import { type PmatFolder } from "@/store/1-files-atoms/0-files-atom";
import { doSetFilesFrom_MruFolder_Atom } from "@/store/0-serve-atoms/2-do-load-files";

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
    return (
        <DropdownMenuItem className="gap-1" title={folder.fpath} onClick={() => doSetFilesFrom_MruFolder({ folder })}>
            <IconFolderClosed className="shrink-0 size-4" />
            <div className="truncate">{short}</div>
        </DropdownMenuItem>
    );
}

function MenuItem_ClearMru({ disabled }: { disabled: boolean; }) {
    return (
        <DropdownMenuItem disabled={disabled} onClick={() => appSettings.appUi.mru.folders = []}>
            <IconTrash className="mr-1 size-4" />
            Clear Recently Opened
        </DropdownMenuItem>
    );
}
