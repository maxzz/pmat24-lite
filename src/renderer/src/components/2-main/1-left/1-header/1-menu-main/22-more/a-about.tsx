import { useSetAtom } from "jotai";
import { DropdownMenuItem } from "@/ui";
import { doAboutDialogAtom } from "@/store/1-atoms/2-file-mani-atoms/0-all-serve-atoms";

export function MenuItem_About() {
    const doGetGeneralInfo = useSetAtom(doAboutDialogAtom);
    return (<>
        <DropdownMenuItem onClick={() => doGetGeneralInfo()}>
            About
        </DropdownMenuItem>
    </>);
}
