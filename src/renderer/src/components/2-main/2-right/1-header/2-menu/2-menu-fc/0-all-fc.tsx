import { type FceCtx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_AddFcItem, MenuItem_DelFcItem } from "./1-add-del-items";

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
