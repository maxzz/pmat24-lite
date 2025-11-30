import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { rootDir } from "@/store/5-1-open-files/2-root-dir";
import { allowedToCreateCpassAtom, open_SawMonitorAtom, open_SawMonitorForCpassAtom } from "@/store/4-dialogs-atoms";

export function TestCreateWithSaw() {
    const openDlg = useSetAtom(open_SawMonitorAtom);
    const hasOpenFolder = !useSnapshot(rootDir).fpath;
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={hasOpenFolder} onClick={openDlg}>
            Create New...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const openDlg = useSetAtom(open_SawMonitorForCpassAtom);
    const disabled = !useAtomValue(allowedToCreateCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={openDlg}>
            Create cpass...
        </Button>
    );
}
