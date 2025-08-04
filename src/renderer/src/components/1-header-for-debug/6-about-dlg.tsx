import { useSetAtom } from "jotai";
import { Button } from "@/ui";
import { doAboutDialogAtom } from "../4-dialogs/5-confirm";

export function TestAboutDialog() {
    const doGetGeneralInfo = useSetAtom(doAboutDialogAtom);
    return (
        <Button variant="outline" className="text-[.65rem]" onClick={() => doGetGeneralInfo()}>
            About...
        </Button>
    );
}
