import { useAtomValue, useSetAtom } from "jotai";
import { doRevealInExplorerAtom, rightPanelAtom } from "@/store";
import { shortcutNameSave } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_DeleteCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doRevealInExplorer(fileUsAtom)} disabled={!fileUsAtom}>
            Delete
            <DropdownMenuShortcut className={menuShortcutClasses}>{shortcutNameSave}</DropdownMenuShortcut>
        </DropdownMenuItem>
    );
}

//TODO: show confirmation dialog
