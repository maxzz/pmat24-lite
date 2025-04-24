import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenConfirmDeleteDialogAtom, fileUsOfRightPanelAtom, rightPanelAtom } from "@/store";

export function TestDeleteFile() {
    const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);
    const rightPanel = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!rightPanel} onClick={() => doOpenConfirmDeleteDialog(true)}>
            Delete...
        </Button>
    );
}

export function TestDeleteCpass() {
    const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);
    const rightPanelFileUs = useAtomValue(fileUsOfRightPanelAtom);
    const disabled = !rightPanelFileUs || rightPanelFileUs.parsedSrc.stats.isFCat || rightPanelFileUs.parsedSrc.mani?.forms?.length !== 2;
    return (
        <Button className="text-[.65rem]" disabled={disabled} onClick={() => doOpenConfirmDeleteDialog(true)}>
            Delete Cpass...
        </Button>
    );
}
