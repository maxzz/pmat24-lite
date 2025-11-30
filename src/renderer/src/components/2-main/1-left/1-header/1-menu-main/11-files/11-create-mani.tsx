import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn";
import { menuShortcutClasses } from "@/ui/local-ui";
import { open_SawMonitorAtom } from "@/store/4-dialogs-atoms";
import { rootDir } from "@/store/5-1-open-files";
import { appShortcuts } from "@/components/4-dialogs/0-global";

export function MenuItem_CreateMani() {
    const openDlg = useSetAtom(open_SawMonitorAtom);
    const hasOpenFolder = !useSnapshot(rootDir).fpath;
    return (<>
        <DropdownMenuItem onClick={openDlg} disabled={hasOpenFolder}>
            New Template
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openCreate.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}

// TODO: DropdownMenuItem.title is not shown in the menu when item is disabled, but it needs to be shown as explanation why the item is disabled
