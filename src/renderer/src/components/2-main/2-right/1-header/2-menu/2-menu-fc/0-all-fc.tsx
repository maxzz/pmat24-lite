import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { type FceCtx } from "@/store/3-field-catalog-atoms";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_AddFcItem, MenuItem_DelFcItem } from "./1-menu-items-add-del";

export function R_PanelMenuFc({ fceCtx }: { fceCtx: FceCtx; }) {
    return (<>
        <MenuItem_AddFcItem fceCtx={fceCtx} />
        <MenuItem_DelFcItem  fceCtx={fceCtx} />
        <DropdownMenuSeparator />
        <MenuItem_ShowXML />
        {/* <DropdownMenuSeparator />
        <MenuItem_More /> */}
    </>);
}
