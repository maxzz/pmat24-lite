import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { deleteCpassFromFileUsAtom, doDeleteFileUsAtom, fileUsOfRightPanelAtom, rightPanelAtomAtom } from "@/store";

export function TestDeleteFile() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    return (
        <Button className="text-[.65rem]" disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete...
        </Button>
    );
}

export function TestDeleteCpass() {
    const doOpenConfirmDeleteDialog = useSetAtom(deleteCpassFromFileUsAtom);
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const currentFileUs = useAtomValue(fileUsOfRightPanelAtom);
    const disabled = !currentAtom || !currentFileUs || currentFileUs.parsedSrc.stats.isFCat || currentFileUs.parsedSrc.mani?.forms?.length !== 2;
    return (
        <Button className="text-[.65rem]" disabled={disabled} onClick={() => currentAtom && doOpenConfirmDeleteDialog(currentAtom)}>
            Delete Cpass...
        </Button>
    );
}
