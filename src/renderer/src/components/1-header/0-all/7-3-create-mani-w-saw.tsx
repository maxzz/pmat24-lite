import { useAtomValue, useSetAtom } from "jotai";
import { useSnapshot } from "valtio";
import { Button } from "@/ui";
import { allowedToCreateCpassAtom, doOpen_SawMonitorAtom, doOpenSawOverlayForCpassAtom, rootDir } from "@/store";

export function TestCreateWithSaw() {
    const doOpen_SawMonitor = useSetAtom(doOpen_SawMonitorAtom);
    const disabled = !useSnapshot(rootDir).fpath;
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={() => doOpen_SawMonitor()}>
            Create New...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const doOpen = useSetAtom(doOpenSawOverlayForCpassAtom);
    const disabled = !useAtomValue(allowedToCreateCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={doOpen}>
            Create cpass...
        </Button>
    );
}
