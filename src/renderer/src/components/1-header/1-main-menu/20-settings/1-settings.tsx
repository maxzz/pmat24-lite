import { useSetAtom } from "jotai";
import { optionsDialogOpenAtom, shortcutNameSettings } from "@/store/atoms/4-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/shared-styles";

export function MenuItem_Settings() {
    const doOptionsDialogOpen = useSetAtom(optionsDialogOpenAtom);
    return (<>
        <DropdownMenuItem onClick={()=> doOptionsDialogOpen(true)}>
            Settings
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSettings}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
