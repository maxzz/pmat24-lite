import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doAboutDialogAtom } from "@/components/4-dialogs/5-confirm";

export function MenuItem_About() {
    const doGetGeneralInfo = useSetAtom(doAboutDialogAtom);
    return (<>
        <DropdownMenuItem onClick={() => doGetGeneralInfo()}>
            About
        </DropdownMenuItem>
    </>);
}
