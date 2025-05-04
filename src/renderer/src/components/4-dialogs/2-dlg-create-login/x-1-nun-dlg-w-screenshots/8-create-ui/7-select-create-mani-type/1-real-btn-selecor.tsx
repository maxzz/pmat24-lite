import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doOpen_SawMonitorForCpassAtom } from "@/store";

export function ButtonCreateCpassForm() {
    const doOpenSawOverlayForCpass = useSetAtom(doOpen_SawMonitorForCpassAtom);
    return (
        <Button variant="outline" size="xs" className="px-2 w-max justify-start" onClick={() => doOpenSawOverlayForCpass()}>
            Create password change form
        </Button>
    );
}
