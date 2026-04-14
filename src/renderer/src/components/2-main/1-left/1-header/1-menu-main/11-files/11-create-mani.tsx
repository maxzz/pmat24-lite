import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn/dropdown-menu";
import { menuShortcutClasses } from "@/ui/local-ui";
import { sawMonitor_doSawOpenAtom } from "@/store/4-dialogs-atoms";
import { appShortcuts } from "@/components/4-dialogs/0-global";

export function MenuItem_CreateMani() {
    const openDlg = useSetAtom(sawMonitor_doSawOpenAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    return (<>
        <DropdownMenuItem onClick={openDlg} disabled={noOpenFolder}>
            New Template
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openCreate.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}

// TODO: DropdownMenuItem.title is not shown in the menu when item is disabled, but it needs to be shown as explanation why the item is disabled
