import { useSetAtom } from "jotai";
import { doOpenSawOverlayAtom } from "@/store/1-atoms/7-dialogs";
import { shortcutNameCreate } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_CreateMani() {

    const doOpenCreateDialog = useSetAtom(doOpenSawOverlayAtom);
    
    return (<>
        <DropdownMenuItem onClick={() => doOpenCreateDialog(true)}>
            Create manifest...
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
