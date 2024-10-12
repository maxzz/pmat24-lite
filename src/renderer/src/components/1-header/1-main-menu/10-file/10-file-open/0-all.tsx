import { DropdownMenuItem } from "@/ui";
import { hasMain, sendToMain } from "@/xternal-to-main";
import { DropdownMenuItem_Open_FromRenderer } from "./1-open-from-renderer";

export function MenuItems_OpenFiles() {
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
        <DropdownMenuItem_Open_FromRenderer />
        <DropdownMenuItem_Open_FromRenderer openAsFolder />
    </>);
}
