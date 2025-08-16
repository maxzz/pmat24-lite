import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doDeleteFileUsAtom } from "@/store/0-serve-atoms";

export function MenuItem_DeleteCurrent() {
    const currentAtom = useAtomValue(rightPanelAtomAtom);
    const doDeleteFileUs = useSetAtom(doDeleteFileUsAtom);
    return (
        <DropdownMenuItem disabled={!currentAtom} onClick={() => currentAtom && doDeleteFileUs(currentAtom)}>
            Delete Manifest...
        </DropdownMenuItem>
    );
}
