import { useSnapshot } from "valtio";
import { filenameWithoutPath } from "@/utils";
import { appSettings } from "@/store";
import { notImplYet } from "@/ui";
import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/ui/shadcn/dropdown-menu";

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
                                No recent folders
                            </DropdownMenuItem>
                        )
                        : (<>
                            {folders.map(
                                (folder, idx) => (
                                    <MenuItem_MruItem fpath={folder.rpath} key={idx} />
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

function MenuItem_MruItem({ fpath }: { fpath: string; }) {
    const name = filenameWithoutPath(fpath);
    return (
        <DropdownMenuItem {...notImplYet} title={fpath}>
            {name}
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
