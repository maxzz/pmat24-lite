import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpenSawOverlayForCpassAtom } from "@/store";

export function ButtonCreateCpassForm() {
    const doOpenSawOverlayForCpass = useSetAtom(doOpenSawOverlayForCpassAtom);
    return (
        <Button variant="outline" size="xs" className="px-2 w-max justify-start" onClick={() => doOpenSawOverlayForCpass()}>
            Create password change form
        </Button>
    );
}
