import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doOpenConfirmDeleteDialogAtom, rightPanelAtom } from "@/store";

export function MenuItem_DeleteCurrent() {
    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doOpenConfirmDeleteDialog(true)} disabled={!fileUsAtom}>
            Delete...
        </DropdownMenuItem>
    );
}
