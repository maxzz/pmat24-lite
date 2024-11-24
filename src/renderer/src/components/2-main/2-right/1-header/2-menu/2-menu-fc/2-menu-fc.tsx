import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";

export function R_PanelMenuFc() {
    return (<>
        <MenuItem_ShowXML />
        <DropdownMenuSeparator />
        <MenuItem_More />
    </>);
}
