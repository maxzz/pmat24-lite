import { DropdownMenuItem } from "@/ui/shadcn";
import { notImplYet } from "../not-impl-yet";

export function MenuItem_Settings() {
    return (<>
        <DropdownMenuItem {...notImplYet}>
            Settings
        </DropdownMenuItem>

        <DropdownMenuItem {...notImplYet}>
            More...
        </DropdownMenuItem>
    </>);
}
