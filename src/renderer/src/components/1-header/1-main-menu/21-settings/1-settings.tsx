import { useSetAtom } from "jotai";
import { optionsDialogOpenAtom } from "@/store/atoms/4-dialogs";
import { DropdownMenuItem } from "@/ui/shadcn";
import { notImplYet } from "../not-impl-yet";

export function MenuItem_Settings() {
    const doOptionsDialogOpen = useSetAtom(optionsDialogOpenAtom);
    return (<>
        <DropdownMenuItem onClick={()=> doOptionsDialogOpen(true)}>
            Settings
        </DropdownMenuItem>

        <DropdownMenuItem {...notImplYet}>
            More...
        </DropdownMenuItem>
    </>);
}
