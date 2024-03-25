import { useSetAtom } from "jotai";
import { createDialogOpenAtom, shortcutNameCreate } from "@/store/atoms/4-dialogs";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/shared-styles";

export function MenuItem_CreateMani() {
    const doCreateDialogOpen = useSetAtom(createDialogOpenAtom);
    return (<>
        <DropdownMenuItem onClick={() => doCreateDialogOpen(true)}>
            Create manifest...
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameCreate}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
