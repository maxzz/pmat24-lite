import { useSetAtom } from "jotai";
import { doOpenCreateDialogAtom, shortcutNameCreate } from "@/store/atoms/7-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/shared-styles";
import { doSaveAllAtom } from "@/store/atoms/4-save-reset-all";

export function MenuItem_SaveAll() {
    const doSaveAll = useSetAtom(doSaveAllAtom);
    return (<>
        <DropdownMenuItem onClick={doSaveAll}>
            Save All
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
