import { useAtomValue, useSetAtom } from "jotai";
import { doOpenConfirmDeleteDialogAtom, rightPanelAtom } from "@/store";
import { shortcutNameSave } from "@/components/4-dialogs/0-global";
import { DropdownMenuItem, DropdownMenuShortcut, menuShortcutClasses } from "@/ui";

export function MenuItem_DeleteCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doOpenConfirmDeleteDialog(true)} disabled={!fileUsAtom}>
            Delete
        </DropdownMenuItem>
    );
}

//TODO: show confirmation dialog
