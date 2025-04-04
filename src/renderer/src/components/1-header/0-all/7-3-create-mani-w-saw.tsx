import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenSawOverlayAtom, doOpenSawOverlayForCpassAtom } from "@/store/1-atoms/7-dialogs";

export function TestCreateWithSaw() {
    const doOpen = useSetAtom(doOpenSawOverlayAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doOpen(true)}>
            Create Saw...
        </Button>
    );
}

export function TestCreateWithSawForCpass() {
    const doOpen = useSetAtom(doOpenSawOverlayForCpassAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={doOpen}>
            Create Saw cpass...
        </Button>
    );
}
