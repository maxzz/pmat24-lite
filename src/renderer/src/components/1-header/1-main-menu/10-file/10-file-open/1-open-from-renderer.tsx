import { DropdownMenuItem } from "@/ui";
import { IdOpenFiles, IdOpenFolders } from "./2-open-persistent-items";

export function DropdownMenuItem_Open_FromRenderer({ openFolder }: { openFolder: boolean; }) {
    
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
