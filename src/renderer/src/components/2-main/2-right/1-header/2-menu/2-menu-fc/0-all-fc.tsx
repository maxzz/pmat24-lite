import { type FceCtx } from "@/store";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_AddFcItem } from "./2-add-items";
import { MenuItem_DelFcItem } from "./3-del-item";

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
