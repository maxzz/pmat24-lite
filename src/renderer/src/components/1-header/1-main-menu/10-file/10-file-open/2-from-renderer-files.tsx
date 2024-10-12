import { DropdownMenuItem } from "@/ui";
import { IdOpenFiles, IdOpenFolders } from "./4-menu-items_persistent";

export function DropdownMenuItem_Files_FromRenderer({ openFolder }: { openFolder: boolean; }) {
    function onClickToOpen() {
        document.getElementById(openFolder ? IdOpenFolders: IdOpenFiles)?.click();
    }

    return (
        <DropdownMenuItem asChild>
            <div onClick={onClickToOpen}>
                {openFolder ? 'Open Folder...' : 'Open Files...'}
            </div>
        </DropdownMenuItem>
    );
}
