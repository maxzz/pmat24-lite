import { useAtomValue, useSetAtom } from "jotai";
import { doRevealInExplorerAtom, rightPanelAtomAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    return (
        <DropdownMenuItem disabled={!fileUsAtom} onClick={() => fileUsAtom && doRevealInExplorer(fileUsAtom)}>
            Reveal in File Explorer
        </DropdownMenuItem>
    );
}
