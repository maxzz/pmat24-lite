import { useAtomValue, useSetAtom } from "jotai";
import { doRevealInExplorerAtom, rightPanelAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doRevealInExplorer(fileUsAtom)} disabled={!fileUsAtom}>
            Reveal in File Explorer
        </DropdownMenuItem>
    );
}
