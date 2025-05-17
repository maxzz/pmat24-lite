import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { allowedToCreateCpassAtom, open_SawMonitorAtom, open_SawMonitorForCpassAtom, rootDir } from "@/store";

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
