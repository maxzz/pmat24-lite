import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doDeleteFileUsAtom, rightPanelAtomAtom } from "@/store";

export function MenuItem_DeleteCurrent() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    return (
        <DropdownMenuItem disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete Manifest...
        </DropdownMenuItem>
    );
}
