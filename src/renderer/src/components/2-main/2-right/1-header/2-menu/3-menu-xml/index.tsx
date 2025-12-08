import { type FileUs } from "@/store/store-types";
import { type ManiAtoms } from "@/store/2-file-mani-atoms/9-types";
import { DropdownMenuSeparator } from "@/ui/shadcn/dropdown-menu";
import { MenuItem_More } from "../8-more";
import { MenuItem_ShowXML } from "../7-show-xml";
import { MenuItems_Launch } from "../1-menu-mani/4-menu-items-launch";
import { MenuItems_State } from "../1-menu-mani/3-menu-items-test-inuse";

export function R_PanelMenuXml({ fileUs, maniAtoms }: { fileUs: FileUs; maniAtoms: ManiAtoms | undefined | null; }) {
    return (<>
        {maniAtoms && <MenuItems_WithManiAtoms fileUs={fileUs} maniAtoms={maniAtoms} />}
        <MenuItem_ShowXML />
    </>);
}

function MenuItems_WithManiAtoms({ fileUs, maniAtoms }: { fileUs: FileUs; maniAtoms: ManiAtoms; }) {
    return (<>
        <MenuItems_State fileUs={fileUs} />
        <MenuItems_Launch maniAtoms={maniAtoms} />
        <DropdownMenuSeparator />
    </>);
}

//{/* <DropdownMenuSeparator /> <MenuItem_More /> */}