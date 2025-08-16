import { useAtomValue, useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { toast } from "sonner";
import { hasMain } from "@/xternal-to-main";
import { rightPanelAtomAtom } from "@/store/1-atoms/3-right-panel";
import { doGetFileUsPathAtom, doRevealInExplorerAtom } from "@/store/0-serve-atoms";

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
