import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenConfirmDeleteDialogAtom, rightPanelAtom } from "@/store";

export function TestDeleteFile() {
    const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);
    const rightPanel = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doOpenConfirmDeleteDialog(true)}>
            Delete
        </Button>
    );
}
