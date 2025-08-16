import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { allowedToCreateCpassAtom, open_SawMonitorAtom, open_SawMonitorForCpassAtom } from "@/store/4-dialogs-atoms";
import { rootDir } from "@/store/1-files-atoms/0-files-atom/2-root-dir";

export function TestCreateWithSaw() {
    const openDlg = useSetAtom(open_SawMonitorAtom);
    const disabled = !useSnapshot(rootDir).fpath;
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={openDlg}>
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
