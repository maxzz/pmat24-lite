import { useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { appShortcuts } from "@/components/4-dialogs/0-global";
import { doOpenOptionsDialogAtom } from "@/store/4-dialogs-atoms";
import { DropdownMenuItem, DropdownMenuShortcut } from "@/ui/shadcn/dropdown-menu";
import { menuShortcutClasses } from "@/ui/local-ui";

export function MenuItem_Options() {
    const doOpenOptionsDialog = useSetAtom(doOpenOptionsDialogAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    return (<>
        <DropdownMenuItem onClick={() => doOpenOptionsDialog(true)} disabled={noOpenFolder}>
            Options
            <DropdownMenuShortcut className={menuShortcutClasses}>{appShortcuts.openOptions.text}</DropdownMenuShortcut>
        </DropdownMenuItem>
    </>);
}
