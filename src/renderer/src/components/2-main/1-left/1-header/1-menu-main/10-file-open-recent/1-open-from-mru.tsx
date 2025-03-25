import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";
import { type PmatFolder, appSettings, doSetFilesFrom_MruItem_Atom } from "@/store";

export function MenuItem_OpenRecent() {
    const { folders } = useSnapshot(appSettings.appUi.mru);
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                Open Recent
            </DropdownMenuSubTrigger>

            <DropdownMenuPortal>
                <DropdownMenuSubContent className="text-xs">

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
    const short = filenameWithoutPath(folder.rpath);
    const doSetFilesFrom_MruItem = useSetAtom(doSetFilesFrom_MruItem_Atom);
    return (
        <DropdownMenuItem title={folder.rpath} onClick={() => doSetFilesFrom_MruItem({ folder })}>
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
