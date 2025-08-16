import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";
import { open_SawMonitorAtom } from "@/store/4-dialogs-atoms";
import { rootDir } from "@/store/5-1-files";
import { appShortcuts } from "@/components/4-dialogs/0-global";

export function MenuItem_CreateMani() {
    const openDlg = useSetAtom(open_SawMonitorAtom);
    const disabled = !useSnapshot(rootDir).fpath;
    return (<>
        <DropdownMenuItem onClick={openDlg} disabled={disabled}>
            New Manifest
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openCreate.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}

// TODO: DropdownMenuItem.title is not shown in the menu when item is disabled, but it needs to be shown as explanation why the item is disabled
