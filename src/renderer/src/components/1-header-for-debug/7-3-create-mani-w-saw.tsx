import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui/shadcn/button";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { allowedToCreateCpassAtom, sawMonitor_doSawOpenAtom, sawMonitor_doSawOpenForCpassAtom } from "@/components/4-dialogs/2-dlg-create-login/a-create-dialog-atoms/7-0-open-anim-saw-monitor";

export function TestCreateWithSaw() {
    const openDlg = useSetAtom(sawMonitor_doSawOpenAtom);
    const noOpenFolder = !useSnapshot(rootDir).fpath;
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={noOpenFolder} onClick={openDlg}>
            Create New...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const openDlg = useSetAtom(sawMonitor_doSawOpenForCpassAtom);
    const disabled = !useAtomValue(allowedToCreateCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={openDlg}>
            Create cpass...
        </Button>
    );
}
