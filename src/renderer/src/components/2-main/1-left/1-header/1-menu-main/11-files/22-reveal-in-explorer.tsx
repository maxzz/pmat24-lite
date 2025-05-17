import { useAtomValue, useSetAtom } from "jotai";
import { toast } from "sonner";
import { doGetFileUsPathAtom, doRevealInExplorerAtom, rightPanelAtomAtom } from "@/store";
import { DropdownMenuItem } from "@/ui";
import { hasMain } from "@/xternal-to-main";

export function MenuItem_RevealInExplorerCurrent() {

    const fileUsAtom = useAtomValue(rightPanelAtomAtom);
    const doRevealInExplorer = useSetAtom(doRevealInExplorerAtom);
    const doGetFileUsPath = useSetAtom(doGetFileUsPathAtom);

    function revealInExplorer() {
        if (!fileUsAtom) {
            toastError();
            return;
        }
        if (hasMain()) {
            doRevealInExplorer(fileUsAtom);
        } else {
            const { fpath, fname } = doGetFileUsPath(fileUsAtom) || {};
            if (fname) {
                navigator.clipboard.writeText(fname);
            } else {
                toastError('The filename is not set');
            }
        }
    }

    return (
        <DropdownMenuItem disabled={!fileUsAtom} onClick={revealInExplorer}>
            {hasMain() ? 'Reveal in File Explorer' : 'Copy File Name'}
        </DropdownMenuItem>
    );
}

function toastError(msg: string = 'No file selected') {
    toast.error(msg, { position: "top-center" });
}
