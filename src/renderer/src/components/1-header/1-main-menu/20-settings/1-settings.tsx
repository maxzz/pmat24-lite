import { useSetAtom } from "jotai";
import { doOpenOptionsDialogAtom, shortcutNameSettings } from "@/store/atoms/4-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/shared-styles";

export function MenuItem_Settings() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    return (<>
        <DropdownMenuItem onClick={()=> doOpenOptionsDialog(true)}>
            Settings
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSettings}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
