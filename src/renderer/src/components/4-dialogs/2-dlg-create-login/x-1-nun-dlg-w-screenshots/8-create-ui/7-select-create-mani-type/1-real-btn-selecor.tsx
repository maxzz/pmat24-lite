import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { open_SawMonitorForCpassAtom } from "@/store";

export function ButtonCreateCpassForm() {
    const openDlg = useSetAtom(open_SawMonitorForCpassAtom);
    return (
        <Button variant="outline" size="xs" className="px-2 w-max justify-start" onClick={openDlg}>
            Create password change form
        </Button>
    );
}
