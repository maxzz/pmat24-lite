import { useAtomValue, useSetAtom } from "jotai";
import { doGetFileUsPathAtom, doRevealInExplorerAtom, rightPanelAtomAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";
import { hasMain } from "@/xternal-to-main";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);
    const doGetFileUsPath = useSetAtom(doGetFileUsPathAtom);

    function revealInExplorer() {
        if (!fileUsAtom) {
            console.error('no.fileUsAtom');
            return;
        }
        if (hasMain()) {
            doRevealInExplorer(fileUsAtom);
        } else {
            const fullPath = doGetFileUsPath(fileUsAtom);
            if (fullPath) {
                navigator.clipboard.writeText(fullPath);
            }
        }
    }

    return (
        <DropdownMenuItem disabled={!fileUsAtom} onClick={revealInExplorer}>
            {hasMain() ? 'Reveal in File Explorer' : 'Copy Relative Path'}
        </DropdownMenuItem>
    );
}
