import { useSetAtom } from "jotai";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { filterDialogOpenAtom } from "@/store/1-atoms/7-dialogs";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { menuShortcutClasses } from "@/ui/local-ui";

export function MenuItem_FilterFiles() {
    const setFilerFileOpen = useSetAtom(filterDialogOpenAtom);
    return (
        <DropdownMenuItem onClick={() => { setFilerFileOpen(true); }}>
            Filter files...
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openFilter.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}
