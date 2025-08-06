import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";
import { type PmatFolder, appSettings, doSetFilesFrom_MruFolder_Atom } from "@/store";

export function MenuItem_OpenRecent() {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Open Recent
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent className="text-xs max-w-48 flex flex-col">

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
        <DropdownMenuItem className="block flex-1 min-w-0 truncate" title={folder.fpath} onClick={() => doSetFilesFrom_MruFolder({ folder })}>
            {short}
        </DropdownMenuItem>
    );
}

function MenuItem_ClearMru({ disabled }: { disabled: boolean; }) {
    return (
        <DropdownMenuItem disabled={disabled} onClick={() => appSettings.appUi.mru.folders = []}>
            Clear Recently Opened
        </DropdownMenuItem>
    );
}

//Try folder icon as well
