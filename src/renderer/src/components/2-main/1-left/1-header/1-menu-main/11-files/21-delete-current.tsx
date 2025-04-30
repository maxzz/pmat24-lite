import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doDeleteFileUsAtom, rightPanelAtom } from "@/store";

export function MenuItem_DeleteCurrent() {
    const currentAtom = useAtomValue(rightPanelAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);

    return (
        <DropdownMenuItem disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete...
        </DropdownMenuItem>
    );
}
