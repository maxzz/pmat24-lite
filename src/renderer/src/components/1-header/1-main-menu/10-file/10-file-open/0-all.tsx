import { DropdownMenuItem } from "@/ui";
import { hasMain, sendToMain } from "@/xternal-to-main";
import { MenuItems_FileOpen_FromRenderer } from "./1-from-renderer";

export function MenuItems_FileOpen({ setMenuOpen }: { setMenuOpen: (v: boolean) => void; }) {
    if (!hasMain()) {
        return (
            <MenuItems_FileOpen_FromRenderer setMenuOpen={setMenuOpen} />
        );
    }

    return (<>
        <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog" })}>
            Open Files...
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => sendToMain({ type: "r2m:file:load-manifests-dialog", openDirs: true })}>
            Open Folder...
        </DropdownMenuItem>
    </>);
}
