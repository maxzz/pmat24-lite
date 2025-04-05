import { useAtomValue, useSetAtom } from "jotai";
import { Button } from "@/ui";
import { allowedToCreateCpassAtom, doOpenSawOverlayForLoginAtom, doOpenSawOverlayForCpassAtom } from "@/store";

export function TestCreateWithSaw() {
    const doOpen = useSetAtom(doOpenSawOverlayForLoginAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpen(true)}>
            Create Saw...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const doOpen = useSetAtom(doOpenSawOverlayForCpassAtom);
    const disabled = !useAtomValue(allowedToCreateCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" disabled={disabled} onClick={doOpen}>
            Create Saw cpass...
        </Button>
    );
}
