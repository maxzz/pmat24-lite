import { type ManiAtoms } from "@/store/1-atoms/2-file-mani-atoms";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItem_More } from "../8-more";
import { MenuItem_ShowTextFieldsForMatch } from "./1-show-text-fields-for-match";

export function R_PanelMenuMani({ maniAtoms }: { maniAtoms: ManiAtoms; }) {
    return (<>
        <MenuItem_ShowTextFieldsForMatch maniAtoms={maniAtoms} />
        <MenuItem_ShowXML />
        <DropdownMenuSeparator />
        <MenuItem_More />
    </>);
}
