import { useSetAtom } from "jotai";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { filterDialogOpenAtom, shortcutNameFilter } from "@/store/atoms/7-dialogs";
import { menuShortcutClasses } from "@/ui/shared-styles";

export function MenuItem_FilterFiles() {
    const setFilerFileOpen = useSetAtom(filterDialogOpenAtom);
    return (
        <DropdownMenuItem onClick={() => { setFilerFileOpen(true); }}>
            Filter files...
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameFilter}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}
