import { DropdownMenuItem } from "@/ui";
import { hasMain, sendToMain } from "@/xternal-to-main";
import { DropdownMenuItem_Files_FromRenderer } from "./2-from-renderer-files";
import { DropdownMenuItem_Folder_FromRenderer } from "./3-from-renderer-folders";

export function MenuItems_OpenFiles({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    if (hasMain()) {
        return (<>
            <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog" })}>
                Open Files...
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", openDirs: true })}>
                Open Folder...
            </DropdownMenuItem>
        </>);
    }

    return (<>
        <DropdownMenuItem_Files_FromRenderer>
            Open Files...
        </DropdownMenuItem_Files_FromRenderer>

        <DropdownMenuItem_Folder_FromRenderer>
            Open Folder...
        </DropdownMenuItem_Folder_FromRenderer>
    </>);
}
