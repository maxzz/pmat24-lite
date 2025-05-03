import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { allowedToCreateCpassAtom, doOpen_SawMonitorAtom, doOpen_SawMonitorForCpassAtom, rootDir } from "@/store";

export function TestCreateWithSaw() {
    const openDlg = useSetAtom(doOpen_SawMonitorAtom);
    const disabled = !useSnapshot(rootDir).fpath;
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={openDlg}>
            Create New...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const openDlg = useSetAtom(doOpen_SawMonitorForCpassAtom);
    const disabled = !useAtomValue(allowedToCreateCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={openDlg}>
            Create cpass...
        </Button>
    );
}
