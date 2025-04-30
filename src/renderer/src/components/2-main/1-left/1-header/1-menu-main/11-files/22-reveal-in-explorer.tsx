import { useAtomValue, useSetAtom } from "jotai";
import { doRevealInExplorerAtom, rightPanelAtomAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);

    return (
        <DropdownMenuItem onClick={() => fileUsAtom && doRevealInExplorer(fileUsAtom)} disabled={!fileUsAtom}>
            Reveal in File Explorer
        </DropdownMenuItem>
    );
}
