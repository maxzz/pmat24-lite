import { useSetAtom } from "jotai";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    return (<>
        <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)}>
            Options
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
