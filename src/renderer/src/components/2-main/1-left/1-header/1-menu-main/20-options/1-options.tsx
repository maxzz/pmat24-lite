import { useSetAtom } from "jotai";
import { doOpenOptionsDialogAtom } from "@/store/atoms/7-dialogs";
import { shortcutNameSettings } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    return (<>
        <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)}>
            Options
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSettings}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
