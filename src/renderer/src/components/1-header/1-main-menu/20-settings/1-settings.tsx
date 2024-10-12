import { useSetAtom } from "jotai";
import { doOpenOptionsDialogAtom } from "@/store/atoms/7-dialogs";
import { shortcutNameSettings } from "@/components/4-dialogs/0-global";
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
