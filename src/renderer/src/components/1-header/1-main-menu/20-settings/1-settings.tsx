import { useSetAtom } from "jotai";
import { doOpenOptionsDialogAtom, shortcutNameSettings } from "@/store/atoms/7-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_Settings() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    return (<>
        <DropdownMenuItem onClick={()=> doOpenOptionsDialog(true)}>
            Settings
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSettings}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
