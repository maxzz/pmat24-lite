import { type FileUs } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";

export function R_PanelMenuXml({ fileUs }: { fileUs: FileUs; }) {
    return (<>
        <MenuItem_ShowXML />
        {/* <DropdownMenuSeparator />
        <MenuItem_More /> */}
    </>);
}
