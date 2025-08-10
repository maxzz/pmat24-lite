import { useState } from "react";
import { useSnapshot } from "valtio";
import { appSettings, RightPanelViewType } from "@/store/9-ui-state";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "@/ui/shadcn/dropdown-menu";
import { Button } from "@/ui/shadcn";
import { IconMenuHamburger5 } from "@/ui/icons";
import { type FceCtx } from "@/store/1-atoms/4-field-catalogs";

export function PanelMenu_Fc({ fceCtx }: { fceCtx: FceCtx; }) {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen} modal={true}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" tabIndex={-1}>
                    <IconMenuHamburger5 className="size-4 fill-current" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-36 text-xs" align="end">

                <MenuItem_ShowXML />

                {/* <DropdownMenuSeparator /> */}
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
