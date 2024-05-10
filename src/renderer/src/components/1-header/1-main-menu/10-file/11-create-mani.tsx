import { useSetAtom } from "jotai";
import { doOpenCreateDialogAtom, shortcutNameCreate } from "@/store/atoms/7-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_CreateMani() {

    const doOpenCreateDialog = useSetAtom(doOpenCreateDialogAtom);
    
    return (<>
        <DropdownMenuItem onClick={() => doOpenCreateDialog(true)}>
            Create manifest...
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
