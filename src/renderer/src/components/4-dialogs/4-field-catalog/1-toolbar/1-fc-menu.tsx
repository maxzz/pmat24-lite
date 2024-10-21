import { useState } from "react";
import { Button } from "@/ui/shadcn";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { IconMenuHamburger5 } from "@/ui/icons";
import { appSettings, RightPanelViewType } from "@/store";
import { useSnapshot } from "valtio";

export function FC_PanelMenu() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">

                <MenuItem_ShowXML />

                <DropdownMenuSeparator />
                {/* <MenuItem_More /> */}

            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function MenuItem_ShowXML() {
    const { activeView } = useSnapshot(appSettings).right;
    return (
        <DropdownMenuCheckboxItem
            checked={activeView === RightPanelViewType.xml}
            onCheckedChange={(checked) => appSettings.right.activeView = checked ? RightPanelViewType.xml : RightPanelViewType.forms}
        >
            Show XML
        </DropdownMenuCheckboxItem>
    );
}

//(checked) => appSettings.rightPanel.rightPanelState.view = checked ? RightPanelView.xml : RightPanelView.forms