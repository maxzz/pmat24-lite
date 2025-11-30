import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn/dropdown-menu";
import { filterDialogOpenAtom } from "@/store/4-dialogs-atoms";
import { menuShortcutClasses } from "@/ui/local-ui";

export function MenuItem_FilterFiles() {
    const setFilerFileOpen = useSetAtom(filterDialogOpenAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    return (
        <DropdownMenuItem onClick={() => { setFilerFileOpen(true); }} disabled={noOpenFolder}>
            Filter Templates...
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openFilter.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}
