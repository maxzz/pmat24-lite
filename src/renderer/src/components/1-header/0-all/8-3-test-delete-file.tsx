import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doDeleteFileUsAtom, fileUsOfRightPanelAtom, rightPanelAtom } from "@/store";

export function TestDeleteFile() {
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    const currentAtom = useAtomValue(rightPanelAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete...
        </Button>
    );
}

export function TestDeleteCpass() {
    // const doOpenConfirmDeleteDialog = useSetAtom(doOpenConfirmDeleteDialogAtom);
    // const rightPanelFileUs = useAtomValue(fileUsOfRightPanelAtom);
    // const disabled = !rightPanelFileUs || rightPanelFileUs.parsedSrc.stats.isFCat || rightPanelFileUs.parsedSrc.mani?.forms?.length !== 2;
    // return (
    //     <Button className="text-[.65rem]" disabled={disabled} onClick={() => doOpenConfirmDeleteDialog(true)}>
    //         Delete Cpass...
    //     </Button>
    // );
    return null;
}
